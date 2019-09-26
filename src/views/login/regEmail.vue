<template>
    <div class="regemail">
        <div class="form">
            <div class="account">
                <p class="reg_ts" v-show="loginNameerror"><img src="../../assets/images/erroricon.png" alt="">{{loginNameerror}}</p>
                <div class="ipt_bg">
                    <img src="../../assets/images/yxicon.png" alt="">
                    <input type="text" placeholder="请输入邮箱" v-model="loginName" value="" name="loginName">
                </div>
            </div>
            <div class="password">
                <p class="reg_ts yzm_ts" v-show="yzmerror"><img src="../../assets/images/erroricon.png" alt="">{{yzmerror}}</p>
                <div class="ipt_bg yzm">
                    <input type="text" placeholder="验证码" v-model="yzm" value="" name="yzm">
                </div>
                <div class="yzm_btn">
                    <span :disabled='disabled' @click="getVerificationCode()">{{yzmtext}}</span>
                </div>
                <div style="clear:both"></div>
            </div>
            <div class="slide">
                <div style="width:100%">
                    <SlideValidation @slide="getslide($event)"></SlideValidation>
                </div>
            </div>
            <div class="password">
                <p class="reg_ts" v-show="passerror"><img src="../../assets/images/erroricon.png" alt="">{{passerror}}</p>
                <div class="ipt_bg">
                    <img src="../../assets/images/pasicon.png" alt="">
                    <input type="password" placeholder="密码需为8位的数字字母组合" v-model="password" value="" name="password">
                </div>
            </div>
            <div class="account">
                <p class="reg_ts"><img src="../../assets/images/erroricon.png" alt="">推荐码不存在</p>
                <div class="ipt_bg">
                    <img src="../../assets/images/yqicon.png" alt="">
                    <input type="text" placeholder="请填写推荐码（选填）">
                </div>
            </div>
            <div class="xieyi">
                <input type="checkbox" id="check" v-model="checked" @change="red()">
                <label for="check">
                    <img v-show="!checked" src="@/assets/images/check.png" alt="">
                    <img  v-show="checked" src="@/assets/images/check_v.png" alt="">
                    <span>
                        我已同意相关 <a href="#">注册协议</a> 以及 <a href="#">保密协议</a>
                    </span>
                </label>
            </div>
            <div class="login_btn_wrap">
                <span class="login_btn" @click="reg()" :logindisabled='logindisabled'>注册</span>
            </div>
            <div class="reg_btn_wrap">
                <router-link to="/">
                    <span class="reg_btn" @click="gologin()">
                        返回登录
                    </span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import SlideValidation from '@/components/SlideValidation.vue'
var interval = null;
import { hexMD5 } from '@/assets/js/md5';
import qs from 'qs'
export default {
    components: {
        SlideValidation
    },
    data() {
        return {
            checked: false,
            loginbg: { backgroundImage: 'url(' + require('../../assets/images/loginbg.png') + ')' },
            logincntbg: { backgroundImage: 'url(' + require('../../assets/images/logincntbg.png') + ')' },
            yzmtext:'获取验证码',
            disabled:false,
            currentTime: 61,
            loginName:'',
            loginType:'',
            password:'',
            yzm:'',
            sucyzm:'',
            loginNameerror:null,
            yzmerror:null,
            passerror:null,
            slide:false,
            logindisabled:true,
        }
    },
    mounted() {

    },
    methods: {
        async getVerificationCode(){
            var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            if(reg.test(this.loginName)){ 
                this.loginNameerror=null;
            } else{
                this.loginNameerror='请输入正确的邮箱'
                return false  
            }


            let data=qs.stringify({
                    loginName:this.loginName,
				});
			await this.$request({
                method:'post',
                data:data,
                headers:{
					'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                url:'/register/validate',
            }).then((res) => {
                console.log(res);
                if(res.data.code==0){
                    this.loginNameerror=null
                }else{
                    this.loginNameerror='账户已存在'
                    return false
				}
            }).catch((err) => {
                console.log(err);
            });
            if(this.loginNameerror){
                return false
            }

            this.getCode();
            var that = this
            that.disabled=true;
            this.$request({
                method:'post',
                data:{
                    loginName:this.loginName,
                    loginType:2
                },
                headers:{
                    //'Content-Type': 'multipart/form-data'
                    'content-type': "application/json;charset=UTF-8"
                },
                url:'/register/sendValidateCode',
            }).then((res) => {
                console.log(res);
                if(res.data.code==-1){
                    alert('请求失败')
                    return false
                }else if(res.data.code==-100){
                    this.loginNameerror='账户已存在'
                    return false
                }
                this.sucyzm=res.data.data.code;
            }).catch((err) => {
                console.log(err);
            })
        },
        getCode: function (options) {
            var that = this;
            var currentTime = that.currentTime
            interval = setInterval(function () {
                currentTime--;
                that.yzmtext='('+currentTime + 's)重新获取'
                if (currentTime <= 0) {
                    clearInterval(interval)
                    that.yzmtext='重新获取';
                    that.currentTime=61;
                    that.disabled=false;
                }
            }, 1000)
        },
        red(){
            if(this.slide && this.checked){
                this.logindisabled=false;
            }else{
                this.logindisabled=true;
            }
        },
        getslide(data){
            if(data){
                //console.log(data);
                this.slide=true;
                this.red();
            }   
        },
        reg() {
            var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            if(reg.test(this.loginName)){ 
                this.loginNameerror=null;
            } else{
                this.loginNameerror='请输入正确的邮箱'
                return false  
            }

            if(this.yzm==this.sucyzm && this.yzm.length>0){
                this.yzmerror=null;     
            }else{
                this.yzmerror='验证码错误'
                return false
            }
            let passreg = /^(?=.*?[0-9])(?=.*?[a-zA-Z])[0-9a-zA-Z]{8,}$/
            let password=passreg.test(this.password)
            if(password){
                this.password=hexMD5(this.password)
            }else{
                this.passerror='密码格式错误';
                return false
            }

            if(this.slide && this.checked){
                this.logindisabled=false;
            }
            let that=this;
            this.$request({
                method:'post',
                data:{
                    loginName:that.loginName,
                    loginType:2,
                    password:that.password
                },
                headers:{
                    'content-type': "application/json;charset=UTF-8"
                },
                url:'/register/newRegister',
            }).then((res) => {
                console.log(res);
                if(res.data.code==0){
                    setTimeout(this.$layer.msg('注册成功',{shade: true,time: 3},function(){
                        window.location.href = that.$http+'login/login'
                    }),3000);
                }else if(res.data.code==-1){
                    this.loginNameerror=res.data.msg;
                }

            }).catch((err) => {
                console.log(err);
            })
        },
        gologin(){
            window.location.href = this.$http+'login/login'
        }
    },

}
</script>