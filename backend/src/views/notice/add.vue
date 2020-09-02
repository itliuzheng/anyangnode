<template>
  <div class="add-box">
    <el-form :model="formData" ref="formData" :rules="formRules"
             label-width="150px"
             label-position="right">
      <el-row>
        <el-col :span="24">
          <el-form-item label="标题" prop="title">
            <el-input v-model="formData.title" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="text-left">
          <el-form-item label="是否置顶" prop="isTop">
            <el-switch v-model="formData.isTop"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" v-model="formData.description" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="内容" prop="content">
            <quill-editor v-model="formData.content"
                          :config="editorOption">
            </quill-editor>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-button class="el-button" type="primary" v-if="!noticeId" @click="confirmData">添加</el-button>
          <el-button class="el-button" type="primary" v-else @click="updateData">修改</el-button>
          <el-button class="el-button" type=""  @click="reset">清空</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import {quillEditor} from 'vue-quill-editor'
  import { getById ,postPage, postAdd, postUpdate, postDelete} from '../../api/notice'
  import { postUpload } from '@/api/api'

  export default {
    name: "addTutorial",
    components: {
      quillEditor
    },
    data() {
      return {
        noticeId:null,
        formData:{
          title:null,
          isTop:false,
          description:null,
          content:null,
        },
        formRules:{
          title:[{required: true, message: `不能为空`, trigger:'blur'}]
        },
        fileList:[],
        dialogFormVisibleDetail:true,
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
    created(){
      if(this.$route.query.id){
        this.noticeId = this.$route.query.id;
        this.getById();
      }
    },
    methods: {
      uploadHttp(data) {
        let formData = new FormData();
        formData.append('img', data.file);
        postUpload(formData)
          .then(res => {
            this.$message({
              type: 'success',
              message: '上传成功'
            });
            this.formData.imgUrl = res.data;
          })

      },
      reset(){
        this.$refs.formData.resetFields()
      },
      getById(){
        getById(this.noticeId)
          .then(res=>{
            this.formData = res.data;
            this.$set(this.fileList,'0',{
              name:`${res.data.title}.png`,
              url:res.data.imgUrl
            })
          })
      },
      confirmData() {
        this.$refs.formData.validate((valid)=>{
          if(valid){
            postAdd(this.formData).then(res =>{
              this.$message({
                type:'success',
                message:res.msg
              });

              this.$router.push({name:'notice'})
            });
          }
        })
      },
      updateData() {
        this.$refs.formData.validate((valid)=>{
          if(valid){
            postUpdate(this.formData).then(res =>{
              this.$message({
                type:'success',
                message:res.msg
              });
              this.$router.push({name:'notice'})
            });
          }
        })
      },
    },
    computed:{

    }
  }
</script>

<style scoped lang="scss">

  .form-desc{
    font-size: 12px;
    color: #999;
  }
  .add-box{
    background: #fff;
    padding: 20px 20px 120px 20px;
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
  /*
  .ql-toolbar.ql-snow+.ql-container.ql-snow{
    border-top: 1px solid #ccc;
  }
  .ql-toolbar.ql-snow{
    position: fixed;
    width: calc(100% - 250);
    height: 120px;
    background: #fff;
    z-index: 999;
    bottom: 0;
    left: 250px;
  }*/
</style>
