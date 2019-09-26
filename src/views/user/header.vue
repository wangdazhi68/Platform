<template>
    <div class="header">
        <div class="logo">
            <span class="logo_pic"><img src="../../assets/images/logo2.png" alt=""></span>
            <strong>实名认证</strong>
        </div>
        <div class="header-nav">
            <ul>
                <li :class="[active==1?'active':'']" @click="tap(1)" @mouseenter="enter(1)" @mouseleave="leave()">
                    <i v-if="cur==1 || active==1"><img src="../../assets/images/user/headnav4-4.png" alt=""></i>
                    <i v-else><img src="../../assets/images/user/headnav4.png" alt=""></i> 
                    <span>账号中心</span>
                </li>
                <li :class="[active==2?'active':'']" @click="tap(2)" @mouseenter="enter(2)" @mouseleave="leave()">
                    <i v-if="cur==2 || active==2"><img src="../../assets/images/user/headnav2-2.png" alt=""></i>
                    <i v-else><img src="../../assets/images/user/headnav2.png" alt=""></i> 
                    <span>联合信任服务</span>
                </li>
                <li :class="[active==3?'active':'']" @click="tap(3)" @mouseenter="enter(3)" @mouseleave="leave()">
                    <i v-if="cur==3 || active==3"><img src="../../assets/images/user/headnav3-3.png" alt=""></i>
                    <i v-else><img src="../../assets/images/user/headnav3.png" alt=""></i> 
                    <span>协议中心</span>
                </li>
                <li :class="[active==4?'active':'']" @click="tap(4)" @mouseenter="enter(4)" @mouseleave="leave()">
                    <i v-if="cur==4 || active==4"><img src="../../assets/images/user/headnav1-1.png" alt=""></i>
                    <i v-else><img src="../../assets/images/user/headnav1.png" alt=""></i> 
                    <span>帮助中心</span>
                </li>
            </ul>
        </div>
        <div class="user">
            <span class="user_tx"><img src="../../assets/images/user_tx.png" alt=""></span>
            <span class="user_phone" @click="usercenter()">{{loginCode}}</span>
            <span style="margin:0 11px;">|</span>
            <span class="layout" @click="layout()">退出</span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
    	return{
            loginCode:'登录',
            cur:null,
    	}
    },
    props: ["active"],
    mounted() {
        let localdata=this.$getlocalStorage('userinfo')
	    this.loginCode=localdata.loginCode
	},
    methods:{
        usercenter(){
            this.$router.push({name:'userindex'})
        },
        layout(){
            this.$store.commit('setuserinfo', '')
            localStorage.removeItem('userinfo')
            this.$router.replace({name:"login"})
            var that=this;
            that.$request({
                method:'get',
                headers:{
                    'content-type': "application/json;charset=UTF-8"
                },
                url:'/login/logout',
            }).then((res) => {
                return true
            }).catch((err) => {
                console.log(err);
            })
        },
        tap(e){
            var that=this
            switch(e)
                {
                    case 1:
                        that.$router.push({name:"userindex"})
                        break;
                    case 2:
                        that.$router.push({name:"service"})
                        break;
                    case 3:
                        that.$router.push({name:"agreement"})
                        break;
                    case 4:
                        that.$router.push({name:"papers"})
                        break;
                }
        },
        enter(e){
            this.cur=e;
        },
        leave(){
            this.cur=null;
        }
    },
    
}
</script>
<style scoped>
.header{
    width: 100%;
    max-width: 1920px;
    margin:0 auto;
    background:#fff;
    height: 80px;
    padding: 20px 41px;
    box-sizing: border-box;
}
.logo{
    float: left;
}
.logo img{
    width: 132px;
    height: 40px;
}
.logo_pic{
    display: inline-block;
    vertical-align: middle;
    width: 132px;
    height: 40px;
    margin-right: 27px;
}
.header strong{
    display: inline-block;
    border-left: 2px solid #8EAFE2;
    height:36px;
    line-height: 36px;
    font-size: 20px;
    color:#8EAFE2;
    vertical-align: middle;
    padding-left: 20px;
}
.header-nav{
    float: left;
    width: 60%;
}
.header-nav ul{
    padding-top: 6px;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    justify-content:space-between;
    float: right;
    width: 70%;
}
.header-nav li{
    display: flex;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
}
.header-nav li.active{
    color:#1890FF;
}
.header-nav li:hover{
    color:#1890FF;
}
.header-nav li i{
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
.user{
    float: right;
    line-height: 36px;
    color:#999;
    font-size: 14px;
}
.user_tx{
    display: inline-block;
    vertical-align: middle;
    height: 36px;
    margin-right: 9px;
}
.user_phone{
    font-size: 14px;
    cursor: pointer;
}
.layout{
    cursor: pointer;
}
.layout:hover,.user_phone:hover{
    color:#1890FF;
}

@media screen and (min-width:1920px) {
    .header-nav ul{
        width: 43%;
    }
    .header-nav{
        width: 72%;
    }
}

</style>