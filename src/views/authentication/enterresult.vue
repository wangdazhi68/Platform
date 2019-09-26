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
                    <span class="line cur"></span>
                    <div class="pro_box active">
                        <b class="circle"></b>
                        <strong>提交资料并完成汇款</strong>
                    </div>
                    <span class="line cur"></span>
                    <span class="line cur"></span>
                    <div class="pro_box active">
                        <b class="circle"></b>
                        <strong>审核结果</strong>
                    </div>
                </div>

                <div class="parpers_cnt">
                    <div class="info_top" v-if="approveStatus=='0'">
                        <p class="ico-wrap"><img src="../../assets/images/checkicon.png" alt=""></p>
                        <p class="bold">您的实名认证正在审核中</p>
                        <p class="thin">请耐心等待审核结果（审核时间以银行到账时间为准，一般1~3个工作日）</p>
                    </div>
                    <div class="info_top" v-if="approveStatus=='1'">
                        <p class="ico-wrap"><img src="../../assets/images/checksuccess.png" alt=""></p>
                        <p class="bold">审核成功</p>
                        <p class="thin">您的银行对公账户实名认证成功</p>
                    </div>
                    <div class="info_top" v-if="approveStatus=='2'">
                        <p class="ico-wrap"><img src="../../assets/images/checkerror.png" alt=""></p>
                        <p class="bold">抱歉，您的实名认证审核失败</p>
                        <p class="thin">请重新提交资料后联系客服等待审核结果</p>
                        <div class="submit" >
                            <span @click="gosub()">重新提交</span>
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
var interval = null;
export default {
    components: {
        Rzheader,
        Upload
    },
    data() {
        return {
            approveStatus:'2',
        };
    },
    created() {
        console.log(this.$route.params.approveStatus)
        this.approveStatus=this.$route.params.approveStatus        
    },
    methods: {
        gosub(){
            let that=this;
            this.$request({
                method:'post',
                headers:{
                    //'Content-Type': 'multipart/form-data'
                    'content-type': "application/json;charset=UTF-8"
                },
                url:'/cancelAuth',
            }).then((res) => {
                console.log(res);
                if(res.data.code==0){
                    that.$router.replace({name:"enterbank"})
                }else{
                    that.$layer.msg('网络故障，请刷新重试',{shade: true,time: 3})
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

.submit{
    margin-top:32px;
    text-align: center;
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
    width:95px;
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
.ico-wrap{
    margin-bottom: 20px;
}
.bold{
   color:#333;
   font-size: 18px;
   font-weight: 400; 
   margin-bottom: 15px;
}
.thin{
    font-size: 14px;
    color:#999;
}
.table{
    width: 100%;
    margin-top:29px;
    box-sizing: border-box;
    padding: 10px 20%;
    background:#FAFAFA;
    border:1px solid #E1E6EB;
}
.table dl{
    overflow: hidden;
    border-bottom: 1px dashed #E1E6EB;
    padding: 20px 0 20px;
    font-size: 14px;
    color:#333;
}
.table dl:last-child{
    border:none;
}
.table dt{
    float:left
}
.table dd{
    float:right
}
</style>