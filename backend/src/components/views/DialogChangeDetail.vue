<template>
  <div>
    
    <el-table :data="init.records" border height="300px">
      <el-table-column prop="operateUser" label="操作人" align="center"></el-table-column>
      <el-table-column prop="createDate" label="操作时间" align="center" width="160px"></el-table-column>
      <el-table-column prop="operate" label="操作类型" align="center">
        <template slot-scope="scope">
          <p>{{operateType[scope.row.operate]}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
    </el-table>
    <div class="page-box" v-if="init.total != 0">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="init.current"
        :page-size="init.pageSize"
        layout="total, prev,pager, next, jumper"
        :total="init.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { OPERATETYPE } from '@/utils/changeAccount'
  export default {
    name: "dialogApproval",
    props:{
      init:{
        type:Object,
      },
      callback:{
        type:Function
      }
    },
    data() {
      return {
        operateType : OPERATETYPE
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.callback(val);
      },
    }

  }
</script>

<style scoped>

</style>
