<template>
  <div class="app-container">
    <el-form v-model="topModel" ref="customerTopModel" :inline="true" label-position="left">
      <el-row>
        <el-col :span="8">
          <el-form-item label="企业名称:">
            <el-input v-model="topModel.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态:">
            <el-select v-model="topModel.status">
              <el-option label="进行中" :value="1"></el-option>
              <el-option label="通过" :value="2"></el-option>
              <el-option label="拒绝" :value="3"></el-option>
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
      <el-table-column prop="numberCode" label="审批编号" align="center"></el-table-column>
      <el-table-column prop="companyName" label="预授信企业" align="center" width="150px"></el-table-column>
      <el-table-column prop="socialCreditCode" label="统一社会信用代码" align="center"></el-table-column>
      <el-table-column prop="creditAmount" label="预授信额度（万）" align="center"></el-table-column>
      <el-table-column prop="creditMonth" label="授信期限（月）" align="center"></el-table-column>
      <el-table-column prop="statusName" label="状态" align="center"></el-table-column>
      <el-table-column  label="操作" align="center" fixed="right">
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
      <dialog-detail :init="dialogInitDetail"></dialog-detail>
    </el-dialog>

  </div>
</template>

<script>
  import { postApplyPage , getByNumberCode  } from '@/api/creditApply'
  import DialogDetail from "@/components/views/DialogDetail";
  export default {
    name: "creditProgress",
    components: {
      DialogDetail
    },
    data() {
      return {
        topModel: {
          "companyName": "",//	  企业名称
          "status": null,//	  0-进行中 1-拒绝 2-通过
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
        dialogInitDetail:[],
        dialogFormVisibleDetail:false,
      }
    },
    created(){
      this.getData()
    },
    methods: {
      handleCurrentChange(val) {
        this.topModel.pageNum = val;
        this.inquire();
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
          name: null,
          status: null,
        }
      },
      getData() {
        postApplyPage(this.topModel)
          .then(res=>{
            this.tableData = res.data
          })
      },
      showDetail(row) {
        this.dialogFormVisibleDetail = true;
        getByNumberCode(row.numberCode)
          .then( res =>{
            this.$set(this,'dialogInitDetail',res.data)
          })
      },
    }

  }
</script>

<style scoped>

</style>
