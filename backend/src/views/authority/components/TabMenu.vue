<template>
  <div class="tab-main">
    <div class="add-btn">
      <el-button class="el-button--primary el-button" @click="parentClick">添加</el-button>
    </div>

    <div class="tree">
    <el-tree
      :data="tree"
      node-key="id"
      @check-change="nodeClick"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent">
    </el-tree>
    </div>


    <el-dialog title="菜单添加" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth" >
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="资源识别码" :label-width="formLabelWidth" >
          <el-input v-model="form.code" ></el-input>
        </el-form-item>
        <el-form-item label="菜单种类" :label-width="formLabelWidth">
          <el-input v-model="form.type" ></el-input>
        </el-form-item>
        <el-form-item label="链接地址" :label-width="formLabelWidth" >
          <el-input v-model="form.targetUrl" ></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" >
          <el-input v-model="form.description" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addResources">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑" :visible.sync="dialogFormVisibleModify">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth" >
          <el-input v-model="form.name" ></el-input>
        </el-form-item>
        <el-form-item label="资源识别码" :label-width="formLabelWidth" >
          <el-input v-model="form.code" ></el-input>
        </el-form-item>
        <el-form-item label="菜单种类" :label-width="formLabelWidth">
          <el-input v-model="form.type" ></el-input>
        </el-form-item>
        <el-form-item label="链接地址" :label-width="formLabelWidth" >
          <el-input v-model="form.targetUrl" ></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" >
          <el-input v-model="form.description" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyResources">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>

  import { resourcesAll,resourcesAdd,resourcesUpdate,resourcesDelete } from '@/api/authority'
  import { reconstruction} from "@/utils/tree";

  export default {
    created(){
      this.getUrl();
    },
    data(){

        // const data = [{
        //   code: "business_management:*",
        //   description: "业务管理",
        //   id: 1,
        //   name: "业务管理",
        //   parentId: 0,
        //   targetUrl: "/business_management/*",
        //   type: "1"
        // }]

      return {
        tree:[],
        dialogFormVisible:false,
        dialogFormVisibleModify:false,
        form: {
          name: '',
          label:'',
          code: '',
          description: '',
          type: '2',
          id: '',
          targetUrl: '',
          parentId:'',
          data:'',
          children:[]
        },
        formLabelWidth: '120px'
      }
    },
    methods:{
      getUrl(){
        var _this = this;

        resourcesAll().then(function (res) {
          let data = res.data;
          _this.tree = reconstruction(data);
        });

      },
      addUrl(data){
        var _this = this;
        resourcesAdd(data).then(function (res) {
          _this.getUrl();
        });

      },
      modifyUrl(data){

        var _this = this;
        resourcesUpdate(data).then(function (res) {
          _this.dialogFormVisibleModify = false;
          _this.form = {};
          _this.getUrl();
        });

      },
      removeUrl(id){
        var _this = this;

        resourcesDelete(id).then(function (res) {
          _this.getUrl();
        });
      },
      parentClick(){
        this.dialogFormVisible = true;
        this.form.parentId = 0;

      },
      append(data) {
        this.dialogFormVisible = true;
        this.form.parentId = data.id;
      },
      modify(data) {
        this.dialogFormVisibleModify = true;
        this.form.parentId = data.id;
      },
      addResources(){
        this.form.label = this.form.name+'-----'+this.form.targetUrl;
        let data = this.form;

        this.addUrl(data);
        this.form = {};
        this.dialogFormVisible = false;

        // this.getUrl();
      },
      modifyResources(){
        this.form.label = this.form.name+'-----'+this.form.targetUrl;
        let data = this.form;

        this.modifyUrl(data);


        // this.getUrl();
      },

      remove(node, data) {
        let id = data.id;
        this.removeUrl(id);
        // const parent = node.parent;
        // const children = parent.data.children || parent.data;
        // const index = children.findIndex(d => d.id === data.id);
        // children.splice(index, 1);
      },
      renderContent(h, { node, data, store }) {
        return (<span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加</el-button>
              <el-button size="mini" type="text" on-click={ () => this.modify(data) }>修改</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
            </span>
          </span>);
      },
      nodeClick(data){
      }
    },
  }
</script>
<style lang="scss">
  .tree{
    width: 600px;
    margin: 0 auto;
    .custom-tree-node{
      -ms-flex: 1;
      flex: 1;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-pack: justify;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
</style>
<style lang="scss" scoped>
  $blue : #409EFF;
  .color-red{
    color: #f95353;
  }
  .add-btn{
    margin: 30px 0;
  }
  .tab-main{
    .tree{
      width: 100%;
      background: #fff;
      padding: 30px;
    }
  }

</style>
