<template>
    <div class="wrap">
        <div class="header">
            <div class="logo">
                <span class="logo_pic"><img src="../../assets/images/user/user_logo.png" alt=""></span>
                <strong>用户中心</strong>
            </div>
            <div class="user">
                <span class="user_tx"><img src="../../assets/images/user_tx.png" alt=""></span>
                <div class="userhover">
                    <span class="user_phone">{{loginCode}}</span>
                    <img class="dselect" src="../../assets/images/user/dselect.png" alt="">
                    <div class="downselect">
                        <ul> 
                            <li @click="$router.push({name:'userindex'})"><i></i><span>用户中心</span><i></i></li>
                            <li><i></i><span>问题与建议</span><i></i></li>
                            <li><i></i><span>退出账号</span><i></i></li>
                        </ul>
                    </div>
                </div>
                <img class="helpico" src="../../assets/images/user/helpicon.png" alt="">
                <span class="user_phone">帮助</span>
            </div>
        </div>
        <div class="content">
            <div class="navlist">
                <div class="navtitle">
                    <p>请选择要使用的产品</p>
                    <span><img class="nav1" src="../../assets/images/user/navline.png" alt=""></span>
                </div>
                <div class="nav">
                    <div class="navchild">
                        <p><img class="nav1" src="../../assets/images/user/nav1.png" alt=""></p>
                        <span>网页取证平台</span>
                    </div>
                    <div class="navchild">
                        <p><img class="nav2" src="../../assets/images/user/nav2.png" alt=""></p>
                        <span>版权保护平台</span>
                    </div>
                    <div class="navchild">
                        <p><img class="nav3" src="../../assets/images/user/nav3.png" alt=""></p>
                        <span>壹签</span>
                    </div>
                    <div class="navchild">
                        <p><img class="nav4" src="../../assets/images/user/nav4.png" alt=""></p>
                        <span>权利卫士</span>
                    </div>
                    
                </div>
            </div>
            <div class="rightpic">
                <img src="../../assets/images/user/chahua.png" alt="">
            </div>
        </div>

        <div class="footer">
            版权所有：北京联合信任技术服务有限公司 京ICP备13046264-2
        </div>
    </div>
</template>
<script>
export default {
    data(){
    	return{
           loginCode:'登录', 
    	}
    },
    mounted() {
        var that=this;
	    that.$('.navchild p').mouseenter(function(){
            $(this).find('img').addClass('animated tada');
        })
        that.$('.navchild p').mouseleave(function(){
            $(this).find('img').removeClass('animated tada');
        })
        let localdata=this.$getlocalStorage('userinfo')
	    this.loginCode=localdata.loginCode
	},
    methods:{

    },
    
}
</script>

<style scoped>
.wrap{
    background:linear-gradient(-30deg,rgba(57,136,254,1) 0%,rgba(57,187,254,1) 100%);
}
.header{
    width: 100%;
    max-width: 1920px;
    margin:0 auto;
    height: 80px;
    padding: 20px 41px;
    box-sizing: border-box;
}
.logo{
    float: left;
}
.logo img{
    width: 147px;
    height: 44px;
}
.dselect{
    margin:0 16px;
    -webkit-transition: all .2s ease;
    -moz-transition: all .2s ease;
    transition: all .2s ease;
}
.helpico{
    margin:0 6px;
}
.logo_pic{
    display: inline-block;
    vertical-align: middle;
    width: 132px;
    height: 40px;
    margin-right: 27px;
}
.header strong{
    display: inline-block;
    border-left: 2px solid #fff;
    height:36px;
    line-height: 36px;
    font-size: 20px;
    color:#fff;
    vertical-align: middle;
    padding-left: 20px;
}
.user{
    float: right;
    line-height: 36px;
    color:#fff;
    font-size: 14px;
    position: relative;
}
.user_tx{
    display: inline-block;
    vertical-align: middle;
    height: 36px;
    margin-right: 9px;
}
.user_phone{
    font-size: 14px;
    cursor: pointer;
}
.userhover{
    display: inline-block;
}
.layout{
    cursor: pointer;
}
.downselect{
    position: absolute;
    padding: 12px 16px;
    background:rgba(255,255,255,.8);
    border-radius: 8px;
    left:40px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    -ms-transform: translateY(-20px);
    -webkit-transform: translateY(-20px);
    -moz-transform: translateY(-20px);
    -o-transform: translateY(-20px);
    transition: all .2s ease-out;
    -webkit-transition: all .2s ease-out;
    -moz-transition: all .2s ease-out;
    -o-transition: all .2s ease-ou
}
.downselect li{
    color:#606B73;
    cursor: pointer;
}
.downselect li span{
    border-bottom: 1px solid #C1D4E5;
    display: inline-block;
    margin:0 5px;
}
.downselect li:last-child span{
    border-bottom:none;
}
.downselect li i{
    display: inline-block;
    visibility: hidden;
    width:6px;
    height: 6px;
    background:#FEBB39;
    border-radius: 6px;
}
.downselect li:hover{
    color:#000;
}
.downselect li:hover i{
    visibility: initial
}
.userhover:hover .dselect{
    transform:rotate(180deg);
}
.userhover:hover .downselect{
    opacity: 1;
    visibility:visible;
    transform: translateY(0px);
    -ms-transform: translateY(0px);
    -webkit-transform: translateY(0px);
    -moz-transform: translateY(0px);
    -o-transform: translateY(0px);
}
.content{
    width: 100%;
    max-width: 1920px;
    margin: 0 auto;
    overflow: hidden;
    padding: 98px 47px 32px;
    box-sizing: border-box;
}
.navlist{
    float: left;
    width:50%;
    padding:80px 4%;
    box-sizing: border-box;
}
.rightpic{
    float: right;
    width:50%;
}
.rightpic img{
    width: 80%;
}
.navtitle{
    text-align: left;
    color:#fff;
    font-size: 26px;
    margin-bottom: 83px;
}
.nav{
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    justify-content:space-between;
}
.navchild{
    text-align: center;
    cursor: pointer;
    color:#fff;
}
.navchild p{
    width: 100px;
    height: 100px;
    background:#fff;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    margin-bottom: 35px;
}
.navchild .nav1{
    width:60px;
    height: 57px;
}
.navchild .nav2{
    width:80px;
    height: 61px;
}
.navchild .nav3{
    width:64px;
    height: 61px;
}
.navchild .nav4{
    width:68px;
    height: 63px;
}
.footer{
    color:#fff;
    padding-bottom: 28px;
}
</style>