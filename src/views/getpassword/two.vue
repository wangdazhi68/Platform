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
                        <li>
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
                    <div class="goback">
                        <router-link to="/login/login">
                            <b><img src="../../assets/images/goback.png" alt=""></b>
                            <span>返回<a>登录</a></span>
                        </router-link>
                    </div>
                </div>
                <div class="form">
                    <dl>
                        <dt>输入新密码</dt>
                        <dd>
                            <p class="reg_ts" v-show="newpasserror"><img src="../../assets/images/erroricon.png" alt="">{{newpasserror}}</p>
                            <div class="inpt_wrap">
                                <input type="password" placeholder="新密码为至少8位的数字字母混合" v-model="newpass" @blur="changename()">
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>确认新密码</dt>
                        <dd>
                            <p class="reg_ts" v-show="confirmerror"><img src="../../assets/images/erroricon.png" alt="">{{confirmerror}}</p>
                            <div class="inpt_wrap">
                                <input type="password" placeholder="确认密码" v-model="confirm" >
                            </div>
                        </dd>
                    </dl>
                    
                    <dl>
                        <dt>&nbsp;</dt>
                        <dd>
                            <div class="login_btn_wrap">
                                <span class="login_btn" @click="next()"> 下一步</span>
                            </div>
                            <div class="prepage">
                                <span @click="$router.back(-1)"> << 返回上一步</span>
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
import { constants } from 'crypto';
import { hexMD5 } from '@/assets/js/md5';
export default {
    data(){
    	return{
            loginbg:{backgroundImage:'url(' + require('../../assets/images/loginbg.png') + ')'},
            loginName:this.$route.params.loginName,
            newpass:'',
            newpasserror:null,
            confirm:'',
            confirmerror:null,
            password:''
    	}
    },
    mounted() {
        console.log(this.loginName)
        if(!this.$route.params.loginName){
            this.$router.replace('one');
        }
	},
    methods:{
        changename(){
            let passreg = /^(?=.*?[0-9])(?=.*?[a-zA-Z])[0-9a-zA-Z]{8,}$/
            let password=passreg.test(this.newpass)
            if(password){
                this.password=hexMD5(this.newpass)
                this.newpasserror=null;
            }else{
                this.newpasserror='密码需为至少8位的数字字母混合';
                return false
            }
        },
        next(){
            var that=this;
            if(this.newpass!=this.confirm){
                console.log('aaa')
                this.confirmerror='密码输入不一致';
                return false;
            }
            this.$request({
                method:'post',
                data:{
                   loginName:this.loginName,
                   password:this.password 
                },
                headers:{
					'content-type': "application/json;charset=UTF-8"
					// 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                url:'/register/resetPassword',
            }).then((res) => {
                console.log(res);
                if(res.data.code==0){
                    this.$router.push({
                        name:"three",
                        params:{
                            suc:true
                        }
                    })
                }else{
					this.$layer.msg('设置密码失败，请重新尝试',{time: 3})
				}
            }).catch((err) => {
                console.log(err);
            })
           // this.$router.push('three')
       } 
    },
    
}
</script>
<style src="../../assets/css/forget.css" scoped>
</style>