<template>
    <div class="wrap">
        <Rzheader></Rzheader>
        <div class="content">
            <div class="btns">
                <span class="goindex" @click='$router.replace({ name: "rzindex" })'>
                    <i></i>
                    返回首页
                </span>
            </div>
            <div class="cnt">
                <div class="bread">
                    <span>实名认证</span> <strong> // 个人认证类型选择</strong>
                </div>
                <div class="choose">
                    <img src="../../assets/images/jticon.png" alt="">
                    个人认证类型选择
                </div>
                <div class="attention">
                    <p><span class="zy"><img src="../../assets/images/zyicon.png" alt=""></span>个人银行卡信息仅用于进行实名认证，不会绑定您的银行卡产生任何隐形消费，也不会泄露您的银行卡信息。</p>
                </div>
                <ul class="card">
                    <li @click="nav(1)">
                        <div class="icon">
                            <img src="../../assets/images/bank.png" alt="">
                        </div>
                        <div class="introduce">
                            <h4><b>银行卡认证</b>（即时完成认证）</h4>
                            <p>1.请提前准备好您的银行卡资料.</p>
                            <p>2.确保办理该银行卡所预留的手机号，可以接收短信验证码。</p>
                            <a>了解更多</a>
                        </div>
                        <p style="clear:both"></p>
                    </li>
                    <li @click="nav(2)">
                        <div class="icon">
                            <img src="../../assets/images/face.png" alt="">
                        </div>
                        <div class="introduce">
                            <h4><b>人脸识别</b>（即时完成认证）</h4>
                            <p> 1.请确保手机内安装微信客户端 </p>
                            <p>2.请确保开通微信账号 了解更多</p>
                            <a>了解更多</a>
                        </div>
                        <p style="clear:both"></p>
                    </li>
                    <li @click="nav(3)">
                        <div class="icon">
                            <img src="../../assets/images/phone.png" alt="">
                        </div>
                        <div class="introduce"> 
                            <h4><b>手机号认证</b>（即时完成认证）</h4>
                            <p>1.请确保手机号为本人在运营商处实名购买.</p>
                            <p>2.请确保手机号可以接收短信验证码 了解更多</p>
                            <a>了解更多</a>
                        </div>
                        <p style="clear:both"></p>
                    </li>
                    <li @click="nav(4)">
                        <div class="icon">
                            <img src="../../assets/images/idcard.png" alt="">
                        </div>
                        <div class="introduce">
                            <h4><b>证件认证</b>
                            （1-3个工作日）</h4>
                            <p>1.请提前准备好您的个人证件（身份证/护照/港澳居民来往内地通行证/中国以外驾照等）.</p>
                            <p>2.上传证件照片；</p>
                            <p>3.等待审核。</p>
                            <a>了解更多</a>
                        </div>
                        <p style="clear:both"></p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Rzheader from './header.vue'
export default {
    components: {
        Rzheader
    },
    data(){
    	return{
            appStatus:null,
    	}
    },
    created(){
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
                    that.appStatus=res.data.data.appStatus;
                    that.$store.commit('setstatus',res.data.data.appStatus);
                }else{
                    that.$layer.msg('网络故障',{shade: true,time: 3})
                    setTimeout(function(){
                        that.$router.back(-1);
                    },3000);
                    
                }
            }).catch((err) => {
                console.log(err);
            })
    },
    mounted() {
	    
	},
    methods:{
        nav(num){
            let that=this;
            if(that.appStatus=='1' || that.appStatus=='2'){
                that.$layer.msg('您已提交认证，请耐心等待审核',{shade: true,time: 3})
            }else{
                switch(num)
                {
                    case 1:
                        that.$router.push({name:"bank"})
                        break;
                    case 2:
                        that.$router.push({name:"upidcard"})
                        break;
                    case 3:
                        that.$router.push({name:"phone"})
                        break;
                    case 4:
                        that.$router.push({name:"papers"})
                        break;
                }
            }
        }
    },
    
}
</script>
<style src="../../assets/css/authen.css" scoped>
</style>
<style scoped>
.card{
    padding-bottom: 90px;
}
.card li{
    cursor: pointer;
    padding:34px 30px;
    background:#fff;
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    margin-top: 24px;
}
.card li div{
    float: left;
}
.icon{
    margin-top:12px;
}
.introduce{
    margin-left: 33px;
}
.introduce h4{
    color:#666;
    font-size: 16px;
    margin-bottom: 10px;
}
.introduce h4 b{
    color:#333;
}
.introduce p{
    font-size: 14px;
    color:#999;
    line-height: 24px
}
.introduce a{
    color:#3080FE;
    cursor: pointer;
    font-size: 14px;
}
</style>