<template>
  <div>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key"/>
      <!--<keep-alive>-->
      <!--</keep-alive>-->
    </transition>
  </div>
</template>
<script>

  export default {
    data(){
      return {
      }
    },
    computed: {
      key() {
        return this.$route.fullPath
      }
    }
  }
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
  $blue : #409EFF;
</style>
