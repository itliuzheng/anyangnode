<template>

  <el-form :model="formData" class="form-data" ref="formData" :rules="formRules"
           label-width="150px"
           label-position="right">
    <el-row>
      <el-col :span="24">
        <el-form-item label="网站名称" prop="name">
          <el-input v-model="formData.name" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="网站网址" prop="name">
          <el-input v-model="formData.name" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <p style="line-height: 40px;">请以http:// 或 https://开头，后面不要带 / ，如：http://www.baidu.com</p>
      </el-col>
      <el-col :span="24">
        <el-form-item label="网站标志(logo)" prop="url_front">
          <el-upload
            action=""
            name="url_front"
            :show-file-list="true"
            :http-request="uploadHttp"
            >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="首页标题(Title)" prop="name">
          <el-input v-model="formData.name" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="网站关键字(keywords)" prop="name">
          <el-input v-model="formData.name" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="网站描述(Description)" prop="name">
          <el-input type="textarea" v-model="formData.name" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="内页联系方式" prop="name">
          <el-input v-model="formData.name" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="网站底部HTML代码" prop="name">
          <el-input type="textarea" v-model="formData.name" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="联系电话" prop="name">
          <el-input v-model="formData.name" placeholder=""></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-button>提交</el-button>
  </el-form>
</template>

<script>
  import { postUpload } from '@/api/api'
  export default {
    name: "agentInformation",
    data(){
      let name = '代理人';
      return {
        name:name,
        formData:{
          type:'',
          name:'',
          creditCode:'',
          url_front:'',
          url_end:'',
          info:'',
        },
        formRules:{
          type:[
            {required:true, message:`${name}归属地不能为空`,trigger:'change'}
          ],
          name:[
            {required:true, message:`${name}名称不能为空`,trigger:'blur'}
          ],
          creditCode:[
            {required:true, message:`${name}身份证号不能为空`,trigger:'blur'}
          ],
          url_front:[
            {required:true, message:'身份证不能为空',trigger:'change'}
          ],
          url_end:[
            {required:true, message:'身份证不能为空',trigger:'change'}
          ],
        },
      }
    },
    methods:{
      uploadHttp(data){
        let formData = new FormData();
        formData.append('img', data.file);

        postUpload(formData)
          .then(res=>{
            this.$message({
              type: 'success',
              message: '上传成功'
            });
          })

      },
    }
  }
</script>

<style scoped lang="scss">
  .form-data{
    width: 1000px;
    margin: 0 auto;
  }
</style>
