<template>
    <div class="wrap">
        <el-container>
            <el-header height="80px">
                <userheader active="1"></userheader>
            </el-header>
            <el-container>
                <el-aside width="250px">
                    <el-menu
                        default-active="/user/index"
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
                        <span>基本信息</span>
                    </div>
                    <div class="content">
                        <el-row :gutter="15">
                            <el-col :span="9">
                                <div class="idinfor">
                                    <div class="idtop">
                                        <dl>
                                            <dt>
                                                <img src="../../assets/images/user_tx.png" alt />
                                            </dt>
                                            <dd>
                                                <p>{{userdata.userName?userdata.userName:'用户名'}}</p>
                                                <div class="namebot">
                                                    <span v-if="userdata.approveStatus=='1'">已认证</span>
                                                    <span v-else>未认证</span>
                                                    <b></b>
                                                    <strong @click="dialogUsername = true" v-if="!userdata.userName">设置用户名</strong>
                                                </div>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="idbot">
                                        <dl>
                                            <dt>联合信任通行ID：</dt>
                                            <dd>{{userdata.unitrustNO}}</dd>
                                        </dl>
                                        <dl>
                                            <dt>注册时间：</dt>
                                            <dd>{{userdata.createTime}}</dd>
                                        </dl>
                                        <dl>
                                            <dt>绑定手机号：</dt>
                                            <dd>{{userdata.mobile}}</dd>
                                        </dl>
                                        <dl>
                                            <dt>绑定邮箱：</dt>
                                            <dd>{{userdata.email?userdata.email:'无'}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="15">
                                <div class="enterinfo">
                                    <div class="enterinfo-title">
                                        <span>企业信息</span>
                                    </div>
                                    <div class="enterinfo-cnt">
                                        <ul>
                                            <li>
                                                <div>企业名称</div>
                                                <div class="two">{{userdata.enterpriseName?userdata.enterpriseName:'无'}}</div>
                                                <div class="three"></div>
                                            </li>
                                            <li>
                                                <div>账号角色</div>
                                                <div class="two">{{role?role:'无'}}</div>
                                                <div class="three"></div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="12">
                                <div class="autheninfo">
                                    <el-collapse accordion v-model="activeNames">
                                        <el-collapse-item name="1">
                                            <template slot="title">
                                                <span class="boxtitle">认证信息</span>
                                            </template>
                                            <ul class="authenlist">
                                                <li>
                                                    <div>认证状态</div>
                                                    <div class="two" v-if="userdata.approveStatus=='1'">已认证</div>
                                                    <div class="two" v-else>未认证</div>
                                                    <div v-if="userdata.approveStatus!='1'" class="gorz" @click="gorz()">去认证</div>
                                                    <div v-else class="gorz"></div>
                                                </li>
                                                <li>
                                                    <div>认证类型</div>
                                                    <div class="two" v-if="userdata.approveStatus=='1'">个人</div>
                                                    <div class="two" v-if="userdata.approveStatus=='2'">企业</div>
                                                    <div class="two" v-if="userdata.approveStatus=='0'">未认证</div>
                                                    <div class="gorz"></div>
                                                </li>
                                                <li>
                                                    <div>真实姓名/企业名称</div>
                                                    <div class="two" v-if="userdata.approveStatus=='1'">{{userdata.realName}}</div>
                                                    <div class="two" v-if="userdata.approveStatus=='2'">{{userdata.enterpriseName}}</div>
                                                    <div class="two" v-if="userdata.approveStatus=='0'">无</div>
                                                    <div class="gorz"></div>
                                                </li>
                                                <li>
                                                    <div>认证证件号</div>
                                                    <div class="two" v-if="userdata.approveStatus=='1'">{{userdata.identityId}}</div>
                                                    <div class="two" v-if="userdata.approveStatus=='2'">{{userdata.licenseNo}}</div>
                                                    <div class="two" v-if="userdata.approveStatus=='0'">无</div>
                                                    <div class="gorz"></div>
                                                </li>
                                            </ul>
                                        </el-collapse-item>
                                    </el-collapse>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="autheninfo">
                                    <el-collapse accordion v-model="activeNames2">
                                        <el-collapse-item name="1">
                                            <template slot="title">
                                                <span class="boxtitle">其它信息</span>
                                            </template>
                                            <ul class="authenlist userinfo">
                                                <li>
                                                    <div>性别</div>
                                                    <div class="two">{{sex}}</div>
                                                    <div class="edit">
                                                        <span @click="dialogUsersex = true">编辑</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div>职业</div>
                                                    <div class="two">{{userdata.jobType}}</div>
                                                    <div class="edit">
                                                        <span @click="dialogjobType = true">编辑</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div>联系方式</div>
                                                    <div class="two">{{userdata.mobile}}</div>
                                                    <div class="edit" v-if="userdata.source=='mobile'">
                                                        <span @click='$router.push({ name: "association"})'>更换</span>
                                                    </div>
                                                    <div class="edit"  v-else>
                                                        <span @click='$router.push({ name: "association"})'>绑定</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div>联系地址</div>
                                                    <div class="two">{{userdata.province}}{{userdata.city}}{{userdata.county}}{{userdata.address}}</div>
                                                    <div class="edit">
                                                        <span @click="dialogaddress = true">编辑</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div>邮政编码</div>
                                                    <div class="two">{{userdata.postCode}}</div>
                                                    <div class="edit">
                                                        <span @click="dialogpostCode=true">编辑</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </el-collapse-item>
                                    </el-collapse>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-main>
            </el-container>
        </el-container>
        <el-dialog title="修改用户名" :visible.sync="dialogUsername" width="30%">
            <el-form :model="formname" status-icon :rules="rulesname" ref="formname">
                <el-form-item  :label-width="formLabelWidth" prop="loginName">
                    <p>用户名用于登录,只能设置一次</p>
                    <el-input v-model="formname.loginName" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUsername = false">取 消</el-button>
                <el-button type="primary" @click="subname('formname')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑性别" :visible.sync="dialogUsersex" width="30%">
            <el-form :model="formsex" status-icon :rules="rulessex" ref="formsex">
                <el-form-item label="性别" label-width="50px" prop="sex">
                    <el-select v-model="formsex.sex" placeholder="性别">
                        <el-option label="男" value="1"></el-option>
                        <el-option label="女" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUsersex = false">取 消</el-button>
                <el-button type="primary" @click="subsex('formsex')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑职业" :visible.sync="dialogjobType" width="30%">
            <el-form :model="formjobType" status-icon  ref="formjobType" >
                <el-form-item label="职业" label-width="45px">
                    <el-input v-model="formjobType.jobType" placeholder="请输入职业,例医生,律师等" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogjobType = false">取 消</el-button>
                <el-button type="primary" @click="subjobType('formjobType')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="联系地址" :visible.sync="dialogaddress" width="35%">
            <el-form :model="formaddress" status-icon  ref="formaddress" >
                <el-form-item label="所在地区" label-width="70px">
                    <el-cascader
                        placeholder="省 / 市 / 区（县）"
                        size="large"
                        :options="options"
                        v-model="selectedOptions"
                        @change="addressChange">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="详细地址" label-width="70px">
                    <el-input v-model="formaddress.address" placeholder="请输入详细地址" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogaddress = false">取 消</el-button>
                <el-button type="primary" @click="subaddress('formaddress')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="邮政编码" :visible.sync="dialogpostCode" width="30%">
            <el-form :model="formpostCode" status-icon  ref="formpostCode" >
                <el-form-item label="邮政编码" label-width="70px">
                    <el-input v-model="formpostCode.postCode" placeholder="请输入邮政编码" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogpostCode = false">取 消</el-button>
                <el-button type="primary" @click="subpostCode('formpostCode')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import userheader from "./header.vue";
import { regionData,CodeToText,TextToCode } from 'element-china-area-data'
export default {
    components: {
        userheader
    },
    data() {
        var validatename = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } 
            if(!(/^[a-zA-Z0-9_-]{4,16}$/).test(value)){
                callback(new Error('请输入4到16位（字母，数字，下划线，减号组成的用户名）'));
            }
            callback();
        
        };
        return {
            options: regionData,
            selectedOptions: [],
            userdata:{},
            activeNames: ["1"],
            activeNames2: ["1"],
            dialogUsername: false,
            dialogUsersex: false,
            dialogjobType:false,
            dialogaddress:false,
            dialogpostCode:false,
            formLabelWidth: "0px",
            formname:{
                loginName: "",
                loginType:0
            },
            formsex:{
                sex:''
            },
            formjobType: {
                jobType:'',
            },
            formaddress:{
                address:'',
                province:'',
                city:'',
                county:''
            },
            formpostCode:{
                postCode:''
            },
            rulesname: {
                loginName: [
                    { validator: validatename }
                ]
            },
            rulessex:{
                sex:[{ required: true, message: '请选择性别', trigger: 'change' }]
            },

        };
    },
    created(){
        this.creatrequest()
    },
    mounted() {},
    computed:{
        role(){
            if(this.userdata.role=='1'){
                return '管理员'
            }else if(this.userdata.role=='0'){
                 return '员工'
            }else{
                return null
            }
        },
        sex(){
           if(this.userdata.sex){
               if(this.userdata.sex=='1'){
                   return '男'
               }else{
                   return '女'
               }
           } else{
               return
           }
        }
    },
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
                    that.formsex.sex=res.data.data.sex;
                    that.formjobType.jobType=res.data.data.jobType;
                    that.formpostCode.postCode=res.data.data.postCode;
                    that.formaddress={
                        address:res.data.data.address,
                        province:res.data.data.province,
                        city:res.data.data.city,
                        county:res.data.data.county
                    }
                    that.selectedOptions=[
                        TextToCode[res.data.data.province].code,
                        TextToCode[res.data.data.province][res.data.data.city].code,
                        TextToCode[res.data.data.province][res.data.data.city][res.data.data.county].code,
                    ]
                }else{
                    that.$layer.msg('加载失败,请刷新重试',{shade: true,time: 3})
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        addressChange(arr) {
            // console.log(arr);
            // console.log(CodeToText[arr[0]], CodeToText[arr[1]], CodeToText[arr[2]]);
            this.formaddress.province= CodeToText[arr[0]];
            this.formaddress.city=CodeToText[arr[1]];
            this.formaddress.county=CodeToText[arr[2]];
        },
        subname(formname){
            var that=this;
            this.$refs[formname].validate((valid) => {
                if (valid) {
                     this.$request({
                        method:'post',
                        headers:{
                            'content-type': "application/json;charset=UTF-8"
                        },
                        data:this.formname,
                        url:'/register/bind',
                    }).then((res) => {
                        console.log(res);
                        if(res.data.code==0){
                            that.creatrequest();                       
                            that.dialogUsername=false;
                            that.$layer.msg('设置用户名成功',{shade: true,time: 3})   
                        }else{
                            that.$layer.msg('加载失败,请刷新重试',{shade: true,time: 3})
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        subsex(formsex){
            var that=this;
            this.$refs[formsex].validate((valid) => {
                if (valid) {
                     this.$request({
                        method:'post',
                        headers:{
                            'content-type': "application/json;charset=UTF-8"
                        },
                        data:this.formsex,
                        url:'/customer/update',
                    }).then((res) => {
                        if(res.data.code==0){
                            that.creatrequest();
                            that.dialogUsersex=false;
                            that.$layer.msg('编辑成功',{shade: true,time: 3}) 
                        }else{
                            that.$layer.msg('加载失败,请刷新重试',{shade: true,time: 3})
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        subjobType(formjobType){
            var that=this;
            this.$refs[formjobType].validate((valid) => {
                if (valid) {
                     this.$request({
                        method:'post',
                        headers:{
                            'content-type': "application/json;charset=UTF-8"
                        },
                        data:this.formjobType,
                        url:'/customer/update',
                    }).then((res) => {
                        if(res.data.code==0){
                            that.creatrequest();
                            that.dialogjobType=false;
                            that.$layer.msg('编辑成功',{shade: true,time: 3}) 
                        }else{
                            that.$layer.msg('加载失败,请刷新重试',{shade: true,time: 3})
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        subaddress(formaddress){
            var that=this;
            this.$refs[formaddress].validate((valid) => {
                if (valid) {
                     this.$request({
                        method:'post',
                        headers:{
                            'content-type': "application/json;charset=UTF-8"
                        },
                        data:this.formaddress,
                        url:'/customer/update',
                    }).then((res) => {
                        if(res.data.code==0){
                            that.creatrequest();
                            that.dialogaddress=false;
                            that.$layer.msg('编辑成功',{shade: true,time: 3}) 
                        }else{
                            that.$layer.msg('加载失败,请刷新重试',{shade: true,time: 3})
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        subpostCode(formpostCode){
            var that=this;
            this.$refs[formpostCode].validate((valid) => {
                if (valid) {
                     this.$request({
                        method:'post',
                        headers:{
                            'content-type': "application/json;charset=UTF-8"
                        },
                        data:this.formpostCode,
                        url:'/customer/update',
                    }).then((res) => {
                        if(res.data.code==0){
                            that.creatrequest();
                            that.dialogpostCode=false;
                            that.$layer.msg('编辑成功',{shade: true,time: 3}) 
                        }else{
                            that.$layer.msg('加载失败,请刷新重试',{shade: true,time: 3})
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        gorz(){
            this.$router.push({name:"rzindex"})
        }
    }
};
</script>
<style src="../../assets/css/elcnt.css" scoped></style>
<style scoped>
.el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
}

/* 基本信息 */
.idinfor {
    background: #fff;
    width: 100%;
    box-sizing: border-box;
    padding: 23px 7%;
}
.idtop dl {
    overflow: hidden;
}
.idtop dd,
.idtop dt {
    float: left;
}
.idtop dt {
    width: 40%;
    text-align: right;
    margin-right: 10px;
}
.idtop dd {
    margin-top: 16px;
    width: 50%;
    text-align: left;
}
.idtop dt img {
    width: 77px;
    height: 77px;
    margin-right: 20px;
}
.idtop dd p {
    font-size: 16px;
    color: #333;
    text-align: left;
}
.namebot {
    font-size: 14px;
    margin-top: 6px;
}
.namebot span {
    color: #ff9900;
}
.namebot strong {
    color: #1890ff;
    cursor: pointer;
}
.namebot b {
    color: #e1e6eb;
    margin: 0 6px;
}
.idbot {
    padding-top: 25px;
}
.idbot dl {
    overflow: hidden;
    color: #424242;
    font-size: 16px;
    margin-bottom: 20px;
    height:25px;
    line-height: 25px;
}
.idbot dt,
.idbot dd {
    float: left;
}
.idbot dt {
    width: 40%;
    text-align: right;
    margin-right: 10px;
}
.idbot dd {
    width: 50%;
    text-align: left;
}
/* 企业信息 */
.enterinfo {
    background: #fff;
    padding: 28px 38px;
}
.enterinfo-title {
    color: #424242;
    font-size: 22px;
    text-align: left;
    padding-bottom: 37px;
    border-bottom: 1px solid #e1e6eb;
}
.enterinfo-cnt {
    padding-top: 24px;
}
.enterinfo-cnt li {
    padding: 35px 0;
    border-bottom: 1px solid #e1e6eb;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 16px;
    color: #999;
}
.enterinfo-cnt li div {
    flex: 2;
    text-align: left;
}
.enterinfo-cnt li div.two {
    flex: 3;
    color: #424242;
    font-size: 16px;
}
.enterinfo-cnt li div.three {
    flex: 1;
    text-align: right;
    cursor: pointer;
    color: #1890ff;
}
/* 认证信息 */
.autheninfo {
    background: #fff;
    padding: 28px 38px;
}
.el-collapse {
    border-top: none !important;
}

.boxtitle {
    font-size: 22px;
    color: #424242;
}
.authenlist li {
    padding: 20px 0;
    border-bottom: 1px solid #e1e6eb;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;
    color: #999;
}
.authenlist li div {
    flex: 2;
    text-align: left;
}
.authenlist li div.two {
    flex: 3;
    color: #424242;
    font-size: 16px;
}
.authenlist li div.gorz {
    flex: 1;
    text-align: right;
    cursor: pointer;
    color: #1890ff;
}
.userinfo li {
    padding: 12px 0;
}
.userinfo li .edit {
    text-align: right;
}
.userinfo .edit span {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 4px;
    background: #e6f0fa;
    color: #1890ff;
    cursor: pointer;
}
.userinfo .edit span:hover {
    background: #d9f0fa;
}
</style> 
<style>
.el-collapse-item__header {
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
}
.el-row {
    margin-bottom: 20px;
}
</style>
