<template>
    <div class="wrap">
        <el-container>
            <el-header height="80px">
                <userheader active="1"></userheader>
            </el-header>
            <el-container>
                <el-aside width="250px">
                    <el-menu
                        default-active="/user/security"
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
                        <span>安全中心</span>
                    </div>
                    <div class="content">
                        <div class="saf_center">
                            <div class="kuang" @click="dialogpsw = true">
                                <dl>
                                    <dt><img src="../../assets/images/user/pswico.png" alt=""></dt>
                                    <dd>
                                        <h4>修改密码</h4>
                                        <p>修改</p>
                                    </dd>
                                </dl>
                                <span class="kuang-gb"> <img src="../../assets/images/user/pswbg.png" alt=""> </span>
                            </div>
                            <div class="kuang" @click="dialogphone = true">
                                <dl>
                                    <dt><img src="../../assets/images/user/logout.png" alt=""></dt>
                                    <dd>
                                        <h4>注销账号</h4>
                                        <p>注销</p>
                                    </dd>
                                </dl>
                                <span class="kuang-gb"> <img src="../../assets/images/user/logoutbg.png" alt=""> </span>
                            </div>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
        <el-dialog title="修改密码" :visible.sync="dialogpsw" width="40%" center :close-on-click-modal='false' :modal-append-to-body='false'>
            <el-form :model="modify" status-icon :rules="rulespsw" ref="modify">
                <el-form-item label="旧密码" label-width="85px"  prop="oldPassword">
                    <el-input type="password" v-model="modify.oldPassword" autocomplete="off" placeholder="请输入旧密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码" label-width="85px"  prop="password">
                    <el-input type="password" v-model="modify.password" autocomplete="off" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" label-width="85px"  prop="confirm">
                    <el-input type="password" v-model="modify.confirm" autocomplete="off" placeholder="请确认新密码"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogpsw = false">取 消</el-button>
                <el-button type="primary" @click="submodify('modify')">确定</el-button>
            </div>
        </el-dialog>
        <!-- 注销账号 -->
        <el-dialog title="验证身份" :visible.sync="dialogphone" width="40%" center>
            <el-form :model="phoneyzm" status-icon :rules="rulesyzm" ref="phoneyzm">
                <el-form-item  prop="yzm">
                    <p>为确保是您本人操作，请进行身份验证。</p>
                    <p>{{userdata.source=='mobile'?userdata.mobile:userdata.email}}</p>
                    <el-input class="my-elinput" v-model="phoneyzm.yzm" autocomplete="off" placeholder="请输入验证码"></el-input>
                    <span class="yzm" :disabled='disabled' @click="getVerificationCode('phone',1)">{{yzmtext}}</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogphone = false">取 消</el-button>
                <el-button type="primary" @click="subyzm('phoneyzm')">下一步</el-button>
            </div>
        </el-dialog>
        <el-dialog title="注销账号" :visible.sync="dialogout" width="40%" center>
            <div class="outts">
                <p>
                即将永久删除联合信任账号：<strong class="red">{{userdata.source=='mobile'?userdata.mobile:userdata.email}}</strong>。删除后，您将不能使用该账号访问联合信任服务，包括：壹签、版权服务、权利卫士、网页取证，经销商相关系统，时间戳服务及U-RA服务等，也无法恢复该账号。
                </p>
                <p>
                    同时，将永久删除该账号在联合信任及相关以上产品内的个人数据。被删除数据无法恢复。
                </p>
                <p>
                同时，将永久删除该账号在联合信任及相关以上产品内的个人数据。被删除数据无法恢复。  
                </p>
                <p class="red">
                    您是否要永久注销该联合信任账号？
                </p>
            </div>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogout = false">取 消</el-button>
                <el-button type="primary" @click="sublogout()">注销</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import userheader from "./header.vue";
import { hexMD5 } from '@/assets/js/md5';
var interval = null;
export default {
    components: {
        userheader
    },
    data() {
        var validapsw = (rule, value, callback) => {
            let passreg = /^(?=.*?[0-9])(?=.*?[a-z])[0-9a-z]{8,}$/
            let password=passreg.test(value)
            if (!password) {
                callback(new Error('密码需为至少8位的数字字母组合'));
            } 
            callback();
        };
        var validaconfirm = (rule, value, callback) => {
            if (value==this.modify.password) {
                callback();
            }else{
                callback(new Error('两次密码输入不一致'));
            }
        };
        var validateyzm = (rule, value, callback) => {
            console.log(this.sucyzm)
            if (value === '') {
                callback(new Error('请输入验证码'));
            } 
            if(value==this.sucyzm && value.length>0){
                callback();
            }else{
                callback(new Error('验证码错误'));
            }
            callback();
        };
        return {
            dialogpsw:false,
            dialogphone:false,
            dialogout:false,
            userdata:{},
            modify:{
                oldPassword:'',
                password:'',
                confirm:''
            },
            rulespsw:{
                oldPassword:[{validator: validapsw,trigger: 'blur'}],
                password:[{validator: validapsw,trigger: 'blur'}],
                confirm:[{validator: validaconfirm,trigger: 'blur'}]
            } ,
            phoneyzm:{
                yzm:''
            },
            rulesyzm:{
                yzm: [
                    {validator: validateyzm}
                ]
            },
            sucyzm:'',
            yzmtext:"获取验证码",
            disabled:false,
            currentTime: 61,
        }
    },
    created() {
        this.creatrequest()
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
        getVerificationCode(){
            let data;
            this.getCode();
            var that = this
            that.disabled=true;
            this.$request({
                method:'post',
                data:{
                    loginName:this.userdata.mobile,
                    loginType:this.userdata.source=='mobile'?1:2, 
                },
                headers:{
                    'content-type': "application/json;charset=UTF-8"
                },
                url:'/register/sendValidateCode',
            }).then((res) => {
                console.log(res);
                if(res.data.code==-1){
                    alert('请求失败')
                    return false
                }
                this.sucyzm=res.data.data.code;
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
        submodify(modify){
            this.$refs[modify].validate((valid) => {
                if (valid) {
                    var that=this;
                    this.$request({
                        method:'post',
                        headers:{
                            'content-type': "application/json;charset=UTF-8"
                        },
                        data:{
                            oldPassword:hexMD5(that.modify.oldPassword),
                            password:hexMD5(that.modify.password)
                        },
                        url:'/register/updatePassword',
                    }).then((res) => {
                        console.log(res);
                        if(res.data.code==0){
                            that.$layer.msg('密码修改成功',{shade: true,time: 3})

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
                            
                        }else if(res.data.code==-1){
                           that.$layer.msg(res.data.msg,{shade: true,time: 3}) 
                        }else{
                            alert('加载失败，请重试')
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                    this.$refs[modify].resetFields();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        subyzm(phoneyzm){
            this.$refs[phoneyzm].validate((valid) => {
                if (valid) {
                    this.yzmtext="获取验证码";
                    this.disabled=false;
                    this.currentTime=61;
                    this.sucyzm='';
                    this.dialogphone = false,
                    this.dialogout=true,
                    
                    clearInterval(interval);
                    this.$refs[phoneyzm].resetFields();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        sublogout(){
            var that=this;
            this.$request({
                method:'post',
                headers:{
                    'content-type': "application/json;charset=UTF-8"
                },
                url:'/register/logoff',
            }).then((res) => {
                console.log(res);
                if(res.data.code==0){
                    that.$layer.msg('注销成功',{shade: true,time: 3})
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
                }else if(res.data.code==-1){
                    that.$layer.msg(res.data.msg,{shade: true,time: 3}) 
                }else{
                    alert('加载失败，请重试')
                }
            }).catch((err) => {
                console.log(err);
            })

        },
    }
}
</script>
<style src="../../assets/css/elcnt.css" scoped></style>
<style scoped>
.content {
    box-sizing: border-box;
    padding-bottom: 30px;
    min-height: 780px;
}
.kuang{
    background:#fff;
    width:40%;
    position: relative;
    float: left;
    margin-right: 40px;
    cursor: pointer;
}
.kuang dl{
    overflow: hidden;
    padding: 30px 50px;
}
.kuang dt,.kuang dd{
    float:left;
}
.kuang dd{
    text-align: left;
    padding-top: 12px;
    padding-left: 20px;
}
.kuang h4{
    font-size: 20px;
    color:#424242;
    margin-bottom: 10px;
}
.kuang p{
    font-size: 16px;
    color:#1890FF;
}
.kuang-gb{
    position: absolute;
    bottom: 0;
    right:0;
}
.kuang:hover{
    box-shadow:0px 5px 10px 0px rgba(24, 144, 255, 0.15);
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
.outts{
    line-height: 25px;
}
.red{
    color:#000;
    font-weight: 700;
    font-size: 16px;
}
</style>  
<style>
.vl-notify.vl-notify-msg{
    z-index: 9999 !important;
}
.vl-notify-mask{
    z-index: 9998
}
.my-elinput{
    display: inline-block;
    width:50%;
}
</style> 