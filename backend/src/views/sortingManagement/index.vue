<template>
  <div class="app-container">
    <el-form v-model="topModel" ref="customerTopModel" :inline="true" label-position="left">
      <el-row>
        <el-col :span="8">
          <el-form-item label="开立方:">
            <el-input v-model="topModel.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态:">
            <el-select v-model="topModel.status">
              <el-option label="待清分" :value="0"></el-option>
              <el-option label="已清分" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
         
        </el-col> -->
        <el-col :span="8">
          <el-button class="el-button el-button--primary" @click="inquire">查询</el-button>
          <el-button class="el-button" type="" @click="clear">清空</el-button>
        </el-col>
        
      </el-row>
       <el-form-item label="承诺付款日:" style="float:left;margin-left: 20px">
            <el-date-picker
              v-model="topModel.paymentDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
    </el-form>

    <el-table :data="tableData" border>
      <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
      <el-table-column prop="financeOrgName" label="开立方" align="center"></el-table-column>
      <el-table-column prop="receiveOrgName" label="接收方" align="center" width="150px"></el-table-column>
      <el-table-column prop="numberCode" label="开立E信编号" align="center"></el-table-column>
      <el-table-column prop="amount" label="E信金额（元）" align="center">
      </el-table-column>
      <el-table-column prop="paymentDate" label="承诺付款日" align="center"></el-table-column>
      <el-table-column prop="payDate" label="开立日期" align="center"></el-table-column>
      <el-table-column prop="clearStatus" label="清分状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.clearStatus == 0">待清分</span>
          <span v-else-if="scope.row.clearStatus == 1">已清分</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button class="" type="text" size="small"
                     @click="viewRecords(scope.row)">查看记录
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page" v-if="page.pages">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-size="page.pageSize"
        layout="total, prev,pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogFormVisibleProduct" width="90%">
      <circulation-sheet :init="dialogInitProduct" @closeDialog="closeDialog"></circulation-sheet>
    </el-dialog>

  </div>
</template>

<script>
  import {getClearingPage} from '@/api/api';
  import circulationSheet from "@/components/views/CirculationSheet"
  export default {
    name: "creditProgress",
    components: {
      circulationSheet
    },
    data() {
      return {
        page:{
          current:1,
          pageSize:10,
          pageNum:1,
          total:0,
          records:[
          ],
        },
        topModel: {
          name: '',
          status: '',
          paymentDate: ''
        },
        tableData: [],
        dialogInitProduct: {},
        dialogFormVisibleProduct:false
      }
    },
    created () {
      this.getData()
    },
    methods: {
      handleCurrentChange (val) {
        this.getData(val)
      },
      closeDialog(data) {
          this.dialogFormVisibleProduct = false
      },
      inquire() {
        this.getData()
      },
      clear() {
        this.topModel = {
          name: '',
          status: '',
          dateTime: ''
        }
        this.getData()
      },
      getData(page = 1){
        let _this = this
        let date = {
          pageNum: page,
          pageSize: 10,
          financeOrgName: _this.topModel.name,
          paymentDate: _this.topModel.paymentDate,
          clearStatus: _this.topModel.status
        }
        getClearingPage(date).then((res) => {
          this.tableData = res.data.records
          if(res.data){
            _this.page = res.data
          }
        });

      },
      viewRecords(row) {
        let obj = {}
            obj.numberCode = row.numberCode
        this.dialogInitProduct = obj
        this.dialogFormVisibleProduct = true
      },
    }
  }
</script>

<style scoped>
  .el-date-editor {
    width: 203px
  }
</style>
