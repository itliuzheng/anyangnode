<template>
  <div :class="classObj" class="app-wrapper">
    <!--<div class="drawer-bg" @click="handleClickOutside"/>-->

    <div class="sidebar-shadow"  style="z-index: 999;">
      <div class="topic">
        <span>{{isCollapse?"":"系统"}}</span>
      </div>
      <sidebar class="sidebar-container"/>
    </div>
    <div class="main-container">
      <navbar></navbar>
      <tags-view/>
      <back-main></back-main>
    </div>
  </div>
</template>
<script>

  import { Navbar,Sidebar,BackMain,TagsView } from './components'

  export default {
    name:'layout',
    components:{
      Navbar,
      Sidebar,
      BackMain,
      TagsView
    },
    mizins:[],
    computed:{
      sidebar() {
        return this.$store.state.app.sidebar
      },
      device() {
        return this.$store.state.app.device
      },
      classObj() {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    },
    beforeMount(){

    },
    methods:{
      handleClickOutside(){
      }
    }
  }
</script>
<style lang="scss">
  .top-main{
    background: #fff;
  }
  .content{
    tr,td{
      .cell{
        text-align: center;
        font-size: 12px;
      }
    }
  }
  .page{
    background: #fff;
    padding: 30px 0;
    width: 1000px;
    margin: 0 auto;
    .el-pagination{
      /*margin-top: 30px;*/
      text-align: center;
    }
  }
</style>
<style scoped lang="scss">

  .el-container{
    height: 100%;
  }

  .el-aside{
    background: #b3c0d1;
  }


  .sidebar-shadow{
    position: fixed;
    width: 250px;
    height: 100%;
    left: 0;
    top: 0;
    box-shadow:0px 0px 8px 0px rgba(0, 0, 0, 0.16);
  }
  .topic{
    position: fixed;
    width: 250px;
    top: 0;
    bottom: 0;
    left: 0;
    height: 70px;
    background: #fff;
    color: #333;
    font-size: 0;
    text-align: center;
    line-height: 70px;
    font-weight: 400;
    border-bottom: 1px solid #DDDDDD;
    img{
      display: inline-block;
      vertical-align: middle;
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }
    span{
      font-size: 20px;
      vertical-align: top;
    }
  }
</style>


