<template>
    <div class="wrap">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item name="1">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>Q:什么是联合信任电子证据固化保全系统？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    《联合信任电子证据固化保全系统》是由北京联合信任技术服务有限公司独立部署并运营的第三方电子数据固化保全平台，用以对电子数据进行取证、固化和保全，证明所获取电子证据的客观存在性和内容完整性，以解决当事人取证困难、维权成本高、司法认定复杂的问题。
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="2">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>什么是网页取证？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    网页取证是《联合信任电子证据固化保全系统》的一项针对网页形式电子数据进行取证、固化和保全的服务，通过联合信任可信时间戳技术手段对网页内容实时固化保全，并生成联合信任可信时间戳认证证书。该服务可以及时固定网页证据，防止证据灭失，且证据勘验简单快捷。
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="3">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>网页自动取证是否需要电脑清洁性检查及录屏?</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    电脑清洁性检查及录屏是针对取证人在自己电脑进行自助取证操作时所必须的步骤（具体流程参见联合信任发布的《电子数据取证及固化保全操作指引》）。因为取证人的电脑及网络环境不清洁、不真实等有可能带来证据来源不真实、证据内容伪造等问题。<br>
采用联合信任自动取证的电子证据，是由联合信任作为第三方通过部署在联合信任的取证固化系统自动进行获取及固定。这种方式不依赖于取证申请人的电脑和网络环境，可以有效避免当事人伪造和篡改证据的可能性，以达到事后举证时可以客观真实的还原事实真相的目的。
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="4">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>网页取证如何使用？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    注册、登录联合信任电子证据固化保全系统，选择“网页取证”服务，输入申请人和取证的URL地址，点击“立即取证”即可。
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="5">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>网页取证的证据如何获取？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    网页取证完成后，确认证据，下载可信时间戳认证证书（*.pdf格式），电子证据文件（*.tee格式）和可信时间戳证书（*.tsa格式）存放在可信时间戳认证证书的附加中，该电子证据文件（*.tee）可使用rar、zip等通用解压软件解压。
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="6">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>网页取证如何收费？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    每条网页证据收费10元，该费用包含取证服务、可信时间戳固化服务和证据保全服务。
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
