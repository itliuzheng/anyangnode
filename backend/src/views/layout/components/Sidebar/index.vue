<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="topic">{{isCollapse?"":"后台系统"}}</div>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#49505a"
      text-color="#fff"
      active-text-color="#1e6fc8"
      popper-class="lalala"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>
<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'

  export default {
    components: { SidebarItem },
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>
<style scoped>

  .topic{
    width: 100%;
    height: 60px;
    background: #1986f6;
    color: #fff;
    font-size: 18px;
    text-align: center;
    line-height: 60px;
    font-weight: bold;
  }
</style>
