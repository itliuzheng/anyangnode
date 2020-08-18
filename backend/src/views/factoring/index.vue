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
          <el-form-item label="状态:">
            <el-select v-model="topModel.status">
              <el-option label="待还款" :value="0"></el-option>
              <el-option label="已还款" :value="-2"></el-option>
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
      <el-table-column prop="numberCode" label="E信编号" align="center"></el-table-column>
      <el-table-column prop="financeAmount" label="E信融资金额" align="center" width="150px"></el-table-column>
      <el-table-column prop="financingCompany" label="融资企业" align="center" width="150px"></el-table-column>
      <el-table-column prop="financeRate" label="融资利率（%/日）" align="center"></el-table-column>
      <el-table-column prop="" label="放款金额" align="center"></el-table-column>
      <el-table-column prop="" label="放款时间" align="center"></el-table-column>
      <el-table-column prop="" label="承诺付款日" align="center"></el-table-column>
      <el-table-column prop="" label="还款状态" align="center"></el-table-column>
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
      <dialog-detail :init="dialogInitDetail"></dialog-detail>
    </el-dialog>

  </div>
</template>

<script>
  import { postPage } from '@/api/factoring'
  import DialogDetail from "@/components/views/DialogDetail";
  export default {
    name: "creditProgress",
    components: {
      DialogDetail
    },
    data() {
      return {
        topModel: {
          financingCompany: null,
          status: null,
          pageNum: 1,
          pageSize: 10
        },
        tableData: {},
        dialogInitDetail:[],
        dialogFormVisibleDetail:false,
      }
    },
    created(){
      this.getData();
    },
    methods: {
      handleCurrentChange(val) {
        this.topModel.pageNum = val;
        this.getData();
      },
      addCreate() {
        let id = 0;
        this.$router.push({name:'customerDetail',params:{id:id}});
      },
      inquire() {
        this.getData();
      },
      clear() {
        this.topModel = {
          financingCompany: null,
          status: null,
        }
        this.getData();
      },
      getData() {
        postPage(this.topModel)
          .then(res=>{
            this.tableData = res.data
          })
      },
      showDetail(row) {
        this.dialogFormVisibleDetail = true;
      },
    }

  }
</script>

<style scoped>

</style>
