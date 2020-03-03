import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/common.css'
import request from './request'
Vue.prototype.$request = request;
Vue.config.productionTip = false
import layer from 'vue-layer'
import animated from 'animate.css'
import 'vue-layer/lib/vue-layer.css';
import ElementUI from 'element-ui';
import './plugins/element.js'
import $ from 'jquery' 
Vue.prototype.$ = $;
Vue.prototype.$layer = layer(Vue);
Vue.prototype.$http = process.env.VUE_APP_BASEURL+'/';
Vue.prototype.$baseURL = process.env.VUE_APP_APIURL + '/'
Vue.prototype.client_secret = 'client_secret'
Vue.use(animated);
Vue.use(ElementUI);


Vue.prototype.$setlocalStorage = function set(key, value) {
    var curTime = new Date().getTime();
    window.localStorage.setItem(key, JSON.stringify({ data: value, time: curTime }));
}
Vue.prototype.$getlocalStorage = function get(key, exp = 86400000) {
    var data = localStorage.getItem(key);
    var dataObj = JSON.parse(data);
    if (dataObj) {
        if (new Date().getTime() - dataObj.time > exp) {
            console.log('信息已过期');
            store.commit('setuserinfo', '')
            localStorage.removeItem('userinfo')
            router.replace({ name: "login" })
        } else {
            //console.log("data="+dataObj.data);
            //console.log(JSON.parse(dataObj.data));
            var dataObjDatatoJson = dataObj.data;
            return dataObjDatatoJson;
        }
    } else {
        return null
    }

}




router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (to.matched.length === 0) {
        //如果未匹配到路由
        from.name ? next({ name: from.name }) : next('/');
        //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    }
    // 无token开发
    // if (to.meta.status) {
    //     if (!store.state.status) {
    //         next({
    //             path: '/authentication/index'
    //         })
    //     } else {
    //         next()
    //     }
    // }
    //带token开发
    if (to.meta.requireAuth) {
        //http://192.168.50.193:8080/user/index?token=72d28655-ff7a-493f-96d7-862ea04de5ab
        if(to.query.token){
            request({
                method:'get',
                headers:{
                    'content-type': "application/json;charset=UTF-8",
                    'token':to.query.token
                },
                url:'/login/detail',
            }).then((res) => {
                console.log(res)
                if(res.data.code==0){
                    let sessionId=to.query.token;
                    res.data.data.sessionId=sessionId;
                    Vue.prototype.$setlocalStorage('userinfo',res.data.data)
                    next()
                }
                
            }).catch((err) => {
                console.log(err);
            })

        }
        else if (Vue.prototype.$getlocalStorage('userinfo')) {
            if (to.meta.status) {
                if (!store.state.status) {
                    next({
                        path: '/authentication/index'
                    })
                }
            }
            next()
        } else {
            next({
                path: '/login/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        if (Vue.prototype.$getlocalStorage('userinfo')) {
            if (to.path !== '/login/login') {
                next()
            } else {
                next({ path: "/login/index" })
            }
        }
    }
    next()
})


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')