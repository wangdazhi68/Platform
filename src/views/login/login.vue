<template>
    <div class="wrap" :style="loginbg">
     	<div class="logo">
     		<img src="../../assets/images/logo2.png" alt="联合信任">
     	</div>  
     	<div class="content">
     		<div class="cnt_bg" :style="logincntbg">
     		</div>
     		<div class="cnt">
     			<div class="slogan"> 
     				<img src="../../assets/images/slogan.png" alt="slogan">
     			</div>
     			<div class="logo2">
     				<img src="../../assets/images/logo.png" alt="">
     			</div>
     			<div class="form">
     				<div class="account">
     					<p class="ts" v-show="nameerror"><img src="../../assets/images/erroricon.png" alt="">{{nameerror}}</p>
     					<div class="ipt_bg">
     						<img src="../../assets/images/accicon.png" alt="">
     						<input type="text" placeholder="账号" v-model="username" @blur="changename()">
     					</div>
     				</div>
     				<div class="password">
     					<p class="ts" v-show="passerror"><img src="../../assets/images/erroricon.png" alt="">{{passerror}}</p>
     					<div class="ipt_bg">
     						<img src="../../assets/images/pasicon.png" alt="">
     						<input type="password" placeholder="密码" v-model="password">
     					</div>
     				</div>
     				<div class="forget">
     					<router-link to="/getpassword/one" exact>
                            <span>忘记密码</span>
                        </router-link>
     				</div>
     				<div class="login_btn_wrap">
     					<span class="login_btn" @click="login()">登录</span>
     				</div>
     				<div class="reg_btn_wrap">
     					<span class="reg_btn">
     						<router-link to="/login/register">
     							创建账号
     						</router-link>
     					</span>
     				</div>
     			</div>
     			<div class="trilateral">
     				<ul>
     					<li><img src="../../assets/images/qq.png" alt=""></li>
     					<li><img src="../../assets/images/wb.png" alt=""></li>
     					<li><img src="../../assets/images/wx.png" alt=""></li>
     				</ul>
     			</div>
     		</div>
     	</div>
     	<div class="footer">
     		版权所有：北京联合信任技术服务有限公司 京ICP备13046264-2
     	</div> 
    </div>
</template>
<script>
import { hexMD5 } from '@/assets/js/md5';
import qs from 'qs'
export default {
	components: {
	    
	},
    data(){
    	return{
    		loginbg:{backgroundImage:'url(' + require('../../assets/images/loginbg.png') + ')'},
    		logincntbg:{backgroundImage:'url(' + require('../../assets/images/logincntbg.png') + ')'},
			nameerror:null,
			passerror:null,
			username:'',
			password:'',
			
    	}
    },
    mounted() {
      
	},
    methods:{
		changename(){
			let data=qs.stringify({
                    loginName:this.username,
				});
				//console.log(data)
			this.$request({
                method:'post',
                data:data,
                headers:{
					//'content-type': "application/json;charset=UTF-8"
					'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                url:'/register/validate',
            }).then((res) => {
                //console.log(res);
                if(res.data.code==0){
                    this.nameerror='账户不存在'
                }else{
					this.nameerror=null
				}
            }).catch((err) => {
                console.log(err);
            })
		},
		login(){
			var that=this;
			var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
			reg.test(this.username)
			if(!(/^1[3456789]\d{9}$/.test(this.username)) && !reg.test(this.username)){ 
                this.nameerror='账户为邮箱或手机号'
                return false
            } else{
                this.nameerror=null;
			}
			let passreg = /^(?=.*?[0-9])(?=.*?[a-z])[0-9a-z]{8,}$/
            let password=passreg.test(this.password)
			if(!password){
				this.passerror='密码格式错误';
                return false
			}
			
			this.$request({
                method:'post',
                data:{
                    username:that.username,
                    password:hexMD5(this.password)
                },
                headers:{
                    'content-type': "application/json;charset=UTF-8"
                },
                url:'/login/signOn',
            }).then((res) => {
                console.log(JSON.stringify(res.data.data));
                if(res.data.code==0){
					that.$store.commit('setuserinfo',res.data.data);
					that.$setlocalStorage('userinfo',res.data.data)
					that.$layer.msg('登录成功',{shade: true,time: 3})
					console.log(that.$route.query.redirect);
					if(that.$route.query.redirect){
						console.log('aaa')
						setTimeout(function(){
							that.$router.replace({path:that.$route.query.rediect})
						},3000);
					}else{
						console.log('bbb')
						setTimeout(function(){
							that.$router.push({name:"loginindex"})
						},3000);
					}
                    
                }else{
                    this.passerror="您的密码填写有误";
                }

            }).catch((err) => {
                console.log(err);
            })
		}
    },
    
}
</script>
<style scoped>
.wrap{
	width: 100%;
	background-size: cover;
	background-repeat: no-repeat;
	padding: 20px 24px;
	box-sizing: border-box;
	max-width: 1920px;
	margin:0 auto;
}
.logo{
	text-align: left;
}
.content{
	width: 1053px;
	height: 752px;
	margin:0 auto;
	background:#fff;
	margin-top: 52px;
	border-radius: 8px;
    box-shadow:0px 6px 21px 8px rgba(208, 208, 208, 0.35);
}
.cnt_bg{
	float: left;
	width: 560px;
	height: 752px;
	background-size: cover;
}
.cnt{
	float: left;
	width: 493px;
}
.slogan{
	text-align: right;
	padding-right: 13px;
	padding-right: 16px;
	padding-top: 18px;
}
.logo2{
	margin-top: 46px;
}
.form,.trilateral{
	padding-left: 88px;
	margin-top:26px;
}
.account,.password{
	text-align: left;
	margin-bottom: 35px;
	position: relative;
}
.ts{
	font-size: 12px;
	color:red;
	text-align: left;
	position: absolute;
	top:-22px;
}
.ts img{
	width:13px;
	height: 13px;
	vertical-align: -2px;
	margin-right: 14px;
}
.ipt_bg{
	box-sizing: border-box;
	display: inline-block;
	box-shadow:0px 4px 12px 1px rgba(208, 208, 208, 0.35);
	border-radius: 8px;
	width: 297px;
	height: 55px;
	line-height: 55px;
	padding: 0 16px;
}
.ipt_bg img{
	width:23px;
	height: 23px;
	margin-right: 14px;
	vertical-align: -5px;
}
.ipt_bg input{
	background:#fff;
	border:none;
	outline: none;
	font-size: 14px;
}
.forget{
	text-align: right;
	color:red;
	font-size: 14px;
	margin-top: 16px;
	width: 297px;
}
.forget span{
	cursor: pointer;
}
.login_btn_wrap,.reg_btn_wrap{
	width: 297px;
	margin-top:45px;
	text-align: left;
}
.reg_btn_wrap{
	margin-top: 25px;
	text-align:center;
}
.login_btn{
	display: inline-block;
	width: 297px;
	height: 55px;
	background:rgba(96,126,255,1);
	box-shadow:0px 4px 15px 6px rgba(208, 208, 208, 0.35);
	border-radius:6px;
	color:#fff;
	line-height: 55px;
	cursor: pointer;
	text-align: center;
}
.reg_btn a{
	font-size: 14px;
	color:#607EFF;
	cursor: pointer;
	text-align: center;
}
.trilateral ul{
	width:297px;
	display: -webkit-flex;
    display: flex;
	-webkit-flex-direction: row;
    flex-direction: row;
    justify-content:space-around;
}
.footer{
	text-align: center;
	margin-top:75px;
	font-size: 16px;
}
.forget span:hover{
	color:#607EFF;
}

@media screen and (max-width:1366px) {
    .content{
    	width: 749px;
		height: 535px;
		margin-top: 37px;
		border-radius: 6px;
        box-shadow:0px 4px 15px 6px rgba(208, 208, 208, 0.35);
    }
    .logo img{
    	width: 173px;
    	height: 52px;
    }
    .cnt_bg{
		width: 398px;
		height: 535px;
	}
	.cnt{
		float: left;
		width: 351px;
	}
	.slogan{
		padding-right: 13px;
		padding-top: 11px;
	}
	.slogan img{
		width: 205px;
		height: 38px;
	}
	.logo2{
		margin-top: 33px;
	}
	.logo2 img{
		width: 71px;
		height: 71px;
	}
	.form , .trilateral{
		padding-left: 63px;
	}
	.ipt_bg img{
		width: 17px;
		height: 17px;
		vertical-align: -2px;
		margin-right: 10px;
	}
	.ipt_bg{
		border-radius: 6px;
		width: 230px;
		height: 39px;
		line-height: 39px;
	}
	.forget{
		width: 230px;
	}
	.account,.password{
		margin-bottom: 30px;
	}
	.login_btn_wrap,.reg_btn_wrap{
		width: 230px;
		margin-top:32px;
	}
	.reg_btn_wrap{
		margin-top: 18px;
	}
	.login_btn{
		display: inline-block;
		width: 230px;
		height: 39px;
		background:rgba(96,126,255,1);
		box-shadow:0px 4px 12px 1px rgba(208, 208, 208, 0.35);
		border-radius:6px;
		color:#fff;
		line-height: 39px;
	}
	.trilateral ul{
		width: 230px;
	}
	.trilateral li img{
		width: 35px;
		height: 35px;
	}

}

@media screen and (min-width:1920px) {
    .wrap{
      width: 100%;
      margin:0 auto;
    }
}



</style>