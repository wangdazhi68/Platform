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
                    <strong>// 银行卡认证</strong>
                </div>
                <div class="choose">
                    <img src="../../assets/images/jticon.png" alt />
                    银行卡认证
                </div>
                <div class="attention">
                    <p>
                        <span class="zy">
                            <img src="../../assets/images/zyicon.png" alt />
                        </span>请务必提供真实信息，公司有权自行或委托第三方，审查提供的身份信息是否真实、有效。若提供虚假信息，由此带来的后果由提供方承担。
                    </p>
                </div>
                <div class="parpers_cnt">
                    <div class="cnt_form">
                        <div class="form_top">
                            <dl>
                                <dt>
                                    真实姓名
                                    <b>*</b>
                                </dt>
                                <dd>
                                    <input type="text" placeholder="请输入身份证上的姓名" v-model="realName" />
                                    <span class="warn" v-show="nameerror">{{nameerror}}</span>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    证件号码
                                    <b>*</b>
                                </dt>
                                <dd>
                                   <input type="text" placeholder="请输身份证号码" v-model="identityId" />
                                    <span class="warn" v-show="iderror">{{iderror}}</span>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    银行卡号
                                    <b>*</b>
                                </dt>
                                <dd>
                                    <input type="text" placeholder="请输入您的银行卡号" v-model="bankNo" />
                                    <span class="warn" v-show="bankerror">{{bankerror}}</span>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    手机号码
                                    <b>*</b>
                                </dt>
                                <dd>
                                    <input type="text" placeholder="请输入您的手机号码" v-model="mobile" />
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
                        <div class="submit" >
                            <span @click="submit()">提交认证</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="show">
            <div class="zhe"></div>
            <div class="mask2">
                <dl>
                    <dt>
                        <img src="../../assets/images/checksuccess.png" alt="">
                    </dt>
                    <dd>
                        您的手机认证已实名认证通过。
                    </dd>
                </dl>
                <div class="sure">
                    <span @click='$router.replace({ name: "rzindex" })'>返回</span>
                </div>
            </div >
        </div>
    </div>
</template>
<script>
import Rzheader from "./header.vue";
var interval = null;
import qs from "qs";
export default {
    components: {
        Rzheader,
    },
    data() {
        return {
            show:false,
            yzm:'',
            nameerror:null,
            phoneerror:null,
            yzmerror:null,
            iderror:null,
            bankerror:null,
            realName:'',
            identityId:'',
            mobile:'',
            bankNo:'',
            yzmtext:"获取短信验证码",
            disabled:false,
            currentTime: 61,
        };
    },
    mounted() {},
    methods: {
        getVerificationCode(){
            var phone = this.mobile;
            if(!(/^1[3456789]\d{9}$/.test(phone))){ 
                this.phoneerror='请输入正确的手机号码'
                return false
            } else{
                this.phoneerror=null;
            }
            this.getCode();
            var that = this
            that.disabled=true;
            this.$request({
                method:'post',
                data:{
                    loginName:this.mobile,
                    loginType:1
                },
                headers:{
                    'content-type': "application/json;charset=UTF-8"
                },
                url:'/register/sendValidateCode',
            }).then((res) => {
                console.log(res);
                if(res.data.code==-1){
                    alert('请求失败')
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
        submit() {
            if(!(/^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/).test(this.realName)){
                this.nameerror='请输入正确格式的姓名'
                document.body.scrollTop= 100;
	    	    document.documentElement.scrollTop = 100;
                return false
            }else{
                this.nameerror=null;
            }
            if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(this.identityId)) {
                this.iderror='请输入正确的身份证号码'
                document.body.scrollTop= 100;
	    	    document.documentElement.scrollTop = 100;
                return false
            }else{
                this.iderror=null;
            }
            if(!this.luhnCheck(this.bankNo) || this.bankNo.match(/^\s*$/)){
                this.bankerror='银行卡号格式有误'
                return false;
            }else{
                this.bankerror=null
            }
            if(this.yzm==this.sucyzm && this.yzm.length>0){
                this.yzmerror=null;    
            }else{
                this.yzmerror='验证码错误'
                document.body.scrollTop= 200;
	    	    document.documentElement.scrollTop = 200; 
                return false
            }
            let loading=this.$layer.loading({shade:true});
            let that=this;
            let data = qs.stringify({
                realName:that.realName,
                identityId:that.identityId,
                mobile:that.mobile,
                bankNo:that.bankNo
            });
            this.$request({
                method:'post',
                data:data,
                headers:{
                    'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    //'content-type': "application/json;charset=UTF-8"
                },
                url:'/personal/bankAuth',
            }).then((res) => {
                console.log(res);
                if(res.data.code==0){
                    that.$layer.close(loading);
                    that.show=true;
                }else{
                    that.$layer.close(loading);
                    that.$layer.msg(res.data.msg,{shade: true,time: 3})
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
    padding-top: 30px;
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
    justify-content: space-between;
}
.uploadlist li {
    width: 28%;
    box-sizing: border-box;
    border: 1px dashed #ccc;
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
.mask2{
    text-align: center;
    width: 560px;
    height:227px;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background:#fff;
    z-index: 10000;
    border-radius: 8px;
    padding-top: 40px;
}
.mask2 dt{
    margin-bottom: 25px;
}
.mask2 dd{
    font-size: 14px;
    color:#333;
}
.sure{
    margin-top:45px;
    text-align: center;  
}
.sure span{
    cursor: pointer;
    display: inline-block;
    width:95px;
    height:32px;
    border:1px solid #1890FF;
    color:#1890FF;
    line-height: 32px;
    text-align: center;
    border-radius:4px;
}
.sure span:hover{
    background:rgba(24,144,255,1);
    color:#fff;
}
</style>