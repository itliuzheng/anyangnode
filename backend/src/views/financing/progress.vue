<template>
  <div class="app-container">

    <el-form v-model="topModel" ref="customerTopModel" :inline="true" label-position="left">
      <el-row>
        <el-col :span="8">
          <el-form-item label="融资企业:">
            <el-input v-model="topModel.financingCompany"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="额度状态:">
            <el-select v-model="topModel.quotaStatus" >
              <el-option :label="item.label" :value="item.value" v-for="item in optionList" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button class="el-button el-button--primary" @click="inquire">查询</el-button>
          <el-button class="el-button" type="" @click="clear">清空</el-button>
        </el-col>
      </el-row>
    </el-form>

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
      <el-table-column prop="statusName" label="状态" align="center"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button class="" type="text" size="small"
                     @click="showDetail(scope.row)">详情
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



    <el-dialog :visible.sync="dialogFormVisibleDetail" >
      <el-table :data="dialogInitDetail.records" border>
        <el-table-column prop="auditorUser" label="操作人" align="center"></el-table-column>
        <el-table-column prop="createDate" label="操作时间" align="center" width="160px"></el-table-column>
        <el-table-column prop="financingTypeName"  label="操作类型" align="center"></el-table-column>
        <el-table-column prop="" :formatter="_formatterStatus" label="结果"  align="center"></el-table-column>
        <el-table-column prop="remark" label="处理意见" align="center"></el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
  import { FINANCINGLIST , STATUSLIST ,QUOTASTATUS , FINANCINGTYPELIST} from '@/utils/credit'
  import { postSchedule, postApproval } from '@/api/financing'
  import { postPage as postPageHistory } from '@/api/financingHistory'
  import DialogApproval from "@/components/views/DialogApproval";

  export default {
    name: "financingRiskApproval",
    components: {
      DialogApproval
    },
    data() {
      return {
        optionList:QUOTASTATUS,
        topModel:{
          "financingCompany": "",//融资企业
          "quotaStatus": null,
          "status": null,
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
        dialogFormVisibleDetail:false,
        dialogInitDetail:{},
      }
    },
    created(){
      this.getData()
    },
    methods: {
      _formatterStatus(row,column,cellValue,index){
        let data = STATUSLIST.find( res =>{
          return res.value == row.status
        })
        return data.label
      },
      inquire() {
        this.getData();
      },
      clear() {
        this.topModel = {
          financingCompany: null,
          quotaStatus: null,
          status: null,
          "pageNum": 1,
          "pageSize": 10
        }
        this.inquire();
      },
      handleCurrentChange(val) {
        this.topModel.pageNum = val;
        this.getData();
      },
      getData() {
        postSchedule(this.topModel)
        .then( res =>{
          this.tableData = res.data
        })
      },
      showDetail(row) {
        let body = {financingManagementId:row.id}
        postPageHistory(body)
        .then( res =>{
          this.$set(this,'dialogInitDetail',res.data)
          this.dialogFormVisibleDetail = true;
        })
      },
    }

  }
</script>

<style scoped>

  .approval-box{
    padding-right: 150px;
  }
</style>
