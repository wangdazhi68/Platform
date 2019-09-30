<template>
    <div class="wrap">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item name="1">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>Q:如何保护我的版权？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    根据《著作权法》有关规定，作品产生即拥有著作权（版权），无论是否发表或登记，版权是产生即拥有的。要想保护你的版权，需要证明作品是你第一时间创作产生的。并且这个证据要能够得到司法和行政机关的认可。
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="2">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>什么是可信时间戳认证？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    简单说，作品的可信时间戳认证就是由联合信任时间戳服务中心（TSA）给你的作品颁发一个“电子出生证”。有了这个出生证就能证明作品是你第一时间创作的了！以后被侵权的时候就有了法律认可的证据。
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="3">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>可信时间戳司法认可吗？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    联合信任时间戳服务中心作为国家授时中心唯一授时与守时保障的专业时间戳服务机构，其签发的可信时间戳已经在大量的司法实践中得到认可。可信时间戳认证作为一种方便、快捷、便宜的知识产权保护方式已经被广泛使用。众多司法判例可登陆最高院裁判文书网查询。
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="4">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>为什么要申请可信时间戳认证？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    第一、威慑！告诉哪些想盗版的人，这个作品是你的！别打歪主意！<br>
                    第二、维权举证！被侵权了你就有了不可否认的证据
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="5">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>TSA是什么？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    TSA是Time Stamp Authority的简写，是时间戳服务机构的意思。我国唯一权威时间戳服务机构是由国家授时中心与联合信任共同建设的，对外称联合信任时间戳服务中心（www.tsa.cn）。
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="6">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>可信时间戳只能证明时间吗？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    可信时间戳证明的是内容和内容存在的时间。在版权证明中，因为在申请认证时作者填写了身份信息、权属信息、和作品内容简介等，这些都包含在版权可信时间戳认证里面了。简单说，可信时间戳版权认证的是版权的所有人（WHO）、内容(WHAT)、时间（WHEN）。已经包含了版权权利的全部内容了。所以，可信时间戳不只是证明时间。
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="7">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>多长时间我能拿到可信时间戳认证证书？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    可信时间戳认证秒间完成，立刻出证。
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="8">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>有了可信时间戳就能证明作品是我的了吗？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    如果你是原创，并且在创作后第一时间申请了可信时间戳认证，这种情况当然就能证明作品是你的了！<br>
                    如果你没有第一时间申请可信时间戳认证，并且把作品给别人看了或被盗了，那么风险就来了，别人可能会拿你的作品去申请可信时间戳或版权登记或公开发表。这种情况你要证明你的权利就复杂多了！<br>
                    所以建议：作品产生即申请可信时间戳认证，防患未然、有备无患！
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="9">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>申请可信时间戳会泄露作品内容吗？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    可信时间戳认证时上传给TSA的只是作品的数字指纹（HASH）,并不上传作品内容，并且这个指纹也不能反算出来作品内容，所以作品内容是保密安全的。当然，TSA版权系统也提供作品的上传和存储，如果你怕作品自己保管丢了，也可以上传作品到系统里来，我们帮你保存。
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="10">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>可信时间戳只能保护版权吗？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    当然不是，在任何需要证明有关时间和内容的地方都可以使用可信时间戳认证，比如你的版权原创证明、商业秘密权属证明、商标使用性证明、专利在先性证明等等
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="11">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>我拿别人的作品能申请可信时间戳吗？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    当然可以！你可以拿别人的作品申请了可信时间戳认证、版权登记、公证、公开发表等。
但是！侵权有风险，如果真正的作者在你之前就申请了可信时间戳认证，那么你即使你申请了也没用，因为谁先谁后一目了然，你这么做反而给自己坐实了侵权事实。
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="12">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>可信时间戳认真时是否需要对申请人的真实身份进行认证？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    知识产权属于私有权，如果别人对你的作品主张权利需要双方举证。看看谁先谁后。如果你申请认证时使用的是别人的身份信息，那么这个时间戳对你来说申请是没有作用的。所以，可信时间戳系统让权利人自我声明身份，而不需要去作身份认证。
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="13">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>我有的作品量很大，能不能批量申请可信时间认证？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    可以的，联合信任时间戳服务中心提供API接口给你的系统，可以自动批量申请可信时间戳认证。
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="14">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>我申请了可信时间戳是不是还要申请版权登记或版权公证呢？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    证据不怕多呀！如果你是土豪并且有足够的时间，你当然可以同时对一个作品做可信时间戳认证、版权登记、版权公证...
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="15">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>我的作品申请完可信时间戳就不能改了吗？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    你要改什么？如果修改文件名没有任何问题，但是要修改内容就不能通过验证了！<br>
可信时间戳验证的时候需要提交申请时的作品电子文件，并且这个电子文件不能做任何的修改，哪怕你添加了一个空格都不行。必须保持原始状态。否则就不能通过验证了。所以你要保存好你申请时的作品电子文件，多备份几个存在不同的地方呀！<br>

如果你要修改作品，很简单，把作品复制成另外一个文件，就可以修改了。
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="16">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>一个作品能多次申请时间戳吗？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    当然可以多次申请，可是你要干什么呢？
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="17">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>什么类型的作品能作可信时间戳认证？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    可信时间戳是全能型的认证，无论你的作品类型是什么，只要能变成电子文件或电子数据就都可以认证。比如你的歌声很独特，没关系，可以录音录像后申请认证呀！
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="18">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>申请可信时间戳认证对作品的电子文件格式有要求吗？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    没有要求，什么类型的文件都可以申请认证
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="19">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>手机端能申请可信时间戳认证吗？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    时间戳服务中心提供了手机APP，你随身携带的“公证员”。任何时间、地点都可以对你的作品通过拍照、录像、录音即时认证。
                    </span>
                </div>
            </el-collapse-item>
            <el-collapse-item name="20">
                <template slot="title">
                    <div class="boxtitle"><b>Q</b><span>维权时我怎么出示我的证据？</span></div>
                </template>
                <div class="answer">
                    <b class="aa">A</b>
                    <span>
                    在给法院或行政机关提交证据时，只要把申请时间戳时的作品（电子文件）和对应的可信时间戳证书、可信时间戳认证证书刻成光盘或保存在U盘、硬盘等介质里提交就可以了。裁判机关会到时间戳中心去验证你的作品权属信息。
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
