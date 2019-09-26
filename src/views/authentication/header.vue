<template>
    <div class="header">
        <div class="logo">
            <span class="logo_pic"><img src="../../assets/images/logo2.png" alt=""></span>
            <strong>实名认证</strong>
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
    	}
    },
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
</style>