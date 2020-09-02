<template>

  <el-dialog :visible.sync="dialogFormVisibleDetail"
             :close-on-click-modal="false"
             @close="dialogClose">

    <el-form :model="formData" ref="formData" :rules="formRules"
             label-width="150px"
             label-position="right">
      <el-row>
        <el-col :span="24">
          <el-form-item label="标题" prop="name">
            <el-input v-model="formData.name" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="text-left">
          <el-form-item label="banner" prop="imgUrl">
            <el-upload
              action=""
              name="imgUrl"
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
          <el-form-item label="链接" prop="url">
            <el-input v-model="formData.url" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="banner所在位置" prop="typeId">
            <el-select v-model="formData.typeId" multiple >
              <el-option v-for="(item,index) in bannerList" :key="index"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="排序" prop="sort">
            <el-input v-model="formData.sort" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-button class="el-button" type="primary" v-if="!formData.id" @click="confirmData">添加</el-button>
          <el-button class="el-button" type="primary" v-else @click="updateData">修改</el-button>
          <el-button class="el-button" type="" @click="dialogFormVisibleDetail = false">取消</el-button>
        </el-col>
      </el-row>
    </el-form>

  </el-dialog>
</template>

<script>
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'

	import { quillEditor } from 'vue-quill-editor'
  import { postAdd,postUpdate } from '../../../api/banner'
  import { postUpload } from '@/api/api'
  import industry from '../../../utils/industry'

  export default {
    props:['formData'],
		components: {
			quillEditor
		},
    name: "dialogBannerAdd",
    data() {
      return {
        bannerList:industry.BANNERTYPE,
        formRules:{
          name:[{required: true, message: `不能为空`, trigger: 'blur'}],
          url:[{required: true, message: `不能为空`, trigger:'blur'}],
          typeId:[{required: true, message: `不能为空`, trigger: 'change'}]
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
    },
    methods: {
      uploadHttp(data) {
        let formData = new FormData();
        console.log(data);
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
      dialogClose(messgae = false){
        this.$emit('is_show',messgae);
      },
      confirmData() {
        this.$refs.formData.validate((valid)=>{
          if(valid){
            postAdd(this.formData).then(res =>{
              this.$message({
                type:'success',
                message:res.msg
              });
              this.dialogClose('success');
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
              this.dialogClose('success');
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
