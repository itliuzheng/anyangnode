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
        <el-form-item label="网站网址" prop="websiteUrl">
          <el-input v-model="formData.websiteUrl" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <p class="desc">请以http:// 或 https://开头，<span class="red">后面不要带 / </span>，如：http://www.baidu.com</p>
      </el-col>
      <el-col :span="24" class="text-left">
        <el-form-item label="网站标志(logo)" prop="logoUrl">
          <el-upload
            action=""
            name="logoUrl"
            :show-file-list="true"
            :limit="1"
            :file-list="fileList"
            list-type="picture"
            :http-request="uploadHttp"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="首页标题(Title)" prop="title">
          <el-input v-model="formData.title" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="网站关键字(keywords)" prop="keywords">
          <el-input v-model="formData.keywords" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="网站描述(Description)" prop="description">
          <el-input type="textarea" v-model="formData.description" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="内页联系方式">
          <el-input v-model="formData.insideContact" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="联系电话">
          <el-input v-model="formData.mobile" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="上次修改时间">
          <p class="text-left">{{formData.modifyDate}}</p>
        </el-form-item>
      </el-col>
    </el-row>
    <el-button @click="postForm">提交</el-button>
  </el-form>
</template>

<script>
  import {postUpload,postAdd,getInfo} from '@/api/api'

  export default {
    name: "website",
    data() {
      return {
        formData: {
          "name": '',
          "websiteUrl": '',
          "logoUrl": '',
          "title": '',
          "keywords": '',
          "description": '',
          "insideContact": '',
          "mobile": '',
          "modifyDate": '',
        },
        fileList:[

        ],
        formRules: {
          name: [
            {required: true, message: `网站名称不能为空`, trigger: 'blur'}
          ],
          websiteUrl: [
            {required: true, message: `网站网址不能为空`, trigger: 'blur'}
          ],
          title: [
            {required: true, message: `首页标题不能为空`, trigger: 'blur'}
          ],
          keywords: [
            {required: true, message: `网站关键字不能为空`, trigger: 'blur'}
          ],
          description: [
            {required: true, message: `网站描述不能为空`, trigger: 'blur'}
          ],
          logoUrl: [
            {required: true, message: `logo不能为空`, trigger: 'change'}
          ],
        },
      }
    },
    created(){
      this.getInit();
    },
    methods: {
      uploadHttp(data) {
        let formData = new FormData();
        console.log(data);
        formData.append('img', data.file);

        console.log(formData.get('img'));

        postUpload(formData)
          .then(res => {
            this.$message({
              type: 'success',
              message: '上传成功'
            });
            this.formData.logoUrl = res.data;
          })

      },
      getInit(){
        getInfo()
          .then(res=>{
            if(res.data){
              this.formData = res.data;
              this.$set(this.fileList,'0',{
                name:'logo.png',
                url:res.data.logoUrl
              })
            }
          })
      },
      postForm(){
        postAdd(this.formData)
          .then(res=>{
            this.$message({
              type: 'success',
              message: '修改成功'
            });
          },err=>{
            this.$message({
              type: 'error',
              message: err
            });
          })
      }

    }
  }
</script>

<style scoped lang="scss">
  @import '@/styles/variables.scss';
  .form-data {
    width: 1000px;
    margin: 0 auto;
  }
  .desc{
    line-height: 40px;
    font-size: 12px;
    color: $gray;
  }
</style>
