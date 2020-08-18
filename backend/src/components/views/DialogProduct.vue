<template>
  <div>
    <div class="product-box">
      <el-form :model="dialogForm" :rules="rules" ref="ruleForm" label-position="right" label-width="150px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item> 
        <el-form-item label="商品描述" prop="description">
          <el-input v-model="dialogForm.description"></el-input>
        </el-form-item> 
        <el-form-item label="价格(元)" prop="price">
          <el-input v-model="dialogForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品状态"  prop="status" 
        class="radioStyle">
          <el-row>
            <el-radio-group v-model="dialogForm.status" style="width: 100%;">
              <el-col :span="12">
                <el-radio :label="1">上架</el-radio>
              </el-col>
              <el-col :span="12">
                <el-radio :label="0">下架</el-radio>
              </el-col>
            </el-radio-group>
          </el-row>
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
  import {getProductCustomer, getProductAdd, getProductUpdate} from '@/api/api';
  export default {
    name: "dialogProduct",
    props:{
      dialogForm:{
        type:Object,
        default:{
          name: '',
          status: '',
          name: '',
          price: '',
          imgUrl: '',
          description: ''
        }
      }
    },
    data() {
      return {
        disabled: false,
        optionName: [],
        optionType: [
          {
            value: 2,
            label: '保理'
          }
        ],
        rules: {
          name: [{message: '请输入商品名称', required: true, trigger: 'blur'}],
          description: [{message: '请输入商品描述', required: true, trigger: 'blur'}],
          price: [{message: '请输入价格', required: true, trigger: 'blur'}],
          status: [{message: '请选择商品状态', required: true, trigger: 'change'}]
        }
      }
    },
    
    created () {
      if (this.init.modify) {
        this.disabled = true
      }
    },
    methods: {
      close(){
        this.$refs["ruleForm"].clearValidate()
        this.$emit('closeDialog', false)
      },
      confirmBtn(){
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            if(this.dialogForm.modify){
              getProductUpdate(this.dialogForm).then((res) => {
                this.$emit('closeDialog', true)
              })
            }else{
              getProductAdd(this.dialogForm).then((res) => {
                this.$emit('closeDialog', true)
              })
            }

          }
        })
      }
    }

  }
</script>

<style lang="less" scoped>

  .product-box{
    padding-right: 150px;
    /deep/.radioStyle .el-form-item__error{
      padding-left: 70px;
    }
  }
  
</style>
