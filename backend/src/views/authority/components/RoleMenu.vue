<template>
  <div class="role-main">

    <div class="top-main">
      <el-form :inline="true" ref="management" :model="management" label-position="left">
        <el-form-item label="角色名称:">
          <el-input v-model="management.name"></el-input>
        </el-form-item>
        <el-form-item label="角色状态:">
          <el-select v-model="management.status" >
              <el-option label="全部" value=""></el-option>
              <el-option label="启用" :value="1"></el-option>
              <el-option label="停用" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <div class="inquire">
          <el-button class="el-button el-button--primary" @click="inquire">查询</el-button>
          <el-button class="el-button--primary  el-button" type="success" @click="addCreate">添加</el-button>
        </div>
      </el-form>
    </div>
    <el-table
      :data="page.records"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="50px"
        align="center"
        label="序号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="角色名称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="description"
        label="备注">
      </el-table-column>
      <el-table-column
        align="center"
        label="角色状态">
        <template slot-scope="scope">
          <p v-if="scope.row.status == 1">启用</p>
          <p v-else>禁用</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="createDate"
        label="创建时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createUserName"
        label="创建人">
      </el-table-column>
      <el-table-column
        align="center"
        width="180"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button class="color-red" type="text" size="small" @click="editDialog(scope.row)">权限分配</el-button>
          <el-button class="color-red" type="text" size="small" @click="showInfo(scope.row)">编辑</el-button>
          <el-button class="color-red" type="text" size="small" @click="deleteRow(scope.$index, page,scope.row)">删除</el-button>
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


    <el-dialog title="角色创建" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="createForm">
        <el-form-item label="角色名称" :label-width="formLabelWidth"
              prop="name"
              :rules="{
                required: true, message: '角色名称不能为空', trigger: 'blur'
              }"
                      >
          <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.description" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="状态设置" :label-width="formLabelWidth"
              prop="status"
              :rules="{
                required: true, message: '状态设置不能为空', trigger: 'blur'
              }" >
          <el-radio-group v-model="form.status" size="medium">
            <el-radio :label="1" >启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="角色编辑" :visible.sync="dialogEditFormVisible">

      <el-tree
        ref="editTree"
        :data="editForm"
        show-checkbox
        node-key="id"
        :default-checked-keys="blockTree"
        :default-expand-all="true"
        :props="defaultProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

  import { rolePage,roleType,roleDelete,resourcesAllId,roleAuthorize  } from '@/api/authority'
  import {reconstruction} from "@/utils/tree";

  export default {
    mounted(){
      this.getInit();
    },
    data(){
      return {
        page:{
          current:1,
          pageSize:10,
          pages:1,
          total:0,
          records:[
          ],
        },
        dialogFormVisible:false,
        dialogEditFormVisible:false,
        dialogEditFormId:'',
        form: {
          name: '',
          description: '',
          status: null,
          id: '',
          trees: [],
        },
        form_type: '',
        formLabelWidth: '120px',
        editForm:{
          name: '',
          label:'',
          code: '',
          description: '',
          type: '1',
          id: '',
          targetUrl: '',
          parentId:'',
          data:'',
          children:[]
        },
        blockTree:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        management:{
          name:'',
          status:null,
        },
      }
    },
    methods:{
      handleCurrentChange(val) {
        this.management.pageNum = val;
        this.getUser(val);
      },
      deleteRow(index,row,scope){
        let id = scope.id;
        let _this = this;

        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          roleDelete(id).then(function (res) {
            _this.$message({
              type: 'success',
              message: res.msg
            });
            _this.getInit();
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      inquire(){
        // this.ajaxPage();
        this.getInit();
      },

      getInit(page = 1){
        let _this = this;
        let data = {
          pageNum:page,
          name:_this.management.name,
          status:_this.management.status,
        };
        rolePage(data).then(function (res) {
          _this.page = res.data;
        });
      },
      addRole(){
        var _this = this;

        this.$refs.createForm.validate((valid) => {
          if (valid) {
            const date = _this.form;
            roleType(date,_this.form_type).then(function (res) {
              _this.$message({
                type: 'success',
                message: res.msg
              });
              _this.getInit();
              _this.dialogFormVisible = false;
            });
          }
        });

      },
      addCreate(){
        var _this = this;
        _this.dialogFormVisible = true;

        _this.form = {};
        _this.form_type = 'add';

      },
      showInfo(row){
        var _this = this;
        _this.dialogFormVisible = true;

        _this.form = row;
        _this.form_type = 'update';

      },
      editDialog(row){
        var _this = this;
        let id = row.id;
        _this.dialogEditFormId = id;

        let check_tree = [];
        function filter(trees){
            for(let i = 0;i<trees.length;i++){
              if(trees[i].selected){
                if(trees[i] && trees[i].children){
                  filter(trees[i].children);
                }else{
                  check_tree.push(trees[i].id);
                }

              }
            }
          return check_tree;
        }

        resourcesAllId(id).then(function (res) {
          let trees = reconstruction(res.data);
          _this.editForm = trees;
          _this.dialogEditFormVisible = true;

          const list = filter(trees);
          _this.$nextTick(()=>{
           _this.$refs.editTree.setCheckedKeys(list)
          })

        });

      },
      editRole(){
        var _this = this;
        let aCheck = this.$refs.editTree.getCheckedKeys();
        let roleId = this.dialogEditFormId;

        let date = {
          roleIds:JSON.stringify(roleId),
          resIds:aCheck.join(','),
        };

        roleAuthorize(date).then(function (res) {
          _this.$message({
            type: 'success',
            message: res.msg
          });
          _this.dialogEditFormVisible = false;
          _this.$router.go(0)
        });


      },

    },
  }
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
  $blue : #409EFF;
  .color-red{
    color: #f95353;
  }
  .role-main{
    width: 100%;
    background: #fff;
    padding: 0 50px 50px;
  }
  .top-main{
    padding: 20px;
    .inquire{
      display: inline-block;
    }
  }

</style>
