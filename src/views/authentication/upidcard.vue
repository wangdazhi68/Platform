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
                    <strong>// 腾讯云人脸识别</strong>
                </div>
                <div class="choose">
                    <img src="../../assets/images/jticon.png" alt />
                    腾讯云人脸识别
                </div>
                <div class="attention">
                    <p>
                        <span class="zy">
                            <img src="../../assets/images/zyicon.png" alt />
                        </span>请务必提供真实信息，公司有权自行或委托第三方，审查提供的身份信息是否真实、有效。若提供虚假信息，由此带来的后果由提供方承担。
                    </p>
                </div>
                <div class="parpers_cnt">
                    <!-- <div class="cnt_form">
                        <div class="uploads">
                            <div class="upload_title">请如实提交以下信息：</div>
                            <div class="format">请上传清晰的身份证原件正、反面照片，系统将自动识别证件信息。图片仅限Jpeg、Jpg、Png格式。</div>
                            <div class="paptype">
                                {{selectoption[type-1].name}}
                                <b style="color:red">*</b>
                            </div>
                            <div class="uploadlist">
                                <ul>
                                    <li>
                                       <Upload message="人像面" sort="1" @uploadData="getChildData($event,0)" @delpic="delimg($event,0)"></Upload> 
                                    </li>
                                    <li>
                                       <Upload message="国徽面" sort="1" @uploadData="getChildData($event,0)" @delpic="delimg($event,0)"></Upload> 
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="recognition">
                            <div class="format">以下信息自动识别，需仔细核对，如识别有误，请修正。</div>
                            <div class="form_top">
                                <dl>
                                    <dt>
                                        证件姓名
                                        <b>*</b>
                                    </dt>
                                    <dd>
                                        <input type="text" placeholder="请输入身份证上的姓名" v-model="realName" />
                                        <span class="warn" v-show="nameerror">{{nameerror}}</span>
                                    </dd>
                                </dl>
                                <dl>
                                <dt>
                                    身份证号
                                    <b>*</b>
                                </dt>
                                <dd>
                                    <input type="text" placeholder="请输入证件号码" v-model="identityId" />
                                    <span class="warn" v-show="iderror">{{iderror}}</span>
                                </dd>
                                
                            </dl>
                            </div>
                        </div>


                        <div class="submit" >
                            <span @click="submit()">提交认证</span>
                        </div>
                    </div> -->
                    <div class="format">请打开使用微信扫一扫下方二维码，完成人脸识别</div>
                    <div class="qrcode">
                        <img :src="srccode" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Rzheader from "./header.vue";
import qs from 'qs';
var interval=null;
export default {
    components: {
        Rzheader
    },
    data() {
        return {
            customerId:'',
            srccode:''
        }
    },
    created(){
        let localdata=JSON.parse(localStorage.getItem('userinfo'))
        this.customerId=localdata.customerId 
        this.srccode=this.$baseURL+"personal/twoDimensionalCode?width=150&height=150&customerId="+this.customerId
    },
    mounted() {
        var that=this;
        interval = setInterval(function () {
            that.detail()
        }, 3000) 
        setTimeout(function(){
            clearInterval(interval)
            that.$router.back(-1);
        },1800000);
    },
    destroyed(){
        clearInterval(interval) 
    },
    computed:{	
       
	},
    methods: {    
        detail(){
            let that=this;
            this.$request({
                method:'get',
                headers:{
                    'content-type': "application/x-www-form-urlencoded;charset=UTF-8"
                },
                url:'/personal/getFaceResult',
                //data:qs.stringify({customerId:that.customerId})
            }).then((res) => {
                console.log(res);
                if(res.data.code==0){
                    if(res.data.data.appStatus==1){
                        clearInterval(interval)
                        that.$layer.msg('认证成功',{shade: true,time: 3})
                        setTimeout(function(){
                            that.$router.replace({name:"rzindex"});
                        },3000);    
                    }
                    else{
                        
                        return false
                    }
                }else{
                    clearInterval(interval)
                    that.$layer.msg('网络故障',{shade: true,time: 3})
                    setTimeout(function(){
                        that.$router.back(-1);
                    },3000);
                    
                }
            }).catch((err) => {
                clearInterval(interval)
                console.log(err);
            }) 
        }
    }
};
</script>
<style src="../../assets/css/authen.css" scoped>
</style>
<style scoped>
.qrcode{
    padding-top: 20px;
}
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
    margin-bottom: 50px;
}
.uploadlist li {
    width: 28%;
    box-sizing: border-box;
    border: 1px dashed #ccc;
    height: 212px;
    margin-right: 50px;
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
.recognition .format{
    text-align: left;
    margin:0px 0 20px;
}

</style>