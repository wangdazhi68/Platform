<template>
    <div class="wrap">
        <el-container>
            <el-header height="80px">
                <userheader active="4"></userheader>
            </el-header>
            <el-container>
                <el-aside width="250px">
                    <el-menu
                        :default-active="$router.currentRoute.path"
                        class="el-menu-vertical-demo"
                        text-color="#A3B1BF"
                        active-text-color="#3080FE"
                        active-background="#000"
                        router
                    >
                        <el-menu-item index="/user/help/timestamp">
                            <span slot="title">联合信任知识产权平台</span>
                        </el-menu-item>
                        <el-menu-item index="/user/help/forensics">
                            <span slot="title">联合信任网页取证平台</span>
                        </el-menu-item>
                        <el-menu-item index="/user/help/onesign">
                            <span slot="title">壹签电子签名平台</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <span slot="title">权利卫士</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <div class="nav-title">
                        <span>帮助中心</span>
                    </div>
                    <div class="content">
                        <router-view></router-view>
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
