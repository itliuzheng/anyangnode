<template>
  <div class="set-user-info">
      <el-form class="info-box" :model="form" ref="form">
        <el-form-item label="用户姓名" :label-width="formLabelWidth"
              prop="realName"
              :rules="{
                required: true, message: '用户姓名不能为空', trigger: 'blur'
              }">
          <el-input v-model="form.realName" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth"
              prop="loginName" v-if="type == 'add'"
              :rules="{
                required: true, message: '用户名不能为空', trigger: 'blur'
              }">
          <el-input v-model="form.loginName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码设置" :label-width="formLabelWidth"
              prop="password"
              :rules="{
                required: true, message: '密码设置不能为空', trigger: 'blur'
              }" v-if="type == 'add'">
          <el-input v-model="form.password" placeholder="请输入6位数字密码(管理员设置)"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth"
              prop="email"
              :rules="{
                required: true, message: '邮箱不能为空', trigger: 'blur'
              }">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth"
              prop="mobile"
              :rules="{
                required: true, message: '手机号不能为空', trigger: 'blur'
              }">
          <el-input v-model="form.mobile" placeholder="请输入用户手机号"></el-input>
        </el-form-item>
        <el-form-item label="权限设置" :label-width="formLabelWidth" v-if="type == 'update'">
          <el-button @click="openDialog">立即选择</el-button>
        </el-form-item>
      </el-form>

    <div>
      <el-button @click="cancleBtn">取消</el-button>
      <el-button type="primary" :loading="loading" @click="setBtn">确定</el-button>
    </div>



      <el-dialog title="权限设置" :visible.sync="dialogFormVisible" @close="clear">
        <el-transfer v-model="rules" :data="permissionForm"
                     :button-texts="['撤销角色', '添加角色']"
                     @change="handleChange" :titles="transTitle"></el-transfer>
      </el-dialog>
  </div>
</template>
<script>

  import { sysuserId, sysuserType } from '@/api/authority'

  export default {
    data(){
      return {
        api:'/sysuser/',
        id:'',
        form: {
          name: '',
          description: '',
          state: '1',
          id: '',
          trees: [],
        },
        permissionForm: [],
        rules: [],
        dialogFormVisible: false,
        loading: false,
        formLabelWidth: '120px',
        transTitle:['角色列表','已有角色'],
        type:'add'
      }
    },
    beforeMount(){
      let id = this.$route.query.id;
      this.id = id;
      if(!id){
        this.$route.meta.title = '添加新用户详情';
        this.type = 'add';
      }else{
        this.$route.meta.title = '修改用户详情';
        this.type = 'update';
        this.getInit(id);
      }
    },
    methods:{
      getInit(id){
        var _this = this;
        sysuserId(id).then(function (res) {
          _this.form = res.data;
        });

      },
      cancleBtn(){
        this.$router.push({
          name:'set',
          query:{
            name:'user'
          }
        });
      },
      setBtn(){
        let _this = this;

        _this.loading = true;
        this.$refs.form.validate((valid)=>{
          if(valid){
            _this.formAjax()
          }else{
            _this.loading = false;
          }
        })
      },
      formAjax(){
        var _this = this;
        sysuserType(_this.form,_this.type).then(function (res) {
          _this.loading = false;
          _this.$message({
            type:'success',
            message: res.msg
          });
          _this.cancleBtn();
        },function (err) {
            _this.loading = false;
        })
      },
      openDialog(row){
        let _this = this;
        this.getRolesAll();
        if(this.id){
          this.getRoles(this.id);
        }
        _this.dialogFormVisible = true ;
      },
      getRolesAll(){
        let _this = this;
        new Promise((resolve,reject)=>{
          ajax({
            url:`/role/all`,
            method:'get'
          }).then(function(res){
            var data = res.data;
            if(data.code == 1){
              data.data.forEach((json,index)=>{
                _this.permissionForm.push({
                  label: json.name,
                  key: json.id,
                  disabled: json.status == 1?false:true
                })
              })

              resolve()
            }else{
              reject();
            }
          }).catch(error => {
              reject();
          })
        })
      },
      getRoles(id){
        let _this = this;
        new Promise((resolve,reject)=>{
          ajax({
            url:`/sysuser/roles?uid=${id}`,
            method:'get',
          }).then(function(res){
            var data = res.data;
            if(data.code == 1){
              data.data.forEach((json,index)=>{
                _this.rules.push(json.id);
              })

            }else{
              _this.$message.error(data.msg);
            }
          }).catch(error => {
              reject(error);
          })
        })
      },
      handleChange(value, direction, movedKeys){
        this.sysuserAuthorize(value);
      },
      sysuserAuthorize(value){
        let _this = this;
        let rids = value.join(',');

        new Promise((resolve,reject)=>{
          ajax({
            url:`/sysuser/authorize?uid=${_this.id}&rids=${rids}`,
            method:'post',
          })
            .then(function(res){
            var data = res.data;
            if(data.code == 1){
              _this.$message({
                type: 'success',
                message: '修改成功'
              });
              resolve()
            }else{
              _this.$message({
                type: 'error',
                message: '修改失败'
              });
              _this.dialogFormVisible = false;
            }
          }).catch(error => {
              reject();
          })
        })
      },
      clear(){
        this.permissionForm = [];
        this.rules = [];
      },
    },
  }
</script>
<style lang="scss">
  .set-user-info{
    .el-transfer-panel{
      text-align: left;
    }
  }
</style>
<style lang="scss" scoped>
  $blue : #409EFF;
  .set-user-info{
  }
  .info-box{
    width: 500px;
    padding-top: 30px;
    padding-bottom: 20px;
  }
</style>
