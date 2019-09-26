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
                            <i class="el-icon-document"></i>
                            <span slot="title">协议管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <div class="nav-title">
                        <span>协议管理</span>
                    </div>
                    <div class="content">
                        <div class="filter">
                            <h4>按时间查询</h4>
                            <el-row>
                                <el-col :span="6">
                                    <el-date-picker
                                    v-model="datestart"
                                    type="date"
                                    @change="starttime"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </el-col>
                                <el-col :span="6">
                                    <el-date-picker
                                    v-model="dateend"
                                    type="date"
                                    @change="endtime"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </el-col>
                                <el-col :span="3">
                                    <el-button type="primary" plain @click="selectfifter()">查询</el-button>
                                </el-col>
                                <el-col :span="3">
                                    <el-button plain @click="reset()">重置</el-button>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="table-wrap">
                            <template>
                                <el-table
                                :data="tableData"
                                :header-cell-style="{background:'#F4F4F4'}"
                                style="width: 100%">
                                    <el-table-column
                                    prop="num"
                                    label="序号"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="pdfFileName"
                                    label="协议名称"
                                    width="">
                                    </el-table-column>
                                    <el-table-column
                                    prop="createTime"
                                    label="时间"
                                    width="">
                                    </el-table-column>
                                    <el-table-column
                                    label="操作"
                                    width="130">
                                    <template slot-scope="scope">
                                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                        <b class="sline">|</b>
                                        <el-button type="text" size="small" @click="download(scope.row)">下载</el-button>
                                    </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                            <div class="page">
                                <el-pagination
                                    background
                                    layout="prev, pager, next , jumper"
                                    :total="totalCount"
                                    :page-size="pageSize"
                                    @current-change="clickpage"
                                ></el-pagination>
                            </div>
                        </div>
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
            loginCode: "登录",
            datestart:'',
            dateend:'',
            tableData:[],
            pageSize: 10,
            currentPage: 1,
            totalCount: 10,
            requestdata:{
                page: 1,
                rows: 10
            },
        };
    },
    created(){
        this.creatrequest();
    },
    mounted() {},
    methods: {
        creatrequest() {
            let that = this;
            this.$request({
                method: "post",
                headers: {
                    "content-type": "application/json;charset=UTF-8"
                },
                data:that.requestdata,
                url: "/index/viewAll"
            })
            .then(res => {
                console.log(res);
                if (res.data.code == 0) {
                    that.tableData = res.data.data,
                    that.totalCount = res.data.totalCount;
                } else {
                    that.$message.error(res.data.msg);
                }
            })
            .catch(err => {
                that.$message.error("请求数据出错，请刷新重试");
                console.log(err);
            });
        },
        clickpage(e) {
            this.requestdata={
                page: e,
                rows: this.pageSize,
                startTime:this.datestart,
                endTime:this.dateend,
            }
            if(!this.datestart){
                delete this.requestdata.startTime;  
            }
            if(!this.dateend){
                delete this.requestdata.endTime;
            }
            this.creatrequest();
        },
        starttime(e){
            this.datestart=e
        },
        endtime(e){
            this.dateend=e
        },
        selectfifter(){
            this.requestdata={
                page: 1,
                rows: this.pageSize,
                startTime:this.datestart,
                endTime:this.dateend,
            }
            if(!this.datestart){
                delete this.requestdata.startTime;  
            }
            if(!this.dateend){
                delete this.requestdata.endTime;
            }
            this.creatrequest();
        },
        reset(){
            this.datestart=null;
            this.dateend=null
        },
        download(e){
            window.open(this.$baseURL+"/index/download?id="+e.id,'_blank');  
        }
    }
};
</script>
<style src="../../assets/css/elcnt.css" scoped></style>
<style scoped>
.filter {
    background: #fff;
    box-sizing: border-box;
    padding: 20px 30px 20px;
}
.filter h4{
    text-align: left;
    padding-bottom: 20px;
}
.filter .el-col{
    text-align: left
}
.title {
    height: 74px;
    line-height: 74px;
    text-align: left;
    border-bottom: 1px solid #e1e6eb;
    margin-bottom: 15px;
}
.table-wrap{
    background: #fff;
    box-sizing: border-box;
    padding: 20px 30px; 
    margin-top: 26px;
}
.page{
    margin-top:30px;
    text-align: right;
}
.sline{
    display: inline-block;
    margin:0 10px;
    color:#409EFF
}
</style>