<template>
    <div class="wrap" :style="loginbg">
        <div class="logo">
            <img src="../../assets/images/logo2.png" alt="联合信任" />
        </div>
        <div class="content">
            <div class="cnt_left">
                <div class="lock">
                    <img src="../../assets/images/lock.png" alt />
                </div>
                <div class="axis">
                    <ul>
                        <li class="visited">
                            <div class="sline"></div>
                            <div class="circle">
                                <div class="big_c">
                                    <div class="small_c"></div>
                                </div>
                            </div>
                            <div class="title">验证身份</div>
                        </li>
                        <li>
                            <div class="sline"></div>
                            <div class="circle">
                                <div class="big_c">
                                    <div class="small_c"></div>
                                </div>
                            </div>
                            <div class="title">设置新密码</div>
                        </li>
                        <li>
                            <div class="sline"></div>
                            <div class="circle">
                                <div class="big_c">
                                    <div class="small_c"></div>
                                </div>
                            </div>
                            <div class="title">完成</div>
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
                        <img src="../../assets/images/slogan.png" alt="slogan" />
                    </div>
                    <div class="goback">
                        <router-link to="/login/login">
                            <b>
                                <img src="../../assets/images/goback.png" alt />
                            </b>
                            <span>
                                返回
                                <a>登录</a>
                            </span>
                        </router-link>
                    </div>
                </div>
                <div class="form">
                    <dl>
                        <dt>账号</dt>
                        <dd>
                            <p class="reg_ts" v-show="loginNameerror">
                                <img src="../../assets/images/erroricon.png" alt />
                                {{loginNameerror}}
                            </p>
                            <div class="inpt_wrap">
                                <input type="text" placeholder="手机号/邮箱" v-model="loginName" />
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>验证码</dt>
                        <dd>
                            <p class="reg_ts yzm_ts" v-show="yzmerror">
                                <img src="../../assets/images/erroricon.png" alt />
                                {{yzmerror}}
                            </p>
                            <div class="inpt_wrap yzm">
                                <input type="text" placeholder="输入验证码" v-model="yzm" />
                            </div>
                            <div class="yzm_btn">
                                <span
                                    :disabled="disabled"
                                    @click="getVerificationCode()"
                                >{{yzmtext}}</span>
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>&nbsp;</dt>
                        <dd>
                            <div class="slide">
                                <div style="width:100%">
                                    <SlideValidation @slide="getslide($event)"></SlideValidation>
                                </div>
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>&nbsp;</dt>
                        <dd>
                            <div class="login_btn_wrap">
                                <span class="login_btn" @click="next()">下一步</span>
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="footer">版权所有：北京联合信任技术服务有限公司 京ICP备13046264-2</div>
    </div>
</template>
<script>
import SlideValidation from "@/components/SlideValidation.vue";
import qs from "qs";
var interval = null;
import {getSign} from '@/assets/js/sign';
import { hexMD5 } from '@/assets/js/md5';
export default {
    components: {
        SlideValidation
    },
    data() {
        return {
            loginbg: {
                backgroundImage:
                    "url(" + require("../../assets/images/loginbg.png") + ")"
            },
            yzmtext: "获取验证码",
            currentTime: 61,
            sucyzm: "",
            yzm: "",
            loginName: "",
            loginNameerror: null,
            disabled: false,
            loginType: "",
            yzmerror: null
        };
    },
    mounted() {},
    methods: {
        async getVerificationCode() {
            let data = qs.stringify({
                loginName: this.loginName
            });
            await this.$request({
                    method: "post",
                    data: data,
                    headers: {
                        //'content-type': "application/json;charset=UTF-8"
                        "content-type":
                            "application/x-www-form-urlencoded;charset=UTF-8"
                    },
                    url: "/register/validate"
                }).then(res => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.loginNameerror = "账户不存在";
                        return false;
                    } else {
                        this.loginType = res.data.data.loginType;
                        this.loginNameerror = null;
                    }
                })
                .catch(err => {
                    console.log(err);
                });

            if (this.loginNameerror) {
                return false;
            }
            this.getCode();
            var that = this;
            that.disabled = true;

            var date = new Date();
            var timestamp = date.getTime();
            var res = {
                "timestamp": timestamp,
                "loginName":this.loginName,
                "loginType":this.loginType,
            }
            var signature=getSign(res);
            var json=JSON.stringify({
                    "loginName":this.loginName,
                    "loginType":this.loginType,
                    "signature":signature.toUpperCase(),
                    "timestamp":timestamp.toString()
                });

            this.$request({
                method: "post",
                data:json,
                headers: {
                    //'Content-Type': 'multipart/form-data'
                    "content-type": "application/json;charset=UTF-8"
                },
                url: "/register/sendValidateCode"
            })
                .then(res => {
                    console.log(res);
                    if (res.data.code == -1) {
                        alert("请求失败");
                        return false;
                    }
                    //this.sucyzm = res.data.data.code;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getCode: function(options) {
            var that = this;
            var currentTime = that.currentTime;
            interval = setInterval(function() {
                currentTime--;
                that.yzmtext = "(" + currentTime + "s)重新获取";
                if (currentTime <= 0) {
                    clearInterval(interval);
                    that.yzmtext = "重新获取";
                    that.currentTime = 61;
                    that.disabled = false;
                }
            }, 1000);
        },
        getslide(data) {
            if (data) {
                //console.log(data);
                this.slide = true;
            }
        },
        async next() {
            let that=this;
            var date = new Date();
            var timestamp = date.getTime();
            var res = {
                "timestamp": timestamp,
                "loginName":this.loginName,
                "verifyCode":this.yzm,
            }
            var signature=getSign(res);
            var json=JSON.stringify({
                    "timestamp": timestamp,
                    "loginName":this.loginName,
                    "verifyCode":this.yzm,
                    "signature":signature.toUpperCase(),
                    "timestamp":timestamp.toString()
                });
            await that.$request({
                method:'post',
                headers:{
                    'content-type': "application/json;charset=UTF-8"
                },
                data:json,
                url:'/register/getVerifyCode',
            }).then((res) => {
                console.log(res)
                if(res.data.code==0){
                    that.yzmerror=null
                }else{
                    that.yzmerror='验证码错误'
                }
            }).catch((err) => {
                console.log(err);
            })
            if(this.yzmerror){
                return false
            }
            if(!this.slide){
                this.$layer.msg('请先操作滑动验证',{time: 3})
                return false
            }
            this.$router.push({name:"two",params:{
                loginName:that.loginName
            }});
        }
    }
};
</script>
<style src="../../assets/css/forget.css" scoped>
</style>