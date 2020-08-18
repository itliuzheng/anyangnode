<template>
  <div class="app-container">
    <el-form v-model="topModel" ref="customerTopModel" :inline="true" label-position="left">
      <el-row>
        <el-col :span="8">
          <el-form-item label="企业名称:">
            <el-input v-model="topModel.companyName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="额度状态:">
            <el-select v-model="topModel.status">
              <el-option label="正常" :value="1"></el-option>
              <el-option label="终止" :value="2"></el-option>
              <el-option label="到期" :value="3"></el-option>
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
      <el-table-column prop="companyName" label="企业名称" align="center"></el-table-column>
      <el-table-column prop="socialCreditCode" label="统一社会信用代码" align="center" width="150px"></el-table-column>
      <el-table-column prop="creditStartDate" label="起始日" align="center"></el-table-column>
      <el-table-column prop="creditEndDate" label="到期日" align="center"></el-table-column>
      <el-table-column prop="creditAccount" label="总额度（元）" align="center"></el-table-column>
      <el-table-column prop="usedAccount" label="已使用额度（元）" align="center"></el-table-column>
      <el-table-column prop="freezeAccount" label="冻结额度" align="center"></el-table-column>
      <el-table-column prop="freezingAccount" label="在途冻结额度（元）" align="center"></el-table-column>
      <el-table-column prop="availableAccount" label="可用额度" align="center"></el-table-column>
      <el-table-column prop="statusName" label="额度状态" align="center"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="150px">
        <template slot-scope="scope">
          <div class="more-inlineblock" v-if="scope.row.status == 1">
            <el-button type="text" size="small" @click="freezeQuota(scope.row)">冻结额度</el-button>
            <el-button type="text" size="small" @click="ThawingQuota(scope.row)">解冻额度</el-button>
          </div>
          <div class="more-inlineblock" v-if="scope.row.status == 1">
            <el-button type="text" size="small" @click="deleteClick(scope.row)">额度终止</el-button>
            <el-button type="text" size="small" @click="ChangeQuota(scope.row)">额度变更</el-button>
          </div>
          <div class="blue inlineBlock" v-else-if="scope.row.status == 2">
            <el-button type="text" size="small" @click="restoreClick(scope.row)">恢复</el-button>
          </div>
          <div class="inlineBlock" v-else>
            <p>---</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="变更记录" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button class="" type="text" size="small"
                     @click="showDetail(scope.row)">查看记录
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
      <dialog-change-detail :init="dialogInitDetail" :callbackdata="callbackdata" :callback="historyCallback"></dialog-change-detail>
    </el-dialog>


    <add-quota  :dialogForm="dialogForm"  v-if="dialogFormVisible" @is_show="is_show"></add-quota>

  </div>
</template>

<script>

  import { postPage , postChangeAccount , postAccountHistory } from '@/api/creditApply'
  import dialogChangeDetail from "@/components/views/DialogChangeDetail";
  import { AddQuota , AddBlacklist } from "./component";
  import { CHANGEACCOUNT } from '@/utils/changeAccount'
  export default {
    name: "creditMaintain",
    components: {
      dialogChangeDetail,
      AddQuota,
      AddBlacklist,
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
        dialogInitDetail:{},
        callbackdata:{},
        dialogFormVisibleDetail:false,
        dialogForm:{
          status: null,
          operation:null,
          account:null,
          remark:null
        },
        dialogFormVisible:false,
      }
    },
    created(){
      this.getData()
    },
    methods: {
      is_show(is_boolean){
        this.dialogFormVisible = false;
        if(is_boolean) this.inquire()

      },
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
          companyName: null,
          status: null,
        }
        this.inquire();
      },
      getData() {
        postPage(this.topModel)
          .then( res =>{
            this.tableData = res.data
          })
      },
      freezeQuota(row){
        this.dialogForm = Object.assign(this.dialogForm,{id:row.id},CHANGEACCOUNT[2]);
        this.dialogFormVisible = true;
      },
      ThawingQuota(row){
        this.dialogForm = Object.assign(this.dialogForm,{id:row.id},CHANGEACCOUNT[1]);
        this.dialogFormVisible = true;
      },
      ChangeQuota(row){
        this.dialogForm = Object.assign(this.dialogForm,{id:row.id},CHANGEACCOUNT[0]);
        this.dialogFormVisible = true;
      },
      EndQuota(id,status){
        let _this = this;
        postChangeAccount({id:id, status:status,})
          .then( res =>{
            this.$message.success(res.data)
            this.inquire()
          })
      },
      deleteClick(row){
        let _this = this;
        this.$confirm('确定终止额度?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {

          _this.EndQuota(row.id,3);

        }).catch(() => {

        });
      },
      restoreClick(row){
        let _this = this;
        this.$confirm('确定恢复额度?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          _this.EndQuota(row.id,4);
        }).catch(() => {

        });
      },
      showDetail(row) {
        this.callbackdata = {
          id:row.id,
          pageNum:1,
          pageSize:10
        }
        postAccountHistory(this.callbackdata)
          .then( res =>{
            this.dialogInitDetail = res.data
          })
        this.dialogFormVisibleDetail = true;
      },
      historyCallback(page){
        this.callbackdata.pageNum = page;

        postAccountHistory(this.callbackdata)
          .then( res =>{
            this.dialogInitDetail = res.data
          })
      }
    }

  }
</script>

<style scoped>

</style>
