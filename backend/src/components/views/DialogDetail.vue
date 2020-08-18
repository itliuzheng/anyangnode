<template>
  <div>
    <el-table :data="init" border>
      <el-table-column prop="operateUser" label="操作人" align="center"></el-table-column>
      <el-table-column prop="createDate" label="操作时间" align="center" width="160px"></el-table-column>
      <el-table-column prop="operateType" label="操作类型" align="center"></el-table-column>
      <el-table-column prop="statusName" label="结果" align="center"></el-table-column>
      <el-table-column prop="remark" label="处理意见" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "DialogDetail",
    props:{
      init:{
        type:Array,
      }
    },
    data() {
      return {

      }
    },
    methods: {

    }

  }
</script>

<style scoped>

</style>
