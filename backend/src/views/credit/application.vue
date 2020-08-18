<template>
  <div>
    <form-detail ref="formDetail" :init="addInit"></form-detail>
  </div>
</template>

<script>
  import { postAdd , getCustomersList } from '@/api/creditApply'
  import FormDetail from '@/components/views/FormDetail'
  import OPTIONS from '@/utils/industry'

  export default {
    name: "application",
    components: {
      FormDetail
    },
    data() {
      let init = [
        {name: 'companyName',label: '预授信企业', col: 24,  type: 'SelectCompanyName', optionItem: OPTIONS.CREDITCOMPANY  },
        // {name: 'socialCreditCode',label: '统一社会信用代码', col: 24, type: 'socialCreditCode',  },
        {name: 'creditAmount',label: '预授信额度（万）', col: 24, type: 'input',  },
        {name: 'creditMonth',label: '授信期限（月）', col: 24, type: 'select', optionItem: OPTIONS.CREDITMONTH  },
        {name: 'remark',label: '处理意见', col: 24, type: 'input',  }
      ];
      let buttonList = [
        {
          name: '提交',
          type: 'primary',
          callback:()=>{
            this.confirmData();
          }
        }
      ];

      return {
        addInit: {
          list: init,
          buttonList: buttonList
        },
      }
    },
    beforeMount(){
      this.getList();
    },
    methods: {
      getList() {
        getCustomersList().then(res =>{
          let data = res.data.map(val=>{
            let json = {
              label:val.companyName,
              value:val.socialCreditCode,
            }
            return json
          });

          let list = this.addInit.list.map( val =>{
            if(val.name == 'companyName'){
              val.optionItem = data;
            }
            return val
          });
          this.$set(this.addInit,'list',list)
        });
      },
      confirmData() {
        let data = this.$refs.formDetail.formData;
        this.$refs.formDetail.$refs.formData.validate((valid)=>{
          if(valid){
            this.messageSuccess(data);
          }else{
            this.messageError();
          }
        })
      },
      goNext() {
        this.$router.push({name:'creditApproval'})
      },
      messageSuccess(data){

        this.$confirm('确定要提交吗?', '消息提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        })
          .then(() => {
            this.promiseData(data)
          })
          .catch(() => {

          });
      },
      messageError() {
        this.$alert('信息填写不完善无法提交！', '消息提示', {
          confirmButtonText: '确定',
          type: 'error'
        }).then(() => {

          })
      },
      promiseData(data){
        postAdd(data).then(res =>{
          this.$message({
            type:'success',
            message:res.msg
          })
          this.goNext()
        });
      },
    }

  }
</script>

<style scoped>

</style>
