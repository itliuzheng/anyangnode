<template>
  <div :class="classObj" class="app-wrapper">
    <!--<div class="drawer-bg" @click="handleClickOutside"/>-->
    <div class="drawer-bg"/>
    <sidebar class="sidebar-container"/>
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
      }
    },
    beforeMount(){

    },
    methods:{
      getList(page = 1){
        var _this = this;
        new Promise((resolve,reject) => {
            ajax({
              url:`/product/product/page`,
              method:'post',
              data:{
                pageSize:10,
                pageNum:page,
              }
            }).then(function (res) {
              let data = res.data;
              if(data.code == 1){
                if(data.data){

                }
              }

            }).catch(error => {
              reject(error)
            })
        })
      },
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

</style>


