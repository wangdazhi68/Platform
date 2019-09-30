<template>
    <div class="wrap">
        <el-container>
            <el-header height="80px">
                <userheader active="2"></userheader>
            </el-header>
            <el-container>
                <el-aside width="250px">
                    <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        text-color="#A3B1BF"
                        active-text-color="#3080FE"
                        active-background="#000"
                    >
                        <el-menu-item index="1">
                            <i class="el-icon-office-building"></i>
                            <span slot="title">联合信任服务</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <div class="nav-title">
                        <span>您的账号可以登录以下账户</span>
                    </div>
                    <div class="content">
                        <ul>
                            <li>
                                <div>
                                    <img src="../../assets/images/user/service_icon1.png" alt="">
                                </div>
                                <div class="center">
                                    <h4>联合信任知识产权保护平台</h4> 
                                    <p>用于版权证明、商业秘密保护、专利在先性证明、商标使用证明等</p>
                                </div>
                                <div class="btn">
                                    <span class="gosys">进入系统</span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <img src="../../assets/images/user/service_icon2.png" alt="">
                                </div>
                                <div class="center">
                                    <h4>联合信任网页取证平台</h4> 
                                    <p>用于网站内容侵权取证、微信、微博及博客负面谣言取证、电子邮件内容取证、知识产权（图片、专利、文章等）侵权取证等</p>
                                </div>
                                <div class="btn">
                                    <span class="gosys">进入系统</span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <img src="../../assets/images/user/service_icon3.png" alt="">
                                </div>
                                <div class="center">
                                    <h4>壹签电子签名平台</h4> 
                                    <p>用于互联网金融业、银行业、旅游行业、O2O行业等，提供电子签名解决方案实现传统纸质合同签署的电子化</p>
                                </div>
                                <div class="btn">
                                    <span class="gosys">进入系统</span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <img src="../../assets/images/user/service_icon4.png" alt="">
                                </div>
                                <div class="center">
                                    <h4>权利卫士</h4> 
                                    <p>通过手机APP进行现场取证，根据不同的场景可通过不同方式进行取证，取证方式分为拍照取证、录像取证和录音取证</p>
                                </div>
                                <div class="btn">
                                    <span class="android" @click="goapp()">
                                        <i><img src="../../assets/images/user/android_icon.png" alt=""></i>
                                        Android
                                    </span>
                                    <span class="apple" @click="goapp()">
                                        <i><img src="../../assets/images/user/apple_icon.png" alt=""></i>
                                        ios
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import userheader from "./header.vue";
export default {
    components: {
        userheader
    },
    data() {
        return {
            loginCode: "登录"
        };
    },
    mounted() {},
    methods: {
        goapp(){
            window.open("https://www.tsa.cn/ydqz/index.jhtml",'_blank'); 
        }
    }
};
</script>
<style src="../../assets/css/elcnt.css" scoped></style>
<style scoped>
.content{
    box-sizing: border-box;
    padding-bottom: 30px;
    min-height: 780px;
}
.content li{
    background:#fff;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row;
    padding:34px 30px; 
    align-items:center;
    margin-bottom: 20px;
}
.center{
    flex: 1;
    text-align: left;
    padding: 0 28px;
}
.center h4{
    margin-bottom: 27px;
    font-size: 18px;
    color:#333
}
.center p{
    font-size: 16px;
    color:#999;
}
.gosys{
    display: inline-block;
    width: 143px;
    height: 48px;
    text-align: center;
    line-height: 48px;
    color:#3080FE;
    border-radius: 10px;
    border:1px solid #E1E6EB;
    cursor: pointer;
}
.gosys:hover{
    color:#fff;
    background:#3080FE;
}
.android,.apple{
    display:block;
    border-radius: 10px;
    width:173px;
    height:48px;
    line-height: 48px;
    color:#fff;
    font-size: 21px;
    cursor: pointer;
}
.android{
   background:#94BD4D;
   margin-bottom: 15px;
}
.btn span img{
    vertical-align: -4px;
}
.apple{
    background:#000000;
}
</style>
<style lang="stylus">
.el-menu{
    border-right :none;
}
</style>
