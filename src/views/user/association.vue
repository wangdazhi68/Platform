<template>
    <div class="wrap">
        <el-container>
            <el-header height="80px">
                <userheader active="1"></userheader>
            </el-header>
            <el-container>
                <el-aside width="250px">
                    <el-menu
                        default-active="/user/association"
                        class="el-menu-vertical-demo"
                        text-color="#A3B1BF"
                        active-text-color="#3080FE"
                        active-background="#000"
                        router
                    >
                        <el-menu-item index="/user/index">
                            <i class="el-icon-user-solid"></i>
                            <span slot="title">基本信息</span>
                        </el-menu-item>
                        <el-menu-item index="/authentication/index">
                            <i class="el-icon-s-check"></i>
                            <span slot="title">实名认证</span>
                        </el-menu-item>
                        <el-menu-item index="/user/association">
                            <i class="el-icon-connection"></i>
                            <span slot="title">关联账号</span>
                        </el-menu-item>
                        <el-menu-item index="/user/security">
                            <i class="el-icon-s-claim"></i>
                            <span slot="title">安全中心</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <div class="nav-title">
                        <span>关联账号</span>
                    </div>
                    <div class="content">
                        <div class="title">
                            <span>关联账号</span>
                        </div>
                        <div class="attention">
                            <p>
                                <span class="zy">
                                <img src="../../assets/images/zyicon.png" alt />
                                </span>用于登录和验证身份，同时也是您个人信息的一部分。如有更换，请及时更新。
                            </p>
                        </div>
                        <div class="bind-wrap">
                            <div class="bind-list">
                                <span v-if="userdata.mobile" class="iconwrap">
                                    <img src="../../assets/images/user/phone1-1.png" alt="">
                                </span>
                                <span v-else class="iconwrap">
                                    <img src="../../assets/images/user/phone1.png" alt="">
                                </span>
                                <span v-if="userdata.mobile" class="key">
                                    手机号 
                                    <b>{{userdata.mobile}}</b>
                                </span>
                                <span v-else class="key">
                                    手机号
                                    <strong>(未绑定)</strong>
                                </span>
                                <span v-if="userdata.mobile" class="changebtn" @click="huan('phone','h')">更换</span>
                                <span v-else class="changebtn" @click="bang('phone','b')">
                                    绑定
                                </span>
                            </div>
                            <div class="bind-list">
                                <span class="iconwrap" v-if="userdata.email">
                                    <img src="../../assets/images/user/email1-1.png" alt="">
                                </span>
                                <span class="iconwrap" v-else>
                                    <img src="../../assets/images/user/email1.png" alt="">
                                </span>
                                <span v-if="userdata.email" class="key">
                                    邮箱 
                                    <b>{{userdata.email}}</b>
                                </span>
                                <span v-else class="key">
                                    邮箱 
                                    <strong>(未绑定)</strong>
                                </span>
                                <span v-if="userdata.email" class="changebtn" @click="huan('email','h')">更换</span>
                                <span v-else class="changebtn" @click="bang('email','b')">
                                    绑定
                                </span>
                            </div>
                            <div class="bind-three">
                                <h4><span>绑定</span></h4>
                                <ul>
                                    <li>
                                        <img src="../../assets/images/user/wx1.png" alt="">
                                        <p>
                                           <span class="changebtn">绑定</span> 
                                        </p>
                                    </li>
                                    <li>
                                        <img src="../../assets/images/user/qq1.png" alt="">
                                        <p>
                                           <span class="changebtn">绑定</span> 
                                        </p>
                                    </li>
                                    <li>
                                        <img src="../../assets/images/user/wb1.png" alt="">
                                        <p>
                                           <span class="changebtn">绑定</span> 
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
        <el-dialog :title="titlejiu" :visible.sync="dialogphonejiu" width="40%" center>
            <el-form :model="jiuyzm" status-icon :rules="rulesyzm1" ref="jiuyzm">
                <el-form-item  prop="yzm1">
                    <p>为确保是您本人操作，请进行身份验证。</p>
                    <p>{{xinyzm.loginType==1?userdata.mobile:userdata.email}}</p>
                    <el-input class="my-elinput" v-model="jiuyzm.yzm1" autocomplete="off" placeholder="请输入验证码"></el-input>
                    <span class="yzm" :disabled='disabled' @click="getVerificationCode(xinyzm.loginType==1?'phone':'email',1)">{{yzmtext}}</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogphonejiu = false">取 消</el-button>
                <el-button type="primary" @click="subjiuyzm('jiuyzm')">下一步</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="titlexin" :visible.sync="dialogphonexin" width="40%" center>
            <el-form :model="xinyzm" status-icon :rules="rulesyzm2" ref="xinyzm">
                <el-form-item  prop="loginName">
                    <el-input v-model="xinyzm.loginName" autocomplete="off" :placeholder="[xinyzm.loginType==1?'请输入要绑定的手机号':'请输入要绑定的邮箱']"></el-input>
                </el-form-item>
                <el-form-item  prop="yzm1">
                    <el-input class="my-elinput" v-model="xinyzm.yzm1" autocomplete="off" placeholder="请输入验证码"></el-input>
                    <span class="yzm" :disabled='disabled' @click="getVerificationCode(xinyzm.loginType==1?'phone':'email',2)">{{yzmtext}}</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogphonexin = false">取 消</el-button>
                <el-button type="primary" @click='subxinyzm("xinyzm")'>确定</el-button>
            </div>
        </el-dialog>

        

    </div>
</template>
<script>
import userheader from "./header.vue";
var interval = null;
import {getSign} from '@/assets/js/sign';
import { hexMD5 } from '@/assets/js/md5';
export default {
    components: {
        userheader
    },
    data() {
        var validateyzm1 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入验证码'));
            } 
            if(value.trim().length==0){
               callback(new Error('验证码不能为空'));
            }
            callback();
        };
        var vloginName = (rule, value, callback) => {
            if(this.xinyzm.loginType==1){
                var phone = this.xinyzm.loginName;
                if(!(/^1[3456789]\d{9}$/.test(phone))){ 
                    callback(new Error('手机号格式不正确'));
                }
            }else{
                var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                if(!reg.test(this.xinyzm.loginName)){ 
                    callback(new Error('邮箱格式不正确')); 
                }
            }   
            callback();
        };
        return {
            titlejiu:'验证身份',
            titlexin:'绑定手机号',
            userdata:{},
            dialogphonejiu:false,
            dialogphonexin:false,
            yzmtext:"获取验证码",
            disabled:false,
            currentTime: 61,
            loginState:'',
            jiuyzm:{
                yzm1:'',
            },
            xinyzm:{
                loginType:1,
                yzm1:'',
                loginName:'',
            },
            rulesyzm1: {
                yzm1: [
                    {validator: validateyzm1}
                ]
            },
            rulesyzm2: {
                yzm1: [
                    {validator: validateyzm1}
                ],
                loginName:[
                    {validator:vloginName}
                ]
            },
            sucyzm:'',
            type:'',//方式 h：更换 b:绑定
        };
    },
    created() {
        this.creatrequest()
        // let localdata=JSON.parse(localStorage.getItem('userinfo'))
        let localdata=this.$getlocalStorage('userinfo')
        this.loginState=localdata.loginType
    },
    mounted() {},
    computed: {},
    methods: {
        creatrequest(){
            let that=this;
            this.$request({
                method:'get',
                headers:{
                    'content-type': "application/json;charset=UTF-8"
                },
                url:'/customer/detail',
            }).then((res) => {
                console.log(res);
                if(res.data.code==0){
                    that.userdata=res.data.data;
                    
                }else{
                    that.$layer.msg('加载失败,请刷新重试',{shade: true,time: 3})
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        getVerificationCode(e,n){
            let data;
            if(n==2){
                if(this.xinyzm.loginType==1){
                    var phone = this.xinyzm.loginName;
                    if(!(/^1[3456789]\d{9}$/.test(phone))){ 
                        return false
                    }
                }else{
                    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                    if(!reg.test(this.xinyzm.loginName)){ 
                        return false  
                    }
                } 
                if(e=='phone'){
                    data={
                        loginName:this.xinyzm.loginName,
                        loginType:"1"
                    }
                }else{
                    data={
                        loginName:this.xinyzm.loginName,
                        loginType:"2"
                    }
                }

            }else{
                if(e=='phone'){
                    data={
                        loginName:this.userdata.mobile,
                        loginType:"1"
                    }
                }else{
                    data={
                        loginName:this.userdata.email,
                        loginType:"2"
                    }
                }
            }
            
            this.getCode();
            var that = this
            that.disabled=true;
            var date = new Date();
            var timestamp = date.getTime();
            var res = {
                "timestamp": timestamp,
                "loginName":data.loginName,
                "loginType":data.loginType,
            }
            var signature=getSign(res);
            var json=JSON.stringify({
                    "loginName":data.loginName,
                    "loginType":data.loginType,
                    "signature":signature.toUpperCase(),
                    "timestamp":timestamp.toString()
                });
            this.$request({
                method:'post',
                data:json,
                headers:{
                    'content-type': "application/json;charset=UTF-8"
                },
                url:'/register/sendValidateCode',
            }).then((res) => {
                console.log(res);
                if(res.data.code==-1){
                    that.$layer.msg('请求失败',{shade: true,time: 3})
                    return false
                }
                // this.sucyzm=res.data.data.code;
            }).catch((err) => {
                console.log(err);
            })
        },
        getCode() {
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
        logout(){
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
            setTimeout(() => {
                that.$store.commit('setuserinfo', '')
                localStorage.removeItem('userinfo')
                that.$router.replace({name:"login"})
            }, 3000);
        },
        huan(e,type){
            this.dialogphonejiu=true;
            this.type=type;
            clearInterval(interval)
            this.currentTime=61;
            this.disabled=false;
            this.yzmtext='获取验证码';
            if(e=='phone'){
                this.titlejiu='验证身份';
                this.titlexin='绑定新手机号';
                this.xinyzm.loginType=1;
            }else{
                this.titlejiu='验证身份';
                this.titlexin='绑定新邮箱';
                this.xinyzm.loginType=2;
            }
        },
        bang(e,type){
            this.dialogphonexin=true;
            this.type=type;
            clearInterval(interval)
            this.currentTime=61;
            this.disabled=false;
            this.yzmtext='获取验证码';
            
            if(e=='phone'){
                this.titlexin='绑定手机号';
                this.xinyzm.loginType=1;
            }else{
                this.titlexin='绑定邮箱';
                this.xinyzm.loginType=2;
            }
        },
        subjiuyzm(jiuyzm){ 
            let that=this;
           this.$refs[jiuyzm].validate((valid) => {
                if (valid) {
                    var date = new Date();
                    var timestamp = date.getTime();
                    var res = {
                        "timestamp": timestamp,
                        "loginName":this.xinyzm.loginType==1?this.userdata.mobile:this.userdata.email,
                        "verifyCode":this.jiuyzm.yzm1
                    }
                    var signature=getSign(res);
                    var json=JSON.stringify({
                            "timestamp": timestamp,
                            "loginName":this.xinyzm.loginType==1?this.userdata.mobile:this.userdata.email,
                            "verifyCode":this.jiuyzm.yzm1,
                            "signature":signature.toUpperCase(),
                            "timestamp":timestamp.toString()
                        });
                    that.$request({
                        method:'post',
                        headers:{
                            'content-type': "application/json;charset=UTF-8"
                        },
                        data:json,
                        url:'/register/getVerifyCode',
                    }).then((res) => {
                        if(res.data.code==0){
                            this.yzmtext="获取验证码";
                            this.disabled=false;
                            this.currentTime=61;
                            this.dialogphonejiu=false;
                            this.dialogphonexin=true;
                            clearInterval(interval);
                            this.$refs[jiuyzm].resetFields();
                        }else{
                            this.sucyzm=false
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        subxinyzm(xinyzm){
            this.$refs[xinyzm].validate((valid) => {
                if (valid) {
                    var that=this;
                    var urlrequest;
                    if(that.type=='h'){
                        urlrequest='/register/rebind'
                    }else{
                        urlrequest='/register/bind'
                    }
                    this.$request({
                        method:'post',
                        headers:{
                            'content-type': "application/json;charset=UTF-8"
                        },
                        data:{
                            loginType:that.xinyzm.loginType,
                            loginName:that.xinyzm.loginName,
                            verifyCode:that.xinyzm.yzm1
                        },
                        url:urlrequest,
                    }).then((res) => {
                        console.log(res);
                        if(res.data.code==0){
                            that.creatrequest();
                            that.dialogphonexin=false;
                            console.log([
                                that.type,
                                that.loginState,
                                that.xinyzm.loginType,
                            ])
                            if(that.type=='h' && that.loginState==1 &&that.xinyzm.loginType==1){
                                that.$layer.msg('手机号更换成功,请重新登录',{shade: true,time: 3})
                                that.logout();
                                return true
                            }
                            if(that.type=='h' && that.loginState==2 && that.xinyzm.loginType==2){
                                that.$layer.msg('邮箱更换成功,请重新登录',{shade: true,time: 3})
                                that.logout();
                                return true
                            }
                            if(that.xinyzm.loginType==1){
                                that.$layer.msg('手机号绑定成功',{shade: true,time: 3})  
                            }else{
                                that.$layer.msg('邮箱绑定成功',{shade: true,time: 3})
                            } 
                            this.$refs[xinyzm].resetFields();    
                        }else if(res.data.code==-1){
                            that.$layer.msg(res.data.msg,{shade: true,time: 3})  
                        }else{
                            alert('加载失败，请重试')
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                    this.yzmtext="获取验证码";
                    this.disabled=false;
                    this.currentTime=61;
                    this.dialogphonejiu=false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        }
    }
};
</script>
<style src="../../assets/css/elcnt.css" scoped></style>
<style scoped>
.content {
    background: #fff;
    padding: 0 46px;
    box-sizing: border-box;
    padding-bottom: 30px;
    min-height: 780px;
}
.title {
    height: 74px;
    line-height: 74px;
    text-align: left;
    border-bottom: 1px solid #e1e6eb;
    margin-bottom: 15px;
}
.attention {
    text-align: center;
    background: #FFF3EB;
    width:100%;
    height: 56px;
    line-height: 56px;
    font-size: 14px;
    color: #FF6600;
    text-align: left;
    padding: 0 30px;
    box-sizing: border-box;
}
.zy {
    vertical-align: -4px;
    margin-right: 20px;
    display: inline-block;
}
.bind-wrap{
    width:530px;
    margin:0 auto;
    margin-top:61px;
}
.bind-list{
    border-bottom: 1px dashed #E1E6EB;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
    font-size: 18px;
    padding: 15px 0;
}
.key{
    flex: 4;
    text-align: left;
    padding-left:34px; 
}
.key b{
    display: inline-block;
    margin-right: 5px;
}
.key strong{
    color:#FF6600;
    display: inline-block;
    margin-right: 10px;
}
.changebtn{
    display:inline-block;
    width:67px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    color:#1890FF;
    border:1px solid #E1E6EB;
    border-radius: 16px;
    cursor: pointer;
}
.changebtn:hover{
    background:#1890FF;
    color:#fff;
    border:1px solid #1890FF;
}
.bind-three{
    margin-top: 60px;
}
.bind-three h4{
    border-top:1px dashed #E1E6EB;
    position: relative;
}
.bind-three h4 span{
    display: inline-block;
    background:#fff;
    width:80px;
    font-size: 22px;
    position: absolute;
    top:-18px;
    left:0;
    right:0;
    margin:0 auto;
}
.bind-three ul{
    padding-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.bind-three ul p{
    margin-top:30px;
}
.yzm{
    display: inline-block;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    box-sizing: border-box;
    color: #606266;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    width:150px;
    text-align: center;
    margin-left: 30px;
    cursor: pointer;
    color:#1890FF;
}
.yzm:hover{
    background:#1890FF;
    color:#fff;
    border: 1px solid #1890FF;
}
.yzm[disabled]{
    color:#C8C8C8;
    background:#E1E6EB;
    pointer-events: none;
}




</style>
<style>
/* .el-collapse-item__header {
    height: auto !important;
    line-height: inherit !important;
    padding-bottom: 20px !important;
    border-bottom: 1px solid #e1e6eb !important;
}
.el-collapse-item__wrap {
    border: none !important;
}
.el-select{
    width:100%;
}
.el-cascader{
    width:100% !important;
} */
.my-elinput{
    display: inline-block;
    width:50%;
}
</style>
