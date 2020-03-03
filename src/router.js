import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login/login.vue'
Vue.use(Router)
    //解决警示报错，不影响页面使用
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            redirect: '/login/login'
                //redirect: 'user/index'
        },
        {
            path: '/user/index',
            name: 'userindex',
            meta: {
                requireAuth: true,
                title: "基本信息",
            },
            component: () =>
                import ('./views/user/index.vue'),
        },
        {
            path: '/user/association',
            name: 'association',
            meta: {
                requireAuth: true,
                title: "关联账号",
            },
            component: () =>
                import ('./views/user/association.vue'),
        },
        {
            path: '/user/security',
            name: 'security',
            meta: {
                requireAuth: true,
                title: "安全中心",
            },
            component: () =>
                import ('./views/user/security.vue'),
        },
        {
            path: '/user/service',
            name: 'service',
            meta: {
                requireAuth: true,
                title: "联合信任服务",
            },
            component: () =>
                import ('./views/user/service.vue'),
        },
        {
            path: '/user/agreement',
            name: 'agreement',
            meta: {
                requireAuth: true,
                title: "协议管理",
            },
            component: () =>
                import ('./views/user/agreement.vue'),
        },
        {
            path: '/user/lookpdf',
            name: 'lookpdf',
            meta: {
                requireAuth: true,
                title: "查看协议",
            },
            component: () =>
                import ('./views/user/lookpdf.vue'),
        },
        {
            path: '/user/help',
            name: 'help',
            meta: {
                requireAuth: true,
                title: "帮助中心",
            },
            redirect: "/user/help/timestamp",
            component: () =>
                import ('./views/user/help.vue'),
            children: [{
                    path: '/user/help/timestamp',
                    name: 'timestamp',
                    component: () =>
                        import ('./views/user/help/timestamp.vue')
                },
                {
                    path: '/user/help/forensics',
                    name: 'forensics',
                    component: () =>
                        import ('./views/user/help/forensics.vue')
                },
                {
                    path: '/user/help/onesign',
                    name: 'onesign',
                    component: () =>
                        import ('./views/user/help/onesign.vue')
                },
                {
                    path: '/user/help/forensics',
                    name: 'forensics',
                    component: () =>
                        import ('./views/user/help/forensics.vue')
                },

            ]
        },
        {
            path: '/login/index',
            name: 'loginindex',
            meta: {
                requireAuth: true,
                title: "联合信任服务",
            },
            component: () =>
                import ('./views/login/index.vue'),
        },
        {
            path: '/authentication/upidcard',
            name: 'upidcard',
            meta: {
                requireAuth: true,
                title: "人脸识别验证",
                status: true
            },
            component: () =>
                import ('./views/authentication/upidcard.vue'),
        },
        {
            path: '/authentication/enterresult',
            name: 'enterresult',
            meta: {
                requireAuth: true,
                title: "企业认证",
                status: true
            },
            component: () =>
                import ('./views/authentication/enterresult.vue'),
        },
        {
            path: '/authentication/entercheck',
            name: 'entercheck',
            meta: {
                requireAuth: true,
                title: "企业认证",
                status: true
            },
            component: () =>
                import ('./views/authentication/entercheck.vue'),
        },
        {
            path: '/authentication/enterbank',
            name: 'enterbank',
            meta: {
                requireAuth: true,
                title: "企业银行行卡认证",
                status: true
            },
            component: () =>
                import ('./views/authentication/enterbank.vue'),
        },
        {
            path: '/authentication/enterprise',
            name: 'enterprise',
            meta: {
                requireAuth: true,
                title: "企业认证",
            },
            component: () =>
                import ('./views/authentication/enterprise.vue'),
        },
        {
            path: '/authentication/bank',
            name: 'bank',
            meta: {
                requireAuth: true,
                title: "个人银行卡认证",
                status: true
            },
            component: () =>
                import ('./views/authentication/bank.vue'),
        },
        {
            path: '/authentication/phone',
            name: 'phone',
            meta: {
                requireAuth: true,
                title: "个人电话号认证",
                status: true
            },
            component: () =>
                import ('./views/authentication/phone.vue'),
        },
        {
            path: '/authentication/papers',
            name: 'papers',
            meta: {
                requireAuth: true,
                title: "个人证件认证",
                status: true
            },
            component: () =>
                import ('./views/authentication/papers.vue'),
        },
        {
            path: '/authentication/index',
            name: 'rzindex',
            meta: {
                requireAuth: true,
                title: "认证中心",
            },
            component: () =>
                import ('./views/authentication/index.vue'),
        },
        {
            path: '/authentication/personal',
            name: 'personal',
            meta: {
                requireAuth: true,
                title: "个人证件认证",
            },
            component: () =>
                import ('./views/authentication/personal.vue'),
        },
        {
            path: '/login/login',
            name: 'login',
            meta: {
                title: "登录",
            },
            component: login
        },
        {
            path: '/getpassword/one',
            name: 'one',
            component: () =>
                import ('./views/getpassword/one.vue'),
        },
        {
            path: '/getpassword/two',
            name: 'two',
            component: () =>
                import ('./views/getpassword/two.vue'),
        },
        {
            path: '/getpassword/three',
            name: 'three',
            component: () =>
                import ('./views/getpassword/three.vue'),
        },
        {
            path: '/login/register',
            component: () =>
                import ('./views/login/register.vue'),
            children: [{
                    path: 'regPhone',
                    name: 'regPhone',
                    meta: {
                        title: "手机号注册",
                    },
                    component: () =>
                        import ('./views/login/regPhone.vue')
                },
                {
                    path: 'regEmail',
                    name: 'regEmail',
                    meta: {
                        title: "邮箱注册",
                    },
                    component: () =>
                        import ('./views/login/regEmail.vue')
                },
                {
                    path: '/',
                    redirect: 'regPhone'
                }
            ]
        },
        {
            path: '/agreedoc/privacy',
            name: 'privacy',
            meta: {
                title: "隐私保护协议",
            },
            component: () =>
                import ('./views/agreedoc/privacy.vue')
        },
        {
            path: '/agreedoc/regdoc',
            name: 'regdoc',
            meta: {
                title: "用户注册与使用协议",
            },
            component: () =>
                import ('./views/agreedoc/regdoc.vue')
        },
    ]
})