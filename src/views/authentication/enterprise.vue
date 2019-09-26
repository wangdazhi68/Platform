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
                    <span>实名认证</span> <strong> // 企业认证类型选择</strong>
                </div>
                <div class="choose">
                    <img src="../../assets/images/jticon.png" alt="">
                    企业认证
                </div>
                <div class="attention">
                    <p><span class="zy"><img src="../../assets/images/zyicon.png" alt=""></span>请务必提供真实信息，公司有权自行或委托第三方，审查提供的身份信息是否真实、有效。若提供虚假信息，由此带来的后果由提供方承担。</p>
                </div>
                <ul class="card">
                    <li @click="nav()">
                        <div class="icon">
                            <img src="../../assets/images/bank.png" alt="">
                        </div>
                        <div class="introduce">
                            <h4><b>银行对公账户认证</b>（最快30分钟）</h4>
                            <p>1.请准备好企业的银行对公账户；</p>
                            <p>2.确保该账户可用，并可向联合信任账户进行转账；</p>
                            <!-- <a>了解更多</a> -->
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
            payStatus:null,
            approveStatus:null,
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
                    that.payStatus=res.data.data.payStatus;
                    that.approveStatus=res.data.data.approveStatus;
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
        nav(){
            let that=this;
            if(that.appStatus=='1' || that.appStatus=='2'){
                if(that.payStatus=='1'){
                    that.$router.push({
                        name:"enterresult",
                        params:{
                            approveStatus:that.approveStatus
                        }
                    })
                }else{
                    that.$router.push({name:"entercheck"})
                }
            }else{
                that.$router.push({name:"enterbank"})
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
    padding:34px 30px;
    background:#fff;
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    margin-top: 24px;
    cursor: pointer;
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