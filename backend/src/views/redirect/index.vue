<script>
  export default {
    beforeCreate(){
      const path = this.$route.params.path;
      console.log('path===',path);
      this.$router.replace(`/${path}`)
    },
    render:function (h) {
      return h();
    }
  }
</script>
