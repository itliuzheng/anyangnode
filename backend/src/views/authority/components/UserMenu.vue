<template>
  <div >
    <div class="tishi">
      <ol>
        <li>1、为每一个员工添加用户账号，并且可以为每位员工设置角色获得相应的权限，权限有超级管理员、管理员、业务办理、业务审批经理等；
          <br/>（1）超级管理员功能有机构管理、用户管理、产品管理（资产方）权限设置；</li>
        <li>2、根据用户动向状态随时可设置用户系统功能。</li>
      </ol>
    </div>
    <div class="user-main">
      <div class="top-main">
        <el-form :inline="true" ref="management" :model="management" label-position="left">
          <el-form-item label="用户姓名">
            <el-input v-model="management.loginName"></el-input>
          </el-form-item>
          <el-form-item label="用户角色:">
            <el-input v-model="management.realName"></el-input>
          </el-form-item>
          <el-form-item label="用户状态:">
            <el-select v-model="management.status" >
              <el-option label="全部" value=""></el-option>
              <el-option label="启用" :value="1"></el-option>
              <el-option label="停用" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <div class="inquire">
            <el-button class="el-button el-button--primary" @click="inquire">查询</el-button>
            <el-button class="el-button--primary  el-button" type="success" @click="routerGo">添加</el-button>
          </div>
        </el-form>
      </div>
      <el-table
        :data="page.records"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          width="100px"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="loginName"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="realName"
          label="用户姓名">
        </el-table-column>
        <el-table-column
          label="用户角色">
          <template slot-scope="scope">
            <p>{{scope.row.roleName}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="createUserName"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="status"
          label="用户状态">
          <template slot-scope="scope">
            <p v-if="scope.row.status == 1">启用</p>
            <p v-else>禁用</p>
          </template>
        </el-table-column>
        <el-table-column
          width="250px"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button  type="primary" size="mini" @click="routerGo(scope.row)">编辑</el-button>
            <el-button  type="primary" size="mini" @click="modifyStatus(scope.row)" v-if="scope.row.status == 1">停用</el-button>
            <el-button  type="primary" size="mini" @click="modifyStatus(scope.row)" v-else>启用</el-button>
            <el-button  type="success" size="mini" @click="resetPassword(scope.row)">重置密码</el-button>
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


    </div>

    <modify-password :data="dialog.data" v-if="dialog.formVisible" @is_show="is_show"></modify-password>


  </div>
</template>
<script>

  import { sysuserPage,sysuserEnableDisable } from '@/api/authority'

  import {reconstruction} from "@/utils/tree";
  import ModifyPassword from "./ModifyPassword";

  export default {
    components: {ModifyPassword},
    data(){
      return {
        page:{
          current:1,
          pageSize:10,
          pages:1,
          total:100,
          records:[
            {
              "bankCardCode":"",
              "bankCardName":"",
              "bankCardNo":"",
              "companyCode":"",
              "companyName":"",
              "createDate":null,
              "delFlag":0,
              "email":"",
              "id":1,
              "idCard":"",
              "loginName":"admin",
              "mobile":"",
              "password":"123456",
              "realName":"admin-r",
              "remark":"",
              "updateDate":null
            },
          ],
        },
        management:{
          loginName:'',
          realName:'',
          status:null,
        },
        dialog:{
          formVisible:false,
          data:null,
        },
      }
    },
    created:function(){
      this.getUser();
    },
    methods:{
      is_show(){
        this.dialog.formVisible = false;
        this.getUser();
      },
      resetPassword(row){
        this.dialog.data = row;
        this.dialog.formVisible = true;
      },
      inquire(){
        this.getUser();
      },
      getUser(page = 1){
        let _this = this;
        let date = {
          pageNum:page,
          pageSize:10,
          loginName:_this.management.loginName,
          realName:_this.management.realName,
          status:_this.management.status,
        };
        sysuserPage(date).then(function (res) {
          if(res.data){
            _this.page = res.data;
          }
        });

      },
      handleCurrentChange(val) {
        this.management.pageNum = val;
        this.getUser(val);
      },
      routerGo(row) {
        this.$router.push({
          name:'set_user',
          query:{
            id:row.id
          }
        });
      },
      openDialog(row){

      },
      modifyStatus(row){
        var _this = this;

        sysuserEnableDisable(row.id).then(function (res) {
          _this.getUser();
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
  .add-btn{
    margin-top: 30px;
  }
  .page{
    width: auto;
  }

  .user-main{
    width: 100%;
    background: #fff;
    padding: 0 50px 50px;
  }

  .tishi{
    background:rgb(225, 243, 216);
    color:#333;
    padding: 20px 50px;
    ol{
      list-style: none;
      li{
        text-align: left;
        font-size: 14px;
      }
    }
  }
  .top-main{
    padding: 20px;
    .inquire{
      display: inline-block;
    }
  }
</style>
