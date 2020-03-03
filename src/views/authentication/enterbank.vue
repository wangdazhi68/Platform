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
                    <span>// 企业认证类型选择</span>
                    <strong>// 对公账户认证</strong>
                </div>
                <div class="choose">
                    <img src="../../assets/images/jticon.png" alt />
                    企业认证
                </div>
                <div class="attention">
                    <p>
                        <span class="zy">
                            <img src="../../assets/images/zyicon.png" alt />
                        </span>请务必提供真实信息，公司有权自行或委托第三方，审查提供的身份信息是否真实、有效。若提供虚假信息，由此带来的后果由提供方承担。
                    </p>
                </div>
                <div class="progress">
                    <div class="pro_box active">
                        <b class="circle"></b>
                        <strong>填写信息</strong>
                    </div>
                    <span class="line cur"></span>
                    <span class="line"></span>
                    <div class="pro_box">
                        <b class="circle"></b>
                        <strong>提交资料并完成汇款</strong>
                    </div>
                    <span class="line"></span>
                    <span class="line"></span>
                    <div class="pro_box">
                        <b class="circle"></b>
                        <strong>审核结果</strong>
                    </div>
                </div>

                <div class="parpers_cnt">
                    <div class="cnt_form">
                        <div class="form_top">
                            <h4>请填写您的单位信息</h4>
                            <dl>
                                <dt>
                                    企业名称
                                    <b>*</b>
                                </dt>
                                <dd>
                                    <input type="text" placeholder="请输入单位证件登记的名称" v-model="entName"/>
                                    <span class="warn" v-show="nameerror">{{nameerror}}</span>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    单位证件号
                                    <b>*</b>
                                </dt>
                                <dd>
                                   <input type="text" placeholder="请输入统一社会信用代码或组织机构代码" v-model="uscc" />
                                   <span class="warn" v-show="usccerror">{{usccerror}}</span>
                                </dd>
                            </dl>
                            
                        </div>
                        <div class="form_top">
                            <h4>请填写您的银行对公账户信息</h4>
                            <dl>
                                <dt>
                                    银行开户名
                                    
                                </dt>
                                <dd>
                                    <input type="text" placeholder="银行开户名和单位名称保持一致" v-model="entName" disabled />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    开户银行
                                    <b>*</b>
                                </dt>
                                <dd>
                                   <input type="text" placeholder="请输入企业账户开户银行" v-model="bankName" />
                                   <span class="warn" v-show="banknameerror">{{banknameerror}}</span>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    银行账号
                                    <b>*</b>
                                </dt>
                                <dd>
                                   <input type="text" placeholder="请输入企业账户开户银行账号" v-model="bankNo"/>
                                   <span class="warn" v-show="banknoerror">{{banknoerror}}</span>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    开户支行
                                    <b>*</b>
                                </dt>
                                <dd>
                                   <input type="text" placeholder="请输入企业账户开户银行账号" v-model="branch"/>
                                   <span class="warn" v-show="brancherror">{{brancherror}}</span>
                                </dd>
                            </dl>
                        </div>
                        <div class="form_top">
                            <h4>请申请人填写联系方式</h4>
                            <dl>
                                <dt>
                                    手机号码
                                    <b>*</b>
                                </dt>
                                <dd>
                                    <input type="text" placeholder="请输入您的手机号码" v-model="agentMobile" />
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
                                请上传企业营业执照
                                <b style="color:red">*</b>
                            </div>
                            <div class="uploadlist">
                                <Upload message="企业营业执照" sort="1" @uploadData="getChildData($event)" @delpic="delimg($event)"></Upload>    
                            </div>
                        </div>
                        <div class="submit" >
                            <span @click="submit()">提交认证</span>
                            <!-- <b>取消</b> -->
                        </div>
                    </div>
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
            formData: new FormData(),
            imgs:{},
            entName:'',
            uscc:'',
            bankName:'',
            bankNo:'',
            branch:'',
            agentMobile:'',
            yzm:'',
            sucyzm:'',
            yzmtext:"获取短信验证码",
            disabled:false,
            currentTime: 61,
            nameerror:null,
            phoneerror:null,
            yzmerror:null,
            banknameerror:null,
            banknoerror:null,
            brancherror:null,
            usccerror:null,
        };
    },
    mounted() {
        //console.log(JSON.stringify(this.imgs))
    },
    methods: {
        getVerificationCode(){
            var phone = this.agentMobile;
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
                "loginName":this.agentMobile,
                "loginType":"1",
            }
            var signature=getSign(res);
            var json=JSON.stringify({
                    "loginName":this.agentMobile,
                    "loginType":"1",
                    "signature":signature.toUpperCase(),
                    "timestamp":timestamp.toString()
                });
            this.$request({
                method:'post',
                data:json,
                url:'/register/sendValidateCode',
            }).then((res) => {
                console.log(res);
                if(res.data.code==-1){
                    that.$layer.msg(res.data.msg,{shade: true,time: 3})
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
        getChildData(data){
            if(data=={}){
                this.imgs = data;
            }else{
                for(var key in data){
                    this.imgs[key] = data[key];
                }
            }
            console.log(this.imgs)
        },
        delimg(data){
            if(data){
                console.log(data);
                var arr = Object.keys(this.imgs);
                if(arr.length>1){
                    for(var key in data){
                        console.log(this.imgs[key]);
                        delete this.imgs[key];
                    }
                }else{
                    this.imgs={};
                }
                console.log(this.imgs)
            }
        },
        submit() {
            if(this.entName.match(/^\s*$/)){
                this.nameerror='请填写企业名称'
                document.body.scrollTop= 200;
	    	    document.documentElement.scrollTop = 200;
                return false;
            }else{
                this.nameerror=null
            }
            if(this.uscc.match(/^\s*$/)){
                this.usccerror='请填写企业证件号'
                document.body.scrollTop= 200;
	    	    document.documentElement.scrollTop = 200;
                return false;
            }else{
                this.usccerror=null
            }
            if(this.bankName.match(/^\s*$/)){
                this.banknameerror='请填写开户银行'
                document.body.scrollTop= 600;
	    	    document.documentElement.scrollTop = 600;
                return false;
            }else{
                this.banknameerror=null
            }
            

            if(!this.luhnCheck(this.bankNo) || this.bankNo.match(/^\s*$/)){
                this.banknoerror='银行卡号格式有误'
                document.body.scrollTop= 650;
	    	    document.documentElement.scrollTop = 650;
                return false;
            }else{
                this.banknoerror=null
            }
            if(this.branch.match(/^\s*$/)){
                this.brancherror='请填写开户支行'
                return false;
            }else{
                this.brancherror=null
            }

            // if(this.yzm==this.sucyzm && this.yzm.length>0){
            //     this.yzmerror=null;    
            // }else{
            //     this.yzmerror='验证码错误'
            //     document.body.scrollTop= 800;
	    	//     document.documentElement.scrollTop = 800; 
            //     return false
            // }

            if(JSON.stringify(this.imgs)=='{}'){
                alert('请上传企业营业执照照片')
                return false
            }
            this.formData.append('entName', this.entName);
            this.formData.append('uscc', this.uscc);
            this.formData.append('bankName', this.bankName);
            this.formData.append('bankNo', this.bankNo);
            this.formData.append('branch', this.branch);
            this.formData.append('agentMobile', this.agentMobile);

            this.formData.append('fileName', this.imgs[1]);

            let loading=this.$layer.loading({shade:true});
            let that=this;
            this.$request({
                method:'post',
                data:this.formData,
                headers:{
                    'Content-Type': 'multipart/form-data'
                },
                url:'/entAuth',
            }).then((res) => {
                console.log(res);
                that.$layer.close(loading);
                if(res.data.code==0){
                    that.$router.push({name:"entercheck"})
                }else{
                    that.$layer.msg('网络故障，请重新提交',{shade: true,time: 3})
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        // 银行卡验证
        luhnCheck(bankno) {
            var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhn进行比较）
            var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
            var newArr = new Array();
            for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
                newArr.push(first15Num.substr(i, 1));
            }
            var arrJiShu = new Array(); //奇数位*2的积 <9
            var arrJiShu2 = new Array(); //奇数位*2的积 >9
            var arrOuShu = new Array(); //偶数位数组
            for (var j = 0; j < newArr.length; j++) {
                if ((j + 1) % 2 == 1) { //奇数位
                    if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
                    else arrJiShu2.push(parseInt(newArr[j]) * 2);
                } else //偶数位
                arrOuShu.push(newArr[j]);
            }

            var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
            var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
            for (var h = 0; h < arrJiShu2.length; h++) {
                jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
                jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
            }

            var sumJiShu = 0; //奇数位*2 < 9 的数组之和
            var sumOuShu = 0; //偶数位数组之和
            var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
            var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
            var sumTotal = 0;
            for (var m = 0; m < arrJiShu.length; m++) {
                sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
            }

            for (var n = 0; n < arrOuShu.length; n++) {
                sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
            }

            for (var p = 0; p < jishu_child1.length; p++) {
                sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
                sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
            }
            //计算总和
            sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

            //计算luhn值
            var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
            var luhn = 10 - k;

            if (lastNum == luhn) {
                this.bankerror=null
                return true;
            } else {
                this.bankerror='银行卡号格式有误'
                return false;
            }
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
    text-align: left;
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
    padding-top: 10px;
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
    width:320px;
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
.submit b{
    margin-left: 30px;
    display: inline-block;
    text-align: center;
    width:67px;
    height: 32px;
    line-height: 32px;
    color:#999;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    border: 1px solid #ccc;
}
.submit b:hover{
    color:#333;
    background:#f5f5f5
}
.submit span:hover{
   background: #3080FE;
   color:#fff;
}
.progress{
    width:100%;
    background: #fff;
    margin-top: 24px;
    height:101px;
    padding-top: 30px;
    box-sizing: border-box;
}
.progress .pro_box{
    display: inline-block;
    vertical-align: middle;
}
.pro_box{
    position: relative;
    text-align: center;
}
.progress .line{
    display: inline-block;
    width:160px;
    height: 1px;
    background:#E1E6EB;
    vertical-align:middle;
    margin:0 3px;
}
.progress b{
    display: inline-block;
    width:10px;
    height: 10px;
    border-radius: 5px;
    background:#E1E6EB;
    margin:0 10px;
}
.pro_box strong{
    position: absolute;
    width:200px;
    text-align: center;
    top:20px;
    left:-85px;
    font-size: 14px;
    white-space: nowrap;
    color:#666;
}
.active .circle{
    background:#1890FF;
}
.active strong{
    color:#1890FF;
}
.progress .cur{
    background:#1890FF;
}
.form_top h4{
    color:#666;
    font-size: 16px;
    text-align: left;
    margin-bottom: 34px;
}
.form_top{
    border-bottom: 1px dashed #E1E6EB;
    margin-bottom:30px; 
}
</style>