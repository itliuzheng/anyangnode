<template>
  <div class="main">
    <el-dialog
               :visible.sync="dialogFormVisible"
                @open="open"
                @close="close"
               class="repeatArray"
              center>
      <div class="dialog-box dialog-textarea">
        <el-form ref="form" :model="form" :rules="formRules" label-width="100px" label-position="right">
          <el-form-item class="input-box" prop="password" label="新密码：">
            <el-input  v-model="form.password" :min="6" placeholder="请设置新密码"></el-input>
            <p>重置密码后，系统不会发短信通知员工。请将密码告知员工，确保其正常使用</p>
          </el-form-item>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="formResult">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>


  export default {
    props:['data'],
    data(){
      let _this = this;

      return {
        dialogFormVisible:true,
        formRules:{
          password:[
            { required: true,message: '密码不能为空', trigger: 'blur' },
            { min:6,message: '密码为6-20位字母、数字组合', trigger: 'blur' },
          ],
        },
        loading:false,
        form: {
          password:'',
          id:_this.data.id,
        },
      }
    },
    beforeMount(){
    },
    methods: {
      open(){

      },
      close(){
        this.$emit('is_show',false)
      },
      formResult(){
        var _this = this;

        this.$refs.form.validate((valid)=>{
          if(valid){
            _this.formAjax()
          }
        })
      },
      formAjax(data){
        var _this = this;
        _this.loading = true;
        new Promise((resolve,reject) => {
          ajax({
            url:`/sysuser/reset-password`,
            method:'post',
            data:_this.form,
          }).then(function (res) {
            _this.loading = false;
            let data = res.data;
            if(data.code == 1){
              _this.$message({
                type:'success',
                message: data.msg
              });
              _this.dialogFormVisible = false;
            }

          }).catch(error => {
            _this.loading = false;
            reject(error)
          })
        })
      },
    },
    mounted(){
    }
  }
</script>
<style lang="scss">

  .dialog-box .el-select{
    width: 100%;
  }
  .dialog-textarea{
    textarea{
      padding-bottom: 20px;
    }
    .input-textarea{
      p{
        height: 0;
        line-height: 2;
        text-align: right;
        font-size: 12px;
        span{
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
  }
  .no-output{
    font-size: 14px;
    color: #1986f6;
  }
</style>
<style scoped lang="scss">
  $blue : #409EFF;
  .red{
    color: #e93546;
    font-size: 12px;
  }
  .height-10{
    height: 10px;
  }
  .width-200{
    width: 200px;
  }
  .risk-desc{
    span{
      padding: 0 20px 0 10px;
    }

  }
</style>
