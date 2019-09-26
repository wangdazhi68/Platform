<template>
    <div class="wrap" :style="loginbg">
        <div class="logo">
            <img src="../../assets/images/logo2.png" alt="联合信任">
        </div>  
        <div class="content">
            <div class="cnt_left">
                <div class="lock">
                    <img src="../../assets/images/lock.png" alt="">
                </div>
                <div class="axis">
                    <ul>
                        <li class="visited">
                            <div class="sline"></div>
                            <div class="circle">
                               <div class="big_c">
                                    <div class="small_c">  
                                    </div>
                                </div> 
                            </div> 
                            <div class="title">
                                验证身份
                            </div>
                        </li>
                        <li class="visited">
                            <div class="sline"></div>
                            <div class="circle">
                               <div class="big_c">
                                    <div class="small_c">  
                                    </div>
                                </div> 
                            </div> 
                            <div class="title">
                                设置新密码
                            </div>
                        </li>
                        <li class="visited">
                            <div class="sline"></div>
                            <div class="circle">
                               <div class="big_c">
                                    <div class="small_c">  
                                    </div>
                                </div> 
                            </div> 
                            <div class="title">
                                完成
                            </div>
                        </li>
                    </ul>
                </div>
            </div> 
            <div class="cnt_right">
                <div class="h1_title">
                    <div class="font">
                        <h1>找回密码</h1>
                        <div class="title_line">
                            <div class="red_line"></div>
                            <div class="blue_line"></div>
                        </div>
                    </div>
                    <div class="slogan"> 
                        <img src="../../assets/images/slogan.png" alt="slogan">
                    </div>
                </div>
                <div class="form">
                    <dl>
                        <dt>&nbsp;</dt>
                        <dd>
                            <div class="success">
                                 <img src="../../assets/images/locksuccess.png" alt="">
                                 <p>新密码设置成功</p>
                            </div>

                        </dd>
                    </dl>
                    <dl>
                        <dt>&nbsp;</dt>
                        <dd>
                            <div class="login_btn_wrap">
                                <span class="login_btn" @click="gologin()">返回登录</span>
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="footer">
            版权所有：北京联合信任技术服务有限公司 京ICP备13046264-2
        </div>
    </div>
</template>
<script>
export default {
    data(){
    	return{
            loginbg:{backgroundImage:'url(' + require('../../assets/images/loginbg.png') + ')'},
            suc:this.$route.params.suc,
    	}
    },
    mounted() {
	    if(!this.$route.params.suc){
            this.$router.replace('one');
        }
	},
    methods:{
        gologin(){
            this.$router.replace('/login/login')
        }
    },
    
}
</script>
<style src="../../assets/css/forget.css" scoped>
</style>