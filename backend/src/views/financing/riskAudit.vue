<template>
  <div class="app-container">

    <el-table :data="tableData.records" border>
      <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
      <el-table-column prop="financingCode" label="融资申请单编号" align="center"></el-table-column>
      <el-table-column prop="financingCompany" label="融资企业" align="center" width="150px"></el-table-column>
      <el-table-column prop="numberCode" label="E信编号" align="center"></el-table-column>
      <el-table-column prop="financeAmount" label="融资金额（元）" align="center"></el-table-column>
      <el-table-column prop="financeRate" label="融资利率（日/%）" align="center"></el-table-column>
      <el-table-column label="贸易信息" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.tradeStatus == 0">验证不通过</p>
          <p v-else>验证通过</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button class="" type="text" size="small"
                     @click="showApproval(scope.row)">审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-box" v-if="tableData.total != 0">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="tableData.current"
        :page-size="tableData.pageSize"
        layout="total, prev,pager, next, jumper"
        :total="tableData.total">
      </el-pagination>
    </div>


    <el-dialog :visible.sync="dialogFormVisible" >
      <dialog-approval @closeDialog="closeDialog" :init="dialogInit" :groupList="groupList"></dialog-approval>
    </el-dialog>

  </div>
</template>

<script>
  import { FINANCINGLIST } from '@/utils/credit'
  import { postPage, postApproval } from '@/api/financing'
  import DialogApproval from "@/components/views/DialogApproval";
  export default {
    name: "financingRiskAudit",
    components: {
      DialogApproval
    },
    data() {
      return {
        groupList:FINANCINGLIST.financingRiskAudit,
        topModel:{
          "financingCompany": "",//融资企业
          "status": 1,//审核状态：1-风控审核，11-风控审批，21-财务审批，31-财务审核
          "pageNum": 1,
          "pageSize": 10
        },
        tableData: {
          "current": "", //long //当前",
          "pageSize":"",// "int //页大小",
          "pages": "",//"long //总页数",
          "total":"",// "long //总数据量",
          "records": []
        },
        dialogFormVisible:false,
        dialogInit:{
          callback:(data)=>{
            this.postApproval(data)
          }
        },
      }
    },
    created(){
      this.getData()
    },
    methods: {
      handleCurrentChange(val) {
        this.topModel.pageNum = val;
        this.getData();
      },
      closeDialog(data) {
        this.dialogFormVisible = false;
      },
      getData() {
        postPage(this.topModel)
        .then( res =>{
          this.tableData = res.data
        })
      },
      showApproval(row) {
        this.dialogInit.id = row.id;
        this.dialogFormVisible = true;
      },
      postApproval(data){
        let body = Object.assign(data,{
          financingType:1
        })
        postApproval(body)
        .then( res =>{
          this.$message.success(res.msg)
          this.dialogFormVisible = false;
          this.$router.push({name:'financingRiskApproval'})
        })
      }
    }

  }
</script>

<style scoped>

  .approval-box{
    padding-right: 150px;
  }
</style>
