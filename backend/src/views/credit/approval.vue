<template>
  <div class="app-container">

    <el-table :data="tableData.records" border>
      <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
      <el-table-column prop="numberCode" label="审批编号" align="center"></el-table-column>
      <el-table-column prop="companyName" label="预授信企业" align="center" width="150px"></el-table-column>
      <el-table-column prop="socialCreditCode" label="统一社会信用代码" align="center"></el-table-column>
      <el-table-column prop="creditAmount" label="预授信额度（万）" align="center"></el-table-column>
      <el-table-column prop="creditMonth" label="授信期限（月）" align="center"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button class="" type="text" size="small"
                     @click="showApproval(scope.row)">审批
          </el-button>
          <el-button class="" type="text" size="small" @click="showDetail(scope.row)">详情
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

    <el-dialog :visible.sync="dialogFormVisibleDetail" >
      <dialog-detail :init="dialogInitDetail"></dialog-detail>
    </el-dialog>

  </div>
</template>

<script>
  import { CREDITLIST } from '@/utils/credit.js'
  import { postApplyPage , getByNumberCode , postApprove } from '@/api/creditApply'
  import DialogApproval from "@/components/views/DialogApproval";
  import DialogDetail from "@/components/views/DialogDetail";
  export default {
    name: "approval",
    components: {
      DialogApproval,
      DialogDetail
    },
    data() {
      let dialogInit = {
        callback:(data)=>{
          this.creditApprove(data)
        }
      };
      return {
        groupList:CREDITLIST,
        topModel: {
          "companyName": "",//	  企业名称
          "status": 0,//	  0-进行中 1-拒绝 2-通过
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
        dialogInit:dialogInit,
        dialogFormVisibleDetail:false,
        dialogInitDetail:[],
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
        postApplyPage(this.topModel)
          .then(res=>{
            this.tableData = res.data
          })
      },
      showApproval(row) {
        this.dialogInit.numberCode = row.numberCode
        this.dialogFormVisible = true;
      },
      showDetail(row) {
        this.dialogFormVisibleDetail = true;
        getByNumberCode(row.numberCode)
          .then( res =>{
            this.$set(this,'dialogInitDetail',res.data)
          })
      },
      creditApprove(data){
        postApprove(data)
          .then( res =>{
            this.dialogFormVisible = false;
            this.getData();
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
