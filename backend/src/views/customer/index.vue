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
          <el-form-item label="状态:">
            <el-select v-model="topModel.status">
              <el-option label="已授信" :value="1"></el-option>
              <el-option label="未授信" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button class="el-button el-button--primary" @click="inquire">查询</el-button>
          <el-button class="el-button" type="" @click="clear">清空</el-button>
          <el-button class="el-button el-button--primary" type="success" @click="addCreate">新增</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData.records" border>
      <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
      <el-table-column prop="companyName" label="企业名称" align="center"></el-table-column>
      <el-table-column prop="creditCode" label="统一社会信用代码" align="center" width="150px"></el-table-column>
      <el-table-column prop="legalPerson" label="法定代表人" align="center"></el-table-column>
      <el-table-column prop="contactPerson" label="公司联系人" align="center"></el-table-column>
      <el-table-column prop="companyPhone" label="公司联系电话" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.status == 0">未授信</p>
          <p v-else-if="scope.row.status == 1">已授信</p>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="创建日期" align="center"></el-table-column>
      <el-table-column prop="name" label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button class="" type="text" size="small"
                     @click="goDetail(scope.row)">详情
          </el-button>
          <el-button class="" type="text" size="small"
                     @click="goModify(scope.row)">修改
          </el-button>
          <el-button class="color-red" type="text" size="small"
                     @click="goDelete(scope.row)">删除
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


  </div>
</template>

<script>
  import { postPage, postDeleteId } from '@/api/customer'

  export default {
    name: "customerIndex",
    data() {
      return {
        topModel: {
          "companyName": "",//企业名称
          "status": null,//状态：0-未授信，1-已授信
          "pageNum": 1,
          "pageSize": 10
        },
        tableData: {
          "current": "", //long //当前",
          "pageSize":"",// "int //页大小",
          "pages": "",//"long //总页数",
          "total":"",// "long //总数据量",
          "records": [
          ]
        },
      }
    },
    created(){
      this.getData();
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
          companyName: null,
          status: null,
        }
        this.inquire()
      },
      getData() {
        postPage(this.topModel)
          .then((res)=>{
            this.tableData = res;
          })
          .catch((err)=>{
            this.$message.error(err)
          })
      },
      goDetail(row) {
        let id = row.id || 0;
        this.$router.push({name:'customerDetail',params:{id:id},query:{type:'look'}});
      },
      goModify(row) {
        let id = row.id || 0;
        this.$router.push({name:'customerDetail',params:{id:id},query:{type:'modify'}});
      },
      goDelete(row) {
        this.$confirm('确定要删除吗?', '消息提示', {
          align: 'center',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        })
          .then(() => {
            return postDeleteId(row.id)
          })
          .then(res=>{
            this.$message({
              type: 'success',
              message:res.msg
            })
            this.getData();
          })
      },
    }

  }
</script>

<style scoped>

</style>
