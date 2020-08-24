<template>
  <div class="navbar">

    <!--<hamburger :toggle-click="toggleSideBar"  class="hamburger-container"/>-->

    <!--<breadcrumb class="breadcrumb-container"/>-->
    <div class="right-menu ">
      <ul class="menu-nav clearfix">
        <li>
            <i class="el-icon el-icon-user"></i>
            <span>您好，{{username}}</span>
        </li>
        <li @click="logout" class="pointer">
            <i class="el-icon el-icon-switch-button"></i>
            <span>退出登录</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  // import Hamburger from '@/components/Hamburger'
  import Breadcrumb from '@/components/Breadcrumb'
  import router from '@/router'
  // import store from 'store'

  export default {
    components:{
      // Hamburger,
      Breadcrumb
    },
    data(){
      let json = '';

      try {
        let token =  this.$store.getters.token;
        json = JSON.parse(window.atob(token.substring(token.indexOf('.')+1,token.lastIndexOf('.')))).sub
      }catch (e) {

      }
      return {
        username:json
      }
    },
    methods:{
      toggleSideBar(){
        this.$store.dispatch('toggleSideBar')
      },
      logout(){
        let _this = this;
        this.$store.dispatch('LogOut').then(() => {
          // location.reload()// In order to re-instantiate the vue-router object to avoid bugs
          router.go(0)
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 70px;
  line-height: 70px;
  border-radius: 0 !important;

  .right-menu{
    width: 100%;
    .menu-nav{
      float: right;
      list-style: none;
      margin-right: 20px;
      li{
        float: left;
        margin-left: 40px;
      }
    }
  }
}
</style>
