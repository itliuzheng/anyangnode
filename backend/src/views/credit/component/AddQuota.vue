<template>
  <div class="main">
    <el-dialog :title="dialogForm.label"
               :visible.sync="dialogFormVisible"
                @open="open"
                @close="close"
               class="repeatArray"
              center>
      <el-form :model="dialogForm" ref="dialogForms"
               label-position="right"
               label-width="120px">

        <el-form-item label="" prop="operation" v-if="dialogForm.status == CHANGEACCOUNT[0].status"
          :rules="{
            required: true, message: '此项不能为空', trigger: 'change'
          }">
          <el-radio v-model="dialogForm.operation" label="ADD">增加+</el-radio>
          <el-radio v-model="dialogForm.operation" label="SUB">减少-</el-radio>
        </el-form-item>
        <el-form-item :label="dialogForm.itemTitle+'(元):'" prop="account">
          <el-input v-model.number="dialogForm.account" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="postForm">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

  import { postChangeAccount } from '@/api/creditApply'
  import { CHANGEACCOUNT } from '@/utils/changeAccount'

  export default {
    props:['dialogForm'],
    data(){
      // let id = this.data.id;


      console.log(this.dialogForm);
      let date = {}

      //1-额度变更, 2-解冻额度,3-冻结额度,4-终止额度,5-恢复额度",
      // if(this.data.title == '额度变更'){
      //   date.statusStr = 1;
      // }else if(this.data.title == '解冻额度'){
      //   date.statusStr = 2;
      // }else if(this.data.title == '冻结额度'){
      //   date.statusStr = 3;
      // }


      return {
        CHANGEACCOUNT:CHANGEACCOUNT,
        dialogFormVisible:true,
        // dialogForm: date,
        formLabelWidth: '180px',
      }
    },
    beforeMount(){
    },
    methods: {
      open(){

      },
      close(boolean = false){
        this.$refs.dialogForms.resetFields();
        this.$emit('is_show',boolean)
      },
      postForm(){
        var _this = this;
        this.$refs.dialogForms.validate((value)=>{
          if(value){
            postChangeAccount(this.dialogForm)
              .then( res => {
                this.$message.success(res.data)
                this.close(true)
              })
          }
        })
      },
    },
    mounted(){
    }
  }
</script>
<style lang="scss">

</style>
<style scoped lang="scss">
  $blue : #409EFF;
  .blue{
    color: $blue;
  }
  .repeatArray{
  }

  .zd-icon{
    font-size: 24px;
    color: #f95353;
    cursor: pointer;
  }
  .zd-icon-blue{
    color: #57a3f3;
  }
  .svg-box{
    display: inline-block;
    vertical-align: sub;
  }
</style>
