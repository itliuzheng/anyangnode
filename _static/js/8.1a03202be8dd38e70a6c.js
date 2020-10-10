webpackJsonp([8],{"+MTQ":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("oTFt"),a("9GaO"),a("v/ij");var o=a("aiqZ"),r=a("Buh+"),l=a("P9l9"),n={name:"addTutorial",components:{quillEditor:o.quillEditor},data:function(){return{tutorialId:null,formData:{title:null,imgUrl:null,tag:null,description:null,content:null,sort:null},formRules:{title:[{required:!0,message:"不能为空",trigger:"blur"}]},fileList:[],dialogFormVisibleDetail:!0,editorOption:{theme:"bubble",placeholder:"every contentï¼support html",modules:{toolbar:[["bold","italic","underline","strike"],[{list:"ordered"},{list:"bullet"}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["link","image"],["clean"]]}}}},created:function(){this.$route.query.id&&(this.tutorialId=this.$route.query.id,this.getById())},methods:{uploadHttp:function(t){var e=this,a=new FormData;a.append("img",t.file),Object(l.c)(a).then(function(t){e.$message({type:"success",message:"上传成功"}),e.formData.imgUrl=t.data})},reset:function(){this.$refs.formData.resetFields()},getById:function(){var t=this;Object(r.a)(this.tutorialId).then(function(e){t.formData=e.data,t.$set(t.fileList,"0",{name:e.data.title+".png",url:e.data.imgUrl})})},confirmData:function(){var t=this;this.$refs.formData.validate(function(e){e&&Object(r.b)(t.formData).then(function(e){t.$message({type:"success",message:e.msg}),t.$router.push({name:"gameTutorial"})})})},updateData:function(){var t=this;this.$refs.formData.validate(function(e){e&&Object(r.e)(t.formData).then(function(e){t.$message({type:"success",message:e.msg}),t.$router.push({name:"gameTutorial"})})})}},computed:{}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"add-box"},[a("el-form",{ref:"formData",attrs:{model:t.formData,rules:t.formRules,"label-width":"150px","label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"标题",prop:"title"}},[a("el-input",{attrs:{placeholder:""},model:{value:t.formData.title,callback:function(e){t.$set(t.formData,"title",e)},expression:"formData.title"}})],1)],1),t._v(" "),a("el-col",{staticClass:"text-left",attrs:{span:24}},[a("el-form-item",{attrs:{label:"封面图片",prop:"imgUrl"}},[a("el-upload",{attrs:{action:"",name:"imgUrl","show-file-list":!0,limit:1,"file-list":t.fileList,"list-type":"picture","http-request":t.uploadHttp}},[a("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")])],1)],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"标签",prop:"tag"}},[a("el-input",{attrs:{type:"textarea",placeholder:""},model:{value:t.formData.tag,callback:function(e){t.$set(t.formData,"tag",e)},expression:"formData.tag"}}),t._v(" "),a("p",{staticClass:"text-left form-desc"},[t._v("用 | 分割标签 ")])],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"描述",prop:"description"}},[a("el-input",{attrs:{type:"textarea",placeholder:""},model:{value:t.formData.description,callback:function(e){t.$set(t.formData,"description",e)},expression:"formData.description"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"内容",prop:"content"}},[a("quill-editor",{attrs:{config:t.editorOption},model:{value:t.formData.content,callback:function(e){t.$set(t.formData,"content",e)},expression:"formData.content"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"排序",prop:"sort"}},[a("el-input",{attrs:{placeholder:""},model:{value:t.formData.sort,callback:function(e){t.$set(t.formData,"sort",e)},expression:"formData.sort"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[t.tutorialId?a("el-button",{staticClass:"el-button",attrs:{type:"primary"},on:{click:t.updateData}},[t._v("修改")]):a("el-button",{staticClass:"el-button",attrs:{type:"primary"},on:{click:t.confirmData}},[t._v("添加")]),t._v(" "),a("el-button",{staticClass:"el-button",attrs:{type:""},on:{click:t.reset}},[t._v("清空")])],1)],1)],1)],1)},staticRenderFns:[]};var s=a("C7Lr")(n,i,!1,function(t){a("GxiM"),a("kPNK")},"data-v-bef38918",null);e.default=s.exports},"Buh+":function(t,e,a){"use strict";e.a=function(t){return new r.a(function(e,a){Object(l.a)({url:"/api/game_tutorial/"+t,method:"get"}).then(function(t){1==t.code?e(t):a(t)}).catch(function(t){a(t)})})},e.d=function(t){return new r.a(function(e,a){Object(l.a)({url:"/api/game_tutorial/page",method:"post",data:t}).then(function(t){1==t.code?e(t):a(t)}).catch(function(t){a(t)})})},e.b=function(t){return new r.a(function(e,a){Object(l.a)({url:"/api/game_tutorial/create",method:"post",data:t}).then(function(t){1==t.code?e(t):a(t)}).catch(function(t){a(t)})})},e.e=function(t){return new r.a(function(e,a){Object(l.a)({url:"/api/game_tutorial/update",method:"post",data:t}).then(function(t){1==t.code?e(t):a(t)}).catch(function(t){a(t)})})},e.c=function(t){return new r.a(function(e,a){Object(l.a)({url:"/api/game_tutorial/delete?id="+t,method:"post"}).then(function(t){1==t.code?e(t):a(t)}).catch(function(t){a(t)})})};var o=a("rVsN"),r=a.n(o),l=a("0zyd")},GxiM:function(t,e){},kPNK:function(t,e){}});