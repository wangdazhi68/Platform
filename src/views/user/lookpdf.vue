<template>
    <div style="width:100%; height:100%; position:fixed">
        <iframe :src="src" frameborder="0" style="width: 100%; height: 100%"></iframe>
    </div>
</template>
<script>
export default {
    components: {  },
    data() {
        return {
            src: "",
            id: ""
        };
    },
    created() {
        this.id = this.$route.query.id;
        let that = this;
        this.$request({
            method: "get",
            url: "index/viewOne?id="+this.id
        })
        .then(res => {
            console.log(res);
            if (res.data.code == 0) {
                that.src =res.data.data.url
            } else {
                that.$message.error(res.data.msg);
            }
        })
        .catch(err => {
            that.$message.error("请求数据出错，请刷新重试");
            console.log(err);
        });
    },
    methods: {
    },
    mounted() {}
};
</script>
<style lang="stylus">

</style>