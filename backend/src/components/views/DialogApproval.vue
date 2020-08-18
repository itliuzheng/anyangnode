<template>
  <div>
    <div class="approval-box">
      <el-form :model="dialogForm" label-position="right" label-width="150px">
        <el-form-item label="" label-width="50px">
          <el-row>
            <el-radio-group v-model="dialogForm.status" style="width: 100%;">
              <el-col :span="12" v-for="item in groupList" :key="item.value">
                <el-radio :label="item.value" >{{item.label}}</el-radio>
              </el-col>
            </el-radio-group>
          </el-row>
        </el-form-item>
        <el-form-item label="处理意见">
          <el-input v-model="dialogForm.remark"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirmBtn">提 交</el-button>
      <el-button @click="close">取 消</el-button>
    </span>
  </div>
</template>

<script>
  export default {
    name: "dialogApproval",
    props:{
      init:{
        type:Object,
      },
      groupList:{
        type:Array,
      }
    },
    data() {
      return {
        dialogForm :{},
      }
    },
    methods: {
      close(){
        console.log('closeDialog');
        this.$emit('closeDialog',false)
      },
      confirmBtn(){
        let data = Object.assign(this.dialogForm,{
          numberCode : this.init.numberCode,
          id: this.init.id
        })
        this.init.callback(data);
      }
    }

  }
</script>

<style scoped>

  .approval-box{
    padding-right: 150px;
  }
</style>
