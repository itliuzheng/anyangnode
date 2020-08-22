<template>
  <div class="app-container">
    <el-form v-model="topModel" ref="customerTopModel" :inline="true" label-position="left">
      <el-row>
        <el-col :span="8">
          <el-form-item label="游戏名称:">
            <el-input v-model="topModel.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16" class="text-right">
          <el-button class="el-button" type="primary" @click="inquire">查询</el-button>
          <el-button class="el-button" type="" @click="clear">清空</el-button>
          <el-button class="el-button" type="danger"  @click="addCreate">新增</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData.records" border>
      <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
      <el-table-column prop="name" label="游戏名称" align="center"></el-table-column>
      <el-table-column prop="type" label="所属分类" align="center" ></el-table-column>
      <el-table-column prop="catena" label="所属系列" align="center"></el-table-column>
      <el-table-column prop="tagStr" label="标签" align="center"></el-table-column>
      <el-table-column prop="sizeStr" label="游戏大小" align="center"></el-table-column>
      <el-table-column prop="versionStr" label="版本介绍" align="center"></el-table-column>
      <el-table-column prop="downloadStr" label="下载信息" align="center"></el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center"></el-table-column>
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

    <el-dialog :visible.sync="dialogFormVisibleDetail" >
      <form-detail ref="formDetail" :init="formInit"></form-detail>
    </el-dialog>

  </div>
</template>

<script>
  import { postPage,postAdd,postUpdate,postDelete } from '@/api/gameDetail'
  import { postPage as getGameTypePage } from '@/api/game'
  import FormDetail from '@/components/views/FormDetail'
  export default {
    name: "gameIndex",
    components: {
      FormDetail
    },
    data() {
      let init = [
        {name: 'name',label: '类型名称',required:true, col: 24, type: 'input',  },
        {name: 'type',label: '所属分类',required:true, col: 24,
          type: 'select',optionItem: [],  },
        {name: 'catena',label: '所属系列', col: 24, type: 'input',  },
        {name: 'tagStr',label: '标签', col: 24, type: 'input',  },
        {name: 'sizeStr',label: '游戏大小', col: 24, type: 'input',  },
        {name: 'versionStr',label: '版本介绍', col: 24, type: 'input',  },
        {name: 'downloadStr',label: '下载信息', col: 24, type: 'input',  },
      ];
      let buttonList = [
        {
          name: '提交',
          type: 'primary',
          callback:()=>{
            this.confirmData();
          }
        },
        {
          name: '取消',
          type: '',
          callback:()=>{
            this.dialogFormVisibleDetail = false;
          }
        }
      ];

      return {
        topModel: {
          name: null,
          status: null,
          pageNum: 1,
          pageSize: 30
        },
        tableData: {},
        dialogInitDetail:[],
        dialogFormVisibleDetail:false,
        formInit:{
          list: init,
          buttonList: buttonList
        },
        gameTypeId:null
      }
    },
    created(){
      this.getGameType();
      this.getData();
    },
    methods: {
      handleCurrentChange(val) {
        this.topModel.pageNum = val;
        this.getData();
      },
      addCreate() {
        this.dialogFormVisibleDetail = true;
      },
      inquire() {
        this.getData();
      },
      clear() {
        this.topModel = {
          name: null,
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
      getGameType() {
        getGameTypePage({
          pageSize:30,
          pageNum:1
        })
          .then(res=>{
            this.$store.dispatch('insertType',res.data.records)
          //  this.$store.getters.game_type

            let items = this.$store.getters.game_type.map(item=>{
              return {
                label:item.name,
                value:item.id
              }
            });

            this.$set(this.formInit.list[1],'optionItem',items)
          })
      },
      modify(row){
        this.$refs.formDetail && this.$refs.formDetail.reset();
        let init = [
          {name: 'name',label: '类型名称',
            col: 24, type: 'input', model:row.name },
          {name: 'englishName',label: '英文名称',
            col: 24, type: 'input', model:row.englishName },
          {name: 'sort',label: '显示排序',
            col: 24, type: 'input', model:row.sort },
        ];
        let buttonList = [
          {
            name: '提交',
            type: 'primary',
            callback:()=>{
              this.updateData();
            }
          },
          {
            name: '取消',
            type: '',
            callback:()=>{
              this.dialogFormVisibleDetail = false;
            }
          }
        ];
        this.$set(this.formInit,'init',init);
        this.$set(this.formInit,'buttonList',buttonList)

        // this.formInit = {
        //
        // }

        console.log(this.formInit);
        this.gameTypeId = row.id;
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
      confirmData() {
        let data = this.$refs.formDetail.formData;
        this.$refs.formDetail.$refs.formData.validate((valid)=>{
          if(valid){
            postAdd(data).then(res =>{
              this.$message({
                type:'success',
                message:res.msg
              });
              this.$refs.formDetail.reset();
              this.dialogFormVisibleDetail = false;
              this.getData();
            });
          }
        })
      },
      updateData() {
        let data = Object.assign(this.$refs.formDetail.formData,{
          id:this.gameTypeId
        });

        this.$refs.formDetail.$refs.formData.validate((valid)=>{
          if(valid){
            postUpdate(data).then(res =>{
              this.$message({
                type:'success',
                message:res.msg
              });
              this.$refs.formDetail.reset();
              this.dialogFormVisibleDetail = false;
              this.getData();
            });
          }
        })
      },
    }

  }
</script>

<style scoped>

</style>
