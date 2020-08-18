<template>
  <div class="set-main">
    <el-tabs class="tab" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="菜单管理" name="first"><tab-menu></tab-menu></el-tab-pane>
      <el-tab-pane label="角色管理" name="second" ><role-menu v-if="activeName == 'second'"></role-menu></el-tab-pane>
      <el-tab-pane label="后台用户管理" name="user"><user-menu v-if="activeName == 'user'"></user-menu></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>

  import { TabMenu ,RoleMenu, UserMenu } from "./components";

  export default {
    components:{
      TabMenu,
      RoleMenu,
      UserMenu
    },
    data(){
      return {
        activeName: 'first'
      }
    },
    beforeMount(){
      let name = this.$route.query.name;
      if(name){
        this.activeName = name;
      }
    },
    methods:{
      handleClick(tab, event) {

      },
    },
  }
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
  $blue : #409EFF;
  .tab{
    padding-left: 20px;
  }
  .set-main{
    padding-bottom: 20px;
  }
</style>
