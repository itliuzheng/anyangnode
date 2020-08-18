<template>
  <div>
    <form-detail ref="formDetail" v-if="routerType == 'modify'" :init="lookInit" :key="lookInit.key"></form-detail>
    <form-detail ref="formDetail" v-else-if="routerType == 'look'" :init="lookInit" :key="lookInit.key"></form-detail>
    <form-detail ref="formDetail" v-else :init="addInit"></form-detail>
  </div>
</template>

<script>
  import { postAdd , getId, postUpdate, postDeleteId } from '@/api/customer'
  import FormDetail from '@/components/views/FormDetail'
  import OPTIONS from '@/utils/industry'
  import CITY from '@/utils/city'

  var CITY_provinces = CITY.map(function (value) {
    let obj = {};
    obj.label = value.name;
    obj.value = value.code;
    return obj
  });
  export default {
    name: "detailIndex",
    components: {
      FormDetail
    },
    data() {
      let routerType = this.$route.query.type;
      let init = [
        {name: 'companyName', type: 'input', label: '企业名称', col: 12},
        {name: 'companySimpleName', type: 'input', label: '企业简称', col: 12},
        {name: 'creditCode', type: 'input', label: '统一社会信用代码', col: 12},
        {name: 'legalPerson', type: 'input', label: '法定代表人', col: 12},
        {name: 'registeredCapital', type: 'input', label: '注册资本(万元)', col: 12},
        {name: 'contactPerson', type: 'input', label: '公司联系人', col: 12},
        {name: 'companyAddress', type: 'input', label: '办公地址', col: 12},
        {name: 'companyPhone', type: 'input', label: '公司联系电话', col: 12},
        {name: 'companyEmail', type: 'input', label: '公司邮箱', col: 12},
        {name: 'companyWebsite', type: 'input', label: '公司网站', col: 12},
        {name: 'annualSales', type: 'input', label: '年销售额(万元)', col: 12},
        {name: 'companyScale', type: 'select', optionItem: OPTIONS.ENTERPRISESIZE, label: '企业规模', col: 12},
        {name: 'hostAccountManager', type: 'input', label: '主办客户经理', col: 12},
        {name: 'assisitantAccountManager', type: 'input', label: '协办客户经理', col: 12},
        {name: 'province', type: 'address', optionItem: CITY_provinces, address: 'province', label: '所属省份', col: 12},
        {name: 'city', type: 'address', optionItem: [], label: '所属城市', address: 'city', col: 12},
        {name: 'industryCategory', type: 'select', optionItem: OPTIONS.INDUSTRYLIST, label: '行业类别', col: 12},
        {name: 'industryInvolved', type: 'input', label: '所属行业', col: 12},
        {name: 'registerAddress', type: 'input', label: '注册地址', col: 12},
        {name: 'primaryBusiness', type: 'input', label: '主营内容', col: 12},
        {name: 'companyProfile', type: 'input', label: '企业简介', col: 24},
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
          name: '返回',
          type: '',
          callback:()=>{
            this.goBack();
          }
        },
      ];

      let lookInit = [];
      let lookButtonList = [
          {
            name: '提交',
            type: 'primary',
            callback:()=>{
              this.confirmData('update');
            }
          },
          {
            name: '返回',
            type: '',
            callback:()=>{
              this.goBack();
            }
          },
        ];

      lookInit = init.map(function (value) {
        let obj = value;

        if (routerType == 'look') {
          obj.disabled = true;
        }

        obj.model = null;
        return obj
      });
      if (routerType == 'look') {
        lookButtonList = [
          {
            name: '返回',
            type: '',
            callback:()=>{
              this.goBack();
            }
          },
        ]
      }


      return {
        routerType: routerType,
        addInit: {
          list: init,
          buttonList: buttonList
        },
        lookInit: {
          list: lookInit,
          buttonList: lookButtonList,
          key:1
        },
        detailId:null
      }
    },
    created(){
      if (this.routerType == 'look' || this.routerType == 'modify') {
        this.getDataById(this.$route.params.id)
      }

    },
    methods: {
      getDataById(id){
        getId(id)
          .then(res=>{
            this.detailId = res.id

            let result = this.lookInit.list.map(item =>{

              if (this.routerType == 'look') {
                item.disabled = true;
              }
              item.model = res[item.name]
              return item
            })

            this.$set(this.lookInit,"list",result)
            this.lookInit.key++

          })
      },
      confirmData(isUpdate = null) {
        // console.log(this.$refs.formDetail.formData);
        let data = this.$refs.formDetail.formData;
        this.$refs.formDetail.$refs.formData.validate((valid)=>{
          if(valid){
            this.messageSuccess(data,isUpdate);
          }else{
            this.messageError();
          }
        })
      },
      goBack() {
        this.$router.go(-1)
      },
      messageSuccess(data,isUpdate){

        this.$confirm('确定要提交吗?', '消息提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        })
          .then(() => {
            this.promiseData(data,isUpdate)
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
      promiseData(data,isUpdate){
        let postApi = isUpdate?postUpdate:postAdd

        if(isUpdate)data = Object.assign(data,{id:this.detailId})


        postApi(data)
          .then(res =>{
            this.$message.success(res.msg)
            this.goBack()
          })
          .catch(err =>{
            this.$message.error(err)
          });
      },
    }

  }
</script>

<style scoped>

</style>
