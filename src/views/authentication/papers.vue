<template>
    <div class="wrap">
        <Rzheader></Rzheader>
        <div class="content">
            <div class="btns">
                <span class="goindex" @click='$router.replace({ name: "rzindex" })'>
                    <i></i>
                    返回首页
                </span>
                <span class="goback" @click="$router.back(-1)">返回上一级</span>
            </div>
            <div class="cnt">
                <div class="bread">
                    <span>实名认证</span>
                    <span>// 个人认证类型选择</span>
                    <strong>// 证件认证</strong>
                </div>
                <div class="choose">
                    <img src="../../assets/images/jticon.png" alt />
                    证件认证
                </div>
                <div class="attention">
                    <p>
                        <span class="zy">
                            <img src="../../assets/images/zyicon.png" alt />
                        </span>请务必提供真实信息，公司有权自行或委托第三方，审查提供的身份信息是否真实、有效。若提供虚假信息，由此带来的后果由提供方承担。
                    </p>
                </div>
                <div class="parpers_cnt">
                    <div class="cnt_form">
                        <div class="form_top">
                            <dl>
                                <dt>
                                    姓名
                                    <b>*</b>
                                </dt>
                                <dd>
                                    <input type="text" placeholder="请输入身份证上的姓名" v-model="realName" />
                                    <span class="warn" v-show="nameerror">{{nameerror}}</span>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    证件类型
                                    <b>*</b>
                                </dt>
                                <dd>
                                    <select name id v-model="type">
                                        <option
                                            v-for="(num,index) in selectoption"
                                            :value="num.value"
                                            :key="index"
                                            :selected="num.selected"
                                        >{{num.name}}</option>
                                    </select>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    证件号码
                                    <b>*</b>
                                </dt>
                                <dd>
                                    <input type="text" placeholder="请输入证件号码" v-model="identityId" />
                                    <span class="warn" v-show="iderror">{{iderror}}</span>
                                </dd>
                                
                            </dl>
                            <dl>
                                <dt>
                                    手机号码
                                    <b>*</b>
                                </dt>
                                <dd>
                                    <input type="text" placeholder="请输入您的手机号码" v-model="mobile" />
                                    <span class="warn" v-show="phoneerror">{{phoneerror}}</span>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    短信验证码
                                    <b>*</b>
                                </dt>
                                <dd>
                                    <input class="yzm" type="text" placeholder="请输入短信验证码" v-model="yzm" />
                                    <span class="dxbtn" :disabled='disabled' @click="getVerificationCode()">{{yzmtext}}</span>
                                    <span class="warn" v-show="yzmerror">{{yzmerror}}</span>
                                </dd>
                            </dl>
                        </div>
                        <div class="uploads">
                            <div class="upload_title">请上传实名认证附件</div>
                            <div class="format">图片格式要求jpg、jpeg、bmp、png、pdf，不超过10M；</div>
                            <div class="paptype">
                                {{selectoption[type-1].name}}
                                <b style="color:red">*</b>
                            </div>
                            <div class="uploadlist">
                                <ul>
                                    <li>
                                       <Upload message="正面" sort="1" @uploadData="getChildData($event,0)" @delpic="delimg($event,0)"></Upload>    
                                    </li>
                                    <li>
                                        <Upload message="背面" sort="2" @uploadData="getChildData($event,1)" @delpic="delimg($event,1)"></Upload>  
                                    </li>
                                    <li>
                                        <Upload message="本人手持证件照" sort="3" @uploadData="getChildData($event,2)" @delpic="delimg($event,2)"></Upload>  
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="submit" >
                            <span @click="submit()">提交认证</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="show">
            <div class="zhe"></div>
            <div class="mask">
                <div class="mask_top">
                    <dl>
                        <dt><img src="../../assets/images/checkicon.png" alt=""></dt>
                        <dd>
                            <h4>您的实名认证信息正在审核中</h4>
                            <p>请耐心等待审核结果（最长3个工作日内完成审核）。</p>
                        </dd>
                    </dl>
                </div>
                <div class="mask_bot">
                    <p>账号类型：<span>个人账号</span></p>
                    <p>证件类型：<span>{{identityType}}</span></p>
                    <p>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：<span>{{detail.realName}}</span></p>
                    <p>证件号码：<span>{{detail.identityId}}</span></p>
                    <p>提交时间：<span>{{detail.appTime}}</span></p>
                    
                </div>
                <div class="sure">
                    <span @click='$router.replace({ name: "rzindex" })'>确定</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Rzheader from "./header.vue";
import Upload from '@/components/upload.vue'
import {getSign} from '@/assets/js/sign';
import { hexMD5 } from '@/assets/js/md5';
var interval = null;
export default {
    components: {
        Rzheader,
        Upload
    },
    data() {
        return {
            selectoption: [
                { value: 1, name: "身份证", selected:"selected"},
                { value: 2, name: "军官证" },
                { value: 3, name: "士兵证" },
                { value: 4, name: "护照" },
                { value: 5, name: "港澳通行证" },
                { value: 6, name: "台胞证" }
            ],
            Selected:'',
            type: "1",
            formData: new FormData(),
            imgs:{},
            num:[],
            show:false,
            yzmtext:"获取短信验证码",
            disabled:false,
            currentTime: 61,
            realName:'',
            identityId:'',
            mobile:'',
            sucyzm:'',
            yzm:'',
            nameerror:null,
            phoneerror:null,
            yzmerror:null,
            iderror:null,
            detail:{}
        };
    },
    created(){
        this.Selected = this.selectoption[0].value;
    },
    mounted() {
        
    },
    computed:{
		identityType:function(){
            switch(this.detail.identityType)
            {
                case '1':
                    this.detail.identityType='身份证'
                    break;
                case '2':
                    this.detail.identityType='军官证'
                    break;
                case '3':
                    this.detail.identityType='士兵证'
                    break;
                case '4':
                    this.detail.identityType='护照'
                    break;
                case '5':
                    this.detail.identityType='港澳通行证'
                    break;
                case '6':
                    this.detail.identityType='台胞证'
                    break;
            }
            return this.detail.identityType
        }
	},
    methods: {
        getVerificationCode(){
            var phone = this.mobile;
            if(!(/^1[3456789]\d{9}$/.test(phone))){ 
                this.phoneerror='请输入正确的手机号码'
                return false
            } else{
                this.phoneerror=null;
            }
            this.getCode();
            var that = this
            that.disabled=true;
            var date = new Date();
            var timestamp = date.getTime();
            var res = {
                "timestamp": timestamp,
                "loginName":this.mobile,
                "loginType":"1",
            }
            var signature=getSign(res);
            var json=JSON.stringify({
                    "loginName":this.mobile,
                    "loginType":"1",
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
                    //alert('请求验证码失败')
                    that.$layer.msg(请求验证码失败,{shade: true,time: 3})
                    return false
                }
                //this.sucyzm=res.data.data.code;
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
        getChildData(data,num){
            if(data=={}){
                this.imgs = data;
            }else{
                for(var key in data){
                    this.imgs[key] = data[key];
                }
            }
            this.num[num]=true
            //console.log(this.imgs)
        },
        delimg(data,num){
            if(data){
                //console.log(data);
                var arr = Object.keys(this.imgs);
                if(arr.length>1){
                    for(var key in data){
                        console.log(this.imgs[key]);
                        delete this.imgs[key];
                    }
                }else{
                    this.imgs={};
                }
                //console.log(this.imgs)
            }
            this.num[num]='';
            //console.log(this.num);
        },
        submit() {
            this.formData = new FormData();
            if(!(/^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/).test(this.realName)){
                this.nameerror='请输入正确格式的姓名'
                document.body.scrollTop= 100;
	    	    document.documentElement.scrollTop = 100;
                return false
            }else{
                this.nameerror=null;
            }
            if (this.identityId.replace(/(^s*)|(s*$)/g, "").length ==0) {
                this.iderror='请输入证件号码'
                document.body.scrollTop= 100;
	    	    document.documentElement.scrollTop = 100;
                return false
            }else{
                this.iderror=null;
            }



            if(this.yzm.trim().length>0){
                this.yzmerror=null;    
            }else{
                this.yzmerror='请输入验证码'
                document.body.scrollTop= 200;
	    	    document.documentElement.scrollTop = 200; 
                return false
            }


            if(!this.num[0]){
                alert('请上传证件照正面照片')
                return false
            }
            if(!this.num[1]){
                alert('请上传证件照背面照片')
                return false
            }
            if(!this.num[2]){
                alert('请上传手持证件照正面照片')
                return false
            }
            this.formData.append('realName', this.realName);
            this.formData.append('identityId', this.identityId);
            this.formData.append('mobile', this.mobile);
            this.formData.append('identityType', this.type);
            this.formData.append('verifyCode', this.yzm);
            this.formData.append('fileName', this.imgs[1]);
            this.formData.append('fileName', this.imgs[2]);
            this.formData.append('fileName', this.imgs[3]);
            let loading=this.$layer.loading({shade:true});
            let that=this;
            this.$request({
                method:'post',
                data:this.formData,
                headers:{
                    'Content-Type': 'multipart/form-data'
                    //'content-type': "application/json;charset=UTF-8"
                },
                url:'/personal/idCardAuth',
            }).then((res) => {
                console.log(res);
                if(res.data.code==0){
                    that.subdetail(loading);
                }else{
                    that.$layer.msg(res.data.msg,{shade: true,time: 3})
                    that.$layer.close(loading);
                }
            }).catch((err) => {
                console.log(err);
                that.$layer.close(loading);
            })
        },
        subdetail(loading){
            let that=this;
            this.$request({
                method:'get',
                headers:{
                    //'Content-Type': 'multipart/form-data'
                    'content-type': "application/json;charset=UTF-8"
                },
                url:'/customer/detail',
            }).then((res) => {
                console.log(res);
                if(res.data.code==0){
                    that.$layer.close(loading);
                    that.show=true;
                    that.detail=res.data.data;
                }else{
                    that.$layer.msg('网络故障，请重新提交',{shade: true,time: 3})
                }
            }).catch((err) => {
                console.log(err);
            })
        }

    }
};
</script>
<style src="../../assets/css/authen.css" scoped>
</style>
<style scoped>
.parpers_cnt {
    width: 100%;
    background: #fff;
    padding: 59px 31px;
    margin-top: 24px;
    box-sizing: border-box;
}
.form_top {
    border-bottom: 1px dashed #e1e6eb;
    padding-bottom: 16px;
    font-size: 14px;
}
.cnt_form dl {
    overflow: hidden;
    line-height: 42px;
}
.cnt_form dt {
    float: left;
    width: 10%;
}
.cnt_form dt b {
    color: red;
}
.cnt_form dd {
    float: left;
    width: 90%;
    text-align: left;
}
.cnt_form input {
    width: 420px;
    height: 42px;
    line-height: 42px;
    border-radius: 6px;
    border: 1px solid #e1e6eb;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 28px;
}
.cnt_form select {
    width: 420px;
    height: 42px;
    line-height: 42px;
    border-radius: 6px;
    border: 1px solid #e1e6eb;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 28px;
}
.warn {
    color: red;
    font-size: 12px;
    margin-left: 10px;
}
.uploads {
    padding-top: 30px;
    text-align: left;
}
.upload_title {
    color: #666666;
    font-size: 16px;
    margin-bottom: 19px;
}
.format {
    color: #999;
    font-size: 14px;
}
.paptype {
    padding-top: 22px;
    font-size: 14px;
    color: #333;
}
.uploadlist {
    padding-top: 15px;
}
.uploadlist ul {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    justify-content: space-between;
}
.uploadlist li {
    width: 28%;
    box-sizing: border-box;
    border: 1px dashed #ccc;
    height: 212px;
}
.submit{
    margin-top:32px;
    text-align: left;
}
.submit span{
    display: inline-block;
    text-align: center;
    width:95px;
    height: 32px;
    line-height: 32px;
    color:#3080FE;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    border: 1px solid #3080FE;
}
.submit span:hover{
   background: #3080FE;
   color:#fff;
}
.zhe{
    position:fixed;
    width: 100%;
    height:100%;
    top:0;
    left: 0;
    background:rgba(0,0,0,.6);
    z-index:9999;
}
.mask{
    width:590px;
    height:470px;
    background:#fff;
    border-radius: 8px;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom:0;
    margin: auto;
    z-index: 10000;
    padding:38px 40px;
    box-sizing: border-box;
}
.mask_top{
    padding-top:12px; 
}
.mask_top dl{
    overflow: hidden;
    border:1px solid rgba(255,218,194,1);
    border-radius:4px;
    background:rgba(255,243,235,1);
    padding: 25px 0;
    font-size: 14px;
    text-align: left;
}
.mask_top dt{
    float:left;
    padding-left: 55px;
}
.mask_top dd{
    float:left;
    margin-left: 26px;
}
.mask_top dd h4{
    color:#333;
    font-size: 18px;
    margin-bottom: 10px;
}
.mask_top dd p{
    color:#999;
    font-size: 14px;
}
.mask_bot{
    padding-left: 55px;
    padding-top: 20px;
    text-align: left;
    font-size: 14px;
    color:#666
}
.mask_bot p{
    margin-bottom: 20px;
}
.mask_bot p span{
    color:#333;
}
.sure{
    margin-top:45px;
    text-align: center;  
}
.sure span{
    display: inline-block;
    width:95px;
    height:32px;
    border:1px solid #1890FF;
    color:#1890FF;
    line-height: 32px;
    text-align: center;
    border-radius:4px;
    cursor: pointer;
    user-select: none;
}
.sure span:hover{
    background:rgba(24,144,255,1);
    color:#fff;
}
.cnt_form .yzm{
    width:240px;
}
.dxbtn{
    cursor: pointer;
    border-radius: 4px;
    vertical-align: middle;
    margin-left: 30px;
    display: inline-block;
    height:38px;
    width: 150px;
    line-height: 40px;
    text-align: center;
    color:#1890FF;
    border:1px solid #E1E6EB;
    font-size: 14px;
}
.dxbtn:hover{
    color:#fff;
    background:#1890FF;
}
.dxbtn[disabled]{
    color:#C8C8C8;
    background:#E1E6EB;
    pointer-events: none;
}
</style>