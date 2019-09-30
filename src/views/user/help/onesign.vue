<template>
    <div class="wrap">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item name="1">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>Q:注册流程</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                        第一步：打开壹签官网，点击“注册”；<br>
                        第二步：在注册页面填写注册信息；使用手机号作为账号，输入账号，密码，再点击“获取验证码”；<br>
                        第三步：系统发送短信验证码，打开手机查收短信；<br>
                        第四步：填写手机验证码，点击“注册”按钮；<br>
                        第五步：注册成功。<br>
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="2">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>实名认证流程</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    第一步：登录并进入个人中心；<br>
                    第二步：进入实名认证页面；<br>
                    第三步：选择要认证的方式，分为个人用户实名认证和企业用户实名认证，默认一个账号只能申请一个身份，即个人用户实名认证审核通过后就无法再认证为企业用户；<br>

                    选择认证个人用户，首先，填写个人基本信息即个人姓名和身份证号码；点击下一步，设置6位数字签署密码；点击下一步，选择要进行验证的方式，默认为选择银行预留信息认证，该方式需填入本人的银行卡号及银行预留手机号进行认证；第二种方式为人工审核方式，主要方法为：上传身份证正反面照片，拍摄方式（正面照片及身份证照片）、上传方式（手持证件照），提交后，3-4个工作日即可出结果。 
                    选择认证企业用户，需提交具体信息，旧版三证（企业名称、执照号及照片、组织机构代码及照片、法人姓名、法人身份证、手机号），新版三证合一（企业名称、社会统一信用代码及照片、法人姓名、法人身份证、手机号），如果为代理人还需提交代理人身份证照片，拍摄方式（正面照片及身份证照片）、上传方式（手持证件照），提交后，3-4个工作日即可出结果。
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="3">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>实名认证的作用?</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    通过了实名认证，可以向他人发起需要签署的文档或者进行签署；<br>
                    通过了实名认证，一旦在壹签平台签署的文档产生纠纷，可以申请公证，更有法律保障；<br>
                    通过了实名认证，还可以享受壹签提供的其他增值服务。<br>
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="4">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>如何设置签名</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    第一步：登录用户中心，点击菜单栏的“签名管理”进入签名管理页面；（如果您的账号未实名，签署文件之前需要先实名认证；个人用户实名认证后，会生成默认签名。）<br>

                    第二步：上传签名，请一定要注意上传图片的要求；有三种上传签名的方式<br>

                    扫码签名：用手机扫描二维码-在手机屏幕书写签名并提交<br>

                    上传签名：选择本地印章图片上传<br>

                    手绘签名：用鼠标在电脑屏幕绘制签名<br>
                    第三步：上传后，返回签名管理即可看到新增的签名图片；<br>
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="5">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>如何购买套餐</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    第一步：登录用户中心，点击菜单栏的“套餐管理”，点击“购买套餐”进入套餐列表；<br>
                    第二步：选择要购买的套餐；<br>
                    第三步：选择在线支付方式（支付宝/微信支付），扫码完成支付。<br>
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="6">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>签署文件流程</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    第一步：登录首页，点击“创健合同”；<br>

                    第二步：填入创建合同的名称，选择创建合同的方式，分为本地上传（默认只能上传pdf格式的合同），在线创建和模板创建；<br>

                    第三步：编辑合同，点击下一步；<br>
                    【草稿箱保存的是你之前发起过程中保存的记录，从草稿箱发起直接可回到保存的节点】<br>

                    第四步：拖放签名，完成签署<br>

                    第五步：添加签署方（支持手动输入、从联系人快捷添加），点击发送合同；<br>

                    第六步：签名完成，跳转至合同管理页面可查看刚签署的文件。<br>

                    【方式一】：短信链接（发起方发送文件后，接收方会收到一条提示短信）<br>

                    第一步：点击短信链接，跳转到手机浏览器打开登录页面；<br>

                    第二步：<br>

                    1）若您未注册，会跳转到注册页面，并使用短信里指定的账号注册，登录后即可找到对应待签署的文件；<br>

                    2）若您已注册，直接使用您的账号安全登录，登录后跳转到签名页面；<br>

                    【方式二】：直接登录官网<br>

                    第一步：进入合同管理，在待我签署列表中，找到待签署文件，在列表点击“签署”，或者进入文件详情页点击“签署”；<br>

                    第二步：跳转签名页面，添加签名，完成本次签名。<br>
                    </span>
                </div>
            </el-collapse-item>
             <el-collapse-item name="7">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>实名认证有几种方式？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    有2种认证方式，分别是：<br>
                    1、银行预留信息认证：通过姓名，身份证号码，银行卡号及银行预留手机号进行认证，系统自动审核<br>
                    2、手持身份证认证：分别拍摄身份证正反照和手持身份证，上传到壹签平台审核，进行实名认证<br>
                    </span>
                </div>
            </el-collapse-item>
             <el-collapse-item name="8">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>如何保证本人签署？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    用户的账户通过实名认证后壹签才会为其申请数字证书，在用户的签名中会包含本人的数字证书和可信时间戳，在司法上可直接被认定是本人在某一时刻的签署。同时壹签通过在实名认证时设置的签署密码对签署操作进行校验。
                    </span>
                </div>
            </el-collapse-item>
             <el-collapse-item name="9">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>签署的合同保存在哪里？保存期限为多久？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    如果您是接口用户并选择了壹签的快捷模式服务，则壹签全程不接触用户的合同，您签署后的合同保存到您的服务器上；<br>

                    如果您是接口用户并选择了混合云模式服务，您签署后的合同保存在壹签服务器上；如果您需要下载到自己的平台可以通过合同管理接口，将合同下载到自己的平台进行保存。<br>

                    如果您是壹签的平台用户，则您签署的合同保存在壹签服务器上，您可以通过下载将合同下载到本地。<br>

                    壹签平台签署的合同保存期为合同有效期+1年。<br>
                    </span>
                </div>
            </el-collapse-item>
             
        </el-collapse>
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            activeName: '1'
        };
    },
    mounted() {},
    methods: {}
};
</script>
<style scoped>
.el-collapse-item{
   padding: 20px 32px 20px; 
   background:#fff;
   text-align: left;
   margin-bottom:20px; 
}
.el-collapse{
    background:#f8f8f8 !important;
    border:none !important;
}
.boxtitle{
    color:#333;
    font-size: 18px;
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.answer{
    font-size: 18px;
    color:#666;
    border-top:1px solid #e1e6eb;
    padding-top:20px;
    overflow: hidden;
}
.boxtitle span,.answer span{
    display: block;
    float: left;
    width: 90%;
}
.boxtitle b,.answer b.aa{
    float: left;
    display: block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    color:#fff;
    font-size: 18px;
    font-weight: 700;
    border-radius: 2px;
    margin-right: 15px;
}
.boxtitle b{
    background:#8EC4FF;
}
.answer b{
    background:#E1E6EB;
}
</style>
<style lang="stylus">
.el-collapse-item__wrap{
    border-bottom: none !important;
}
.el-collapse-item__header{
    border-bottom: none !important;
}
</style>
