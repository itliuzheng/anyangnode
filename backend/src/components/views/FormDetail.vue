<template>
  <div class="app-container">
    <el-form :model="formData" ref="formData" :rules="formRules"
             label-width="150px"
             label-position="right">
      <el-row>

        <el-col :span="item.col" v-for="item in formItem" :key="item.name">
          <template v-if="!item.disabled">
            <input type="hidden" name="id" v-model="formData.id">
            <el-form-item :label="`${item.label}:`" :prop="item.name" v-if="item.type == 'input'">
              <el-input :disabled="item.disabled"
                        v-model="formData[item.name]"
                        :placeholder="item.placeholder"></el-input>
            </el-form-item>
            <el-form-item :label="`${item.label}:`" :prop="item.name"  v-else-if="item.type == 'select'"  >
              <el-select :disabled="item.disabled"
                         v-model="formData[item.name]"
                         :placeholder="item.placeholder">
                <el-option :label="optionItem.label" :value="optionItem.value" :key="optionItem.value" v-for="optionItem in item.optionItem"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="`${item.label}:`" :prop="item.name"  v-else-if="item.type == 'address'"  >
              <el-select v-model="formData[item.name]"
                         :placeholder="item.placeholder"
                         v-if="item.address == 'province'"
                         @change="addressProvince"
                         :disabled="item.disabled"
              >
                <el-option :label="optionItem.label" :value="optionItem.value" :key="optionItem.value" v-for="optionItem in item.optionItem"></el-option>
              </el-select>
              <el-select v-model="formData[item.name]"
                         :placeholder="item.placeholder"
                         v-else-if="item.address == 'city'"
                         :disabled="item.disabled"
              >
                <el-option :label="optionItem.label" :value="optionItem.value" :key="optionItem.value" v-for="optionItem in item.optionItem"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="`${item.label}:`" :prop="item.name"  v-else-if="item.type == 'textarea'"  >
                <el-input :disabled="item.disabled"
                          type="textarea"
                        v-model="formData[item.name]"
                        :placeholder="item.placeholder"></el-input>
            </el-form-item>
            <el-form-item :label="`${item.label}:`" :prop="item.name"  v-else-if="item.type == 'editor'"  >

              <quill-editor v-model="formData[item.name]"
                            :config="editorOption"
                            :disabled="item.disabled">
              </quill-editor>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item :label="`${item.label}:`" :prop="item.name">
              <p class="form-desc text-left" v-if="item.type == 'address' && item.name == 'province'">{{_formatProvince}}</p>
              <p class="form-desc text-left" v-else-if="item.type == 'address' && item.name == 'city'">{{_formatCity}}</p>
              <p class="form-desc text-left" v-else>{{formData[item.name]}}</p>
            </el-form-item>
          </template>
        </el-col>

        <el-col :span="24">
          <el-button class="el-button" :type="item.type" @click="item.callback" v-for="(item,index) in init.buttonList" :key="index">{{item.name}}</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'

	import { quillEditor } from 'vue-quill-editor'
  import { CUSTOMERPOST } from '@/api/api'
  import CITY from '@/utils/city'
  import OPTIONS from '@/utils/industry'
  import { initRules , initForm } from '@/utils/formDetail'

  export default {
    props:{
      init:{
        type:Object,
        default:{
          list:[],
          buttonList: []
        }
      }
    },
		components: {
			quillEditor
		},
    name: "customerDetail",
    data() {
      let formData = this.init.list.map(function (value) {
        let obj = {};
        obj = Object.assign(obj,value);
        obj.col = Number(obj.col);
        let reg = /\([^\)]*\)/g;

        if(value.type === 'input'){
          obj.placeholder =  '请输入' + value.label.replace(reg,'');
        }else{
          obj.placeholder =  '请选择' + value.label.replace(reg,'');
        }
        return value
      });
      let formRules = initRules(formData);

      return {
        formRules:formRules,
        formItem: formData,
        formData: initForm(formData),
				editorOption:{
				  theme: 'bubble',
				  placeholder: "every contentï¼support html",
				  modules: {
					toolbar: [
					  ['bold', 'italic', 'underline', 'strike'],
					  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
					  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
					  [{ 'color': [] }, { 'background': [] }],
					  [{ 'font': [] }],
					  [{ 'align': [] }],
					  ['link', 'image'],
					  ['clean']
					]
				  }
				},
      }
    },
    watch:{
      init:{
        handler(old,newValue){
          let formData = newValue.list.map(function (value) {
            let obj = {};
            obj = Object.assign(obj,value);
            obj.col = Number(obj.col);
            let reg = /\([^\)]*\)/g;

            if(value.type === 'input'){
              obj.placeholder =  '请输入' + value.label.replace(reg,'');
            }else{
              obj.placeholder =  '请选择' + value.label.replace(reg,'');
            }
            return value
          });
          this.formRules = initRules(formData);
          this.formItem = formData;
          this.formData = initForm(formData);
        },
        deep:true
      }
    },
    methods: {
      reset(){
        this.$refs.formData.resetFields()
      },
      socialCreditCodeChange(_value){
        let arr = this.formItem.find( val =>{
          return val.name == 'companyName'
        })
        let socialCreditCode = arr.optionItem.find( val =>{
          return val.label == _value
        })
        this.formData.socialCreditCode = socialCreditCode.value
      },
      addressProvince(_value){
        let _index = 0;
        let _name = null;
        this.formItem.forEach((value,index)=>{
          if(value.address && value.address == 'city'){
            _name = value.name;
            _index = index;
          }
        });
        this.$set(this.formData,_name,null);
        let obj = {};
        CITY.forEach((value)=>{
          if(value.code == _value){
            obj = value;
          }
        });
        let arr = [];
        let _map =  obj.children;
        arr = _map.map(function (val) {
          let obj = {};
          obj.value = val.code;
          obj.label = val.name;
          return obj;
        });

        this.$set(this.formItem[_index],'optionItem',arr);

      }
    },
    computed:{
      _formatProvince(){
        let province = CITY.find(val=>{return val.code == this.formData.province})
        let name = province && province.name;
        return name || '中国'
      },
      _formatCity(){
        let province = CITY.find(val=>{return val.code == this.formData.province})
        let city = province && province.children.find(val=>{return val.code == this.formData.city})
        let name = city && city.name;
        return name || '中国'
      },
      _formatCompanyScale(){
        let name = OPTIONS.ENTERPRISESIZE.find(val=>{return val.value == this.formData.companyScale})
        return  name.label
      },
    }

  }
</script>


<style scoped lang="scss">

  .form-desc{
    color: #666;
  }
</style>
<style lang="scss">
  .ql-container{
    min-height: 100px;
  }
  .ql-snow .ql-picker-label{
    line-height: 1;
    vertical-align: top;
  }
</style>
