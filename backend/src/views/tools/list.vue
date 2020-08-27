<template>
  <div class="app-container">
    <el-form v-model="topModel" ref="customerTopModel" :inline="true" label-position="left">
      <el-row>
        <el-col :span="8">
          <el-form-item label="标题:">
            <el-input size="small"  v-model="topModel.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="text-right">
          <el-form-item label="">
            <el-button size="small" class="el-button" type="primary" @click="inquire">查询</el-button>
            <el-button size="small" class="el-button" type="" @click="clear">清空</el-button>
            <el-button size="small" class="el-button" type="danger"  @click="addCreate">新增</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData.records" border>
      <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column prop="imgUrl" label="封面图片" align="center"></el-table-column>
      <el-table-column prop="sort" label="排序" align="center" ></el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center" width="150px"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button class="" type="text" size="small"
                     @click="modify(scope.row)">修改
          </el-button>
          <el-button class="" type="text" size="small"
                     @click="deleteBtn(scope.row)">删除
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

    <dialog-game :formData="formData"
                 @is_show="isShow"
                 v-if="dialogFormVisibleDetail"></dialog-game>


  </div>
</template>

<script>
  import { postPage,postDelete } from '@/api/gameTool'
  import DialogGame from "./component/dialogGame";

  export default {
    name: "gameIndex",
    components: {
      DialogGame,
    },
    data() {

      return {
        topModel: {
          name: null,
          typeId: null,
          pageNum: 1,
          pageSize: 30
        },
        tableData: {
          records:[]
        },
        dialogInitDetail:[],
        dialogFormVisibleDetail:false,
        axiosId:null,
        formData:{},
        gameTypeList:[],
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

        this.formData = {};
        this.dialogFormVisibleDetail = true;

        },
      inquire() {
        this.getData();
      },
      clear() {
        this.topModel = {
          name: null,
          typeId: null,
        }
        this.getData();
      },
      getData() {
        postPage(this.topModel)
          .then(res=>{
            this.tableData = res.data
          })
      },
      modify(row){
        this.formData = row;

        this.dialogFormVisibleDetail = true;
      },
      deleteBtn(row){
        this.$confirm('确定要删除吗?', '消息提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'})
          .then(() => {
            postDelete(row.id).then(res =>{
              this.$message({
                type:'success',
                message:res.msg
              });
              this.dialogFormVisibleDetail = false;
              this.getData();
            });
          })
          .catch(() => {

          });
      },
      isShow(messgae){
        this.dialogFormVisibleDetail = false;
        if(messgae){
          this.getData();
        }
      }
    }

  }
</script>

<style scoped>

</style>
