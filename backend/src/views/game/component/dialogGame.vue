<template>

  <el-dialog :visible.sync="dialogFormVisibleDetail"
             :close-on-click-modal="false"
             @close="dialogClose">

    <el-form :model="formData" ref="formData" :rules="formRules"
             label-width="150px"
             label-position="right">
      <el-row>
        <el-col :span="24">
          <el-form-item label="类型名称" prop="name">
            <el-input v-model="formData.name" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="游戏描述" prop="desc">
            <el-input type="textarea" v-model="formData.desc" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="所属分类" prop="type">
            <el-select v-model="formData.type">
              <el-option v-for="optionItem in gameTypeList"
                         :label="optionItem.name"
                         :value="optionItem.id"
                         :key="optionItem.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="所属系列" prop="catena">
            <el-input v-model="formData.catena" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="标签" prop="tagStr">
            <el-input v-model="formData.tagStr" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="游戏大小" prop="sizeStr">
            <el-input v-model="formData.sizeStr" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="版本介绍" prop="versionStr">
            <el-input v-model="formData.versionStr" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="下载信息" prop="downloadStr">
              <quill-editor v-model="formData.downloadStr"
                            :config="editorOption">
              </quill-editor>
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
  import { postPage,postAdd,postUpdate,postDelete } from '@/api/gameDetail'
  import { postPage as getGameTypePage } from '@/api/game'

  export default {
    props:['formData'],
		components: {
			quillEditor
		},
    name: "dialogGame",
    data() {
      return {
        gameTypeList:[],
        formRules:{
          name:[{required: true, message: `不能为空`, trigger: 'blur'}]
        },
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
      if(this.$store.getters.game_type.length){
        this.gameTypeList = this.$store.getters.game_type;
      }else{
        this.getGameType();
      }
    },
    methods: {
      reset(){
        this.$refs.formData.resetFields()
      },
      dialogClose(messgae = false){
        this.$emit('is_show',messgae);
      },
      getGameType() {
        getGameTypePage({
          pageSize:30,
          pageNum:1
        })
          .then(res=>{
            this.$store.dispatch('insertType',res.data.records);
            this.$set(this,'gameTypeList',res.data.records)
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
