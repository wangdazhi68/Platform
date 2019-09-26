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
    methods: {}
};
</script>
<style src="../../assets/css/elcnt.css" scoped></style>
<style scoped>

</style>
