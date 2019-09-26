<template>
    <div class="wrap">
        <Rzheader></Rzheader>
        <div class="content">
            <div class="title">
                <img src="../../assets/images/sm-title.png" alt="">
            </div>
            <div class="attention">
                <p><span class="zy"><img src="../../assets/images/zyicon.png" alt=""></span>一个账号只能认证一种类型，认证成功后不可修改。请谨慎选择。</p>
            </div>
            <div class="cnt">
                <div class="choose">
                    <img src="../../assets/images/jticon.png" alt="">
                    请选择一种账号类型
                </div>
                <div class="choose_cnt">
                    <div class="kuang">
                        <dl @click="gopersonal()">
                            <dt><img src="../../assets/images/gerenico.png" alt=""></dt>
                            <dd>
                                <h3>个人账号</h3>
                                <p>
                                    个人账号如何认证？
                                </p>
                            </dd>
                        </dl>
                    </div>
                    <div class="kuang">
                        <dl @click="goenterprise()">
                            <dt><img src="../../assets/images/qiyeico.png" alt=""></dt>
                            <dd>
                                <h3>企业账号</h3>
                                <p style="margin-top:3px;">
                                    使用群体：企业、党政及国家机关、事业单位、民办非 企业单位、社会团体、个体工商户等。
                                </p>
                            </dd>
                        </dl>
                    </div>
                </div>
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
            
    	}
    },
    mounted() {
	    
	},
    methods:{
        gopersonal(){
            let that=this;
            this.$request({
                method:'get',
                headers:{
                    'content-type': "application/json;charset=UTF-8"
                },
                url:'/customer/detail',
            }).then((res) => {
                console.log(res);
                if(res.data.code==0){
                    if(res.data.data.approveStatus=="1"){
                        that.$layer.msg('您已认证，不能重复认证',{shade: true,time: 3})
                    }else{
                        this.$router.push({name:"personal"})
                    }
                }else{
                    that.$layer.msg('网络故障，请重新提交',{shade: true,time: 3})
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        goenterprise(){
            let that=this;
            this.$request({
                method:'get',
                headers:{
                    'content-type': "application/json;charset=UTF-8"
                },
                url:'/customer/detail',
            }).then((res) => {
                console.log(res);
                if(res.data.code==0){
                    if(res.data.data.appStatus==1){
                        that.$layer.msg('您已提交个人认证，一个账号只能认证一种类型',{shade: true,time: 3})
                        return true
                    }
                    if(res.data.data.approveStatus=="1"){
                        that.$router.push({
                            name:"enterresult",
                            params:{
                                approveStatus:res.data.data.approveStatus
                            }
                        })
                    }else{
                        this.$router.push({name:"enterprise"})
                    }
                }else{
                    that.$layer.msg('网络故障，请重新提交',{shade: true,time: 3})
                }
            }).catch((err) => {
                console.log(err);
            })
            
        },
       
    },
    
}
</script>
<style scoped>
.wrap{
    background:#F8F8F8;
    min-height: 768px;
}
.content{
     padding-top: 60px;
     width: 1104px;
     margin:0 auto;
}
.attention{
    text-align: center;
    background: #FFF3EB;
    width:1104px;
    height: 56px;
    line-height: 56px;
    font-size: 14px;
    color:#FF6600;
    margin-top: 71px;
}
.zy{
    vertical-align: middle;
    margin-right: 10px;
    display: inline-block;
}
.choose{
    text-align: center;
    font-size: 16px;
    color:#7A7A7A;
    text-align: left;
    margin:35px 0 21px;
}
.choose_cnt{
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    justify-content:space-around;
}
.kuang{
    width:530px;
    height:144px;
    background:rgba(255,255,255,1);
    box-shadow:0px 5px 10px 0px rgba(194, 194, 194, 0.35);
    border-radius:6px;
    cursor: pointer;
}
.kuang:hover{
    box-shadow:0px 5px 10px 0px rgba(24, 144, 255, 0.15);
}
.kuang dl{
    overflow: hidden;
    padding:30px 40px;
    text-align: left;
}
.kuang dt{
    float: left;
    width: 20%;
}
.kuang dd{
    float: left;
    margin-left: 30px;
    width: 70%;
}
.kuang dd h3{
    width:80px;
    font-size:20px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:#333;
    margin-top:15px;
}
.kuang dd p{
    font-size:14px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:#1890FF;
    margin-top: 12px;
}
</style>