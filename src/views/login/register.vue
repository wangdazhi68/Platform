<template>
    <div class="wrap" :style="loginbg">
        <div class="logo">
            <img src="../../assets/images/logo2.png" alt="联合信任" />
        </div>
        <div class="content">
            <div class="cnt_bg" :style="logincntbg"></div>
            <div class="cnt">
                <div class="slogan">
                    <img src="../../assets/images/slogan.png" alt="slogan" />
                </div>
                <div class="logo2">
                    <img src="../../assets/images/logo.png" alt />
                </div>
                <div class="reg_nav">
                    <ul>
                        <li>
                            <router-link to="/login/register/regPhone" exact>
                                <span>手机号注册</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/login/register/regEmail" exact>
                                <span>邮箱注册</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <router-view />
            </div>
        </div>
        <div class="footer">版权所有：北京联合信任技术服务有限公司 京ICP备13046264-2</div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            loginbg: {
                backgroundImage:
                    "url(" + require("../../assets/images/loginbg.png") + ")"
            },
            logincntbg: {
                backgroundImage:
                    "url(" + require("../../assets/images/logincntbg.png") + ")"
            },
            
        };
    },
    mounted() {
        // this.$router.push({name:'login'});
    },
    methods: {
        
    }
};
</script>
<style>
input:-webkit-autofill { 
  -webkit-box-shadow: 0 0 0 1000px white inset !important;
}
.wrap {
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 20px 24px;
    box-sizing: border-box;
    max-width: 1920px;
    margin: 0 auto;
}
.logo {
    text-align: left;
}
.content {
    width: 1053px;
    height: 752px;
    margin: 0 auto;
    background: #fff;
    margin-top: 52px;
    border-radius: 8px;
    box-shadow: 0px 6px 21px 8px rgba(208, 208, 208, 0.35);
}
.cnt_bg {
    float: left;
    width: 560px;
    height: 752px;
    background-size: cover;
}
.cnt {
    float: left;
    width: 493px;
}
.slogan {
    text-align: right;
    padding-right: 13px;
    padding-right: 16px;
    padding-top: 18px;
}
.logo2 {
    margin-top: 10px;
}
.form,
.trilateral {
    padding-left: 88px;
    margin-top: 26px;
}
.account,
.password {
    text-align: left;
    margin-bottom: 18px;
    position: relative;
}
.ts {
    font-size: 12px;
    color: red;
    text-align: left;
    position: absolute;
    top: -22px;
}
.ts img {
    width: 13px;
    height: 13px;
    vertical-align: -2px;
    margin-right: 14px;
}
.ipt_bg {
    box-sizing: border-box;
    display: inline-block;
    box-shadow: 0px 4px 12px 1px rgba(208, 208, 208, 0.35);
    border-radius: 8px;
    width: 297px;
    height: 48px;
    line-height: 48px;
    padding: 0 16px;
}
.ipt_bg img {
    width: 23px;
    height: 23px;
    margin-right: 14px;
    vertical-align: -5px;
}
.ipt_bg input {
    background: #fff;
    border: none;
    outline: none;
    font-size: 14px;
    width: 70%;
}
.forget {
    text-align: right;
    color: red;
    font-size: 14px;
    margin-top: 16px;
    width: 297px;
}
.forget span {
    cursor: pointer;
}
.login_btn_wrap,
.reg_btn_wrap {
    width: 297px;
    margin-top: 25px;
    text-align: left;
}
.reg_btn_wrap {
    margin-top: 25px;
    text-align: center;
}
.login_btn {
    display: inline-block;
    width: 297px;
    height: 55px;
    background: rgba(96, 126, 255, 1);
    box-shadow: 0px 4px 15px 6px rgba(208, 208, 208, 0.35);
    border-radius: 6px;
    color: #fff;
    line-height: 55px;
    cursor: pointer;
    text-align: center;
    user-select:none;
}
.reg_btn {
    font-size: 14px;
    color: #607eff;
    cursor: pointer;
    text-align: center;
    user-select:none;
}
.trilateral ul {
    width: 297px;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    justify-content: space-around;
}
.footer {
    text-align: center;
    margin-top: 75px;
    font-size: 16px;
}
/*注册*/
.reg_nav {
    padding-left: 88px;
    margin-top: 22px;
    margin-bottom: 26px;
}
.reg_nav ul {
    width: 297px;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    justify-content: space-around;
}
.reg_nav li {
    color: #999;
    font-size: 16px;
    cursor: pointer;
}
.reg_nav span {
    display: inline-block;
}
.reg_nav li .router-link-active {
    display: inline-block;
    padding-bottom: 5px;
    color: #000;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAAADCAYAAACOJBG1AAAAAXNSR0IArs4c6QAAAIlJREFUOBFjfGWi0fqfgbGEgYGBDYhpBX4xMvzvETtzoxrZAlnFjlaG/1jt/sXA+L/n8f0KFPXIekcCm+UfA2MpIwMDK409ywa0Jx9ox1QUe/4zlAL52OxmY/jPgKkeRfPw57AwMfzvpkPO+Q20ZyIwOJ+hBCkjQzcwErDl2t8MjAyY6lE0D38OAGD0IgBKkPwlAAAAAElFTkSuQmCC)
        no-repeat bottom;
}
.reg_ts {
    font-size: 12px;
    color: red;
    position: absolute;
    background: #cbcbcb;
    display: inline-block;
    padding: 2px 8px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    right: 16%;
    bottom: -12px;
}
.reg_ts img {
    width: 13px;
    height: 13px;
    vertical-align: -2px;
    margin-right: 8px;
}
.yzm {
    width: 168px;
    height: 48px;
    line-height: 48px;
    padding: 0 16px;
    float: left;
}
.yzm_ts {
    right: 50%;
}
.yzm_btn {
    float: left;
    padding-top: 8px;
    padding-left: 7px;
    cursor: pointer;
    user-select:none;
}
.yzm_btn span {
    display: inline-block;
    font-size: 14px;
    color: #fff;
    background: #607eff;
    border-radius: 20px;
    padding: 11px 20px;
    user-select:none;
}
.yzm_btn span[disabled]{
    color:#fff;
    background:#BCBCBC;
    pointer-events: none;
    cursor: inherit;
}
.slide {
    width: 297px;
    margin-bottom: 15px;
}
.xieyi {
    text-align: left;
    font-size: 12px;
}
#check {
    position: absolute;
    left: -9999px;
}
.xieyi a {
    color: #607eff !important;
    cursor: pointer;
}


.login_btn[logindisabled]{
    color:#fff;
    background:#BCBCBC;
    pointer-events: none;
    cursor: inherit;
    user-select:none;
}
@media screen and (max-width: 1366px) {
    .content {
        width: 749px;
        height: 570px;
        margin-top: 17px;
        border-radius: 6px;
        box-shadow: 0px 4px 15px 6px rgba(208, 208, 208, 0.35);
    }
    .logo img {
        width: 173px;
        height: 52px;
    }
    .cnt_bg {
        width: 398px;
        height: 570px;
        background-size:100% 100%; 
    }
    .cnt {
        float: left;
        width: 351px;
    }
    .slogan {
        padding-right: 13px;
        padding-top: 11px;
    }
    .slogan img {
        width: 205px;
        height: 38px;
    }
    .logo2 {
        margin-top: 5px;
    }
    .logo2 img {
        width: 71px;
        height: 71px;
    }
    .form,
    .trilateral {
        padding-left: 63px;
    }
    .form {
        margin-top: 10px;
    }
    .ipt_bg img {
        width: 17px;
        height: 17px;
        vertical-align: -2px;
        margin-right: 10px;
    }
    .ipt_bg {
        border-radius: 6px;
        width: 230px;
        height: 34px;
        line-height: 34px;
    }
    .forget {
        width: 230px;
    }
    .account,
    .password {
        margin-bottom: 13px;
    }
    .login_btn_wrap,
    .reg_btn_wrap {
        width: 230px;
        margin-top: 10px;
    }
    .reg_btn_wrap {
        margin-top: 18px;
    }
    .login_btn {
        display: inline-block;
        width: 230px;
        height: 39px;
        background: rgba(96, 126, 255, 1);
        box-shadow: 0px 4px 12px 1px rgba(208, 208, 208, 0.35);
        border-radius: 6px;
        color: #fff;
        line-height: 39px;
    }
    .trilateral ul {
        width: 230px;
    }
    .trilateral li img {
        width: 35px;
        height: 35px;
    }
    /*注册*/
    .reg_nav {
        padding-left: 63px;
        margin-top: 10px;
        margin-bottom: 13px;
    }
    .reg_nav ul {
        width: 230px;
    }
    .yzm {
        width: 120px;
        height: 34px;
        line-height: 34px;
        padding: 0 4px;
        float: left;
    }
    .yzm_btn {
        padding-top: 1px;
        padding-left: 7px;
    }
    .yzm_btn span {
        padding: 6px 15px;
    }
    .slide {
        width: 230px;
        margin-bottom: 15px;
    }
    label a{
        cursor: pointer;
    }
}

@media screen and (min-width: 1920px) {
    .wrap {
        width: 100%;
        margin: 0 auto;
    }
}
</style>