webpackJsonp([4],{"1T1I":function(t,e){},AaXs:function(t,e,a){"use strict";e.c=function(t){return new l.a(function(e,a){Object(n.a)({url:"/api/game_type/page",method:"post",data:t}).then(function(t){1==t.code?e(t):a(t)}).catch(function(t){a(t)})})},e.a=function(t){return new l.a(function(e,a){Object(n.a)({url:"/api/game_type/create",method:"post",data:t}).then(function(t){1==t.code?e(t):a(t)}).catch(function(t){a(t)})})},e.d=function(t){return new l.a(function(e,a){Object(n.a)({url:"/api/game_type/update",method:"post",data:t}).then(function(t){1==t.code?e(t):a(t)}).catch(function(t){a(t)})})},e.b=function(t){return new l.a(function(e,a){Object(n.a)({url:"/api/game_type/delete?id="+t,method:"post"}).then(function(t){1==t.code?e(t):a(t)}).catch(function(t){a(t)})})};var o=a("rVsN"),l=a.n(o),n=a("0zyd")},FHmP:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("rVsN"),l=a.n(o),n=a("0zyd");a("oTFt"),a("9GaO"),a("v/ij");var i=a("aiqZ"),r=a("AaXs"),s={props:["formData"],components:{quillEditor:i.quillEditor},name:"dialogGame",data:function(){return{gameTypeList:[],formRules:{name:[{required:!0,message:"不能为空",trigger:"blur"}]},dialogFormVisibleDetail:!0,editorOption:{theme:"bubble",placeholder:"every contentï¼support html",modules:{toolbar:[["bold","italic","underline","strike"],[{list:"ordered"},{list:"bullet"}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["link","image"],["clean"]]}}}},created:function(){this.$store.getters.game_type.length?this.gameTypeList=this.$store.getters.game_type:this.getGameType()},methods:{reset:function(){this.$refs.formData.resetFields()},dialogClose:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.$emit("is_show",t)},getGameType:function(){var t=this;Object(r.c)({pageSize:30,pageNum:1}).then(function(e){t.$store.dispatch("insertType",e.data.records),t.$set(t,"gameTypeList",e.data.records)})},confirmData:function(){var t=this;this.$refs.formData.validate(function(e){var a;e&&(a=t.formData,new l.a(function(t,e){Object(n.a)({url:"/api/game_detail/create",method:"post",data:a}).then(function(a){1==a.code?t(a):e(a)}).catch(function(t){e(t)})})).then(function(e){t.$message({type:"success",message:e.msg}),t.dialogClose("success")})})},updateData:function(){var t=this;this.$refs.formData.validate(function(e){var a;e&&(a=t.formData,new l.a(function(t,e){Object(n.a)({url:"/api/game_detail/update",method:"post",data:a}).then(function(a){1==a.code?t(a):e(a)}).catch(function(t){e(t)})})).then(function(e){t.$message({type:"success",message:e.msg}),t.dialogClose("success")})})}},computed:{}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{visible:t.dialogFormVisibleDetail,"close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogFormVisibleDetail=e},close:t.dialogClose}},[a("el-form",{ref:"formData",attrs:{model:t.formData,rules:t.formRules,"label-width":"150px","label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"类型名称",prop:"name"}},[a("el-input",{attrs:{placeholder:""},model:{value:t.formData.name,callback:function(e){t.$set(t.formData,"name",e)},expression:"formData.name"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"游戏描述",prop:"desc"}},[a("el-input",{attrs:{type:"textarea",placeholder:""},model:{value:t.formData.desc,callback:function(e){t.$set(t.formData,"desc",e)},expression:"formData.desc"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"所属分类",prop:"type"}},[a("el-select",{model:{value:t.formData.type,callback:function(e){t.$set(t.formData,"type",e)},expression:"formData.type"}},t._l(t.gameTypeList,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1)],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"所属系列",prop:"catena"}},[a("el-input",{attrs:{placeholder:""},model:{value:t.formData.catena,callback:function(e){t.$set(t.formData,"catena",e)},expression:"formData.catena"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"标签",prop:"tagStr"}},[a("el-input",{attrs:{placeholder:""},model:{value:t.formData.tagStr,callback:function(e){t.$set(t.formData,"tagStr",e)},expression:"formData.tagStr"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"游戏大小",prop:"sizeStr"}},[a("el-input",{attrs:{placeholder:""},model:{value:t.formData.sizeStr,callback:function(e){t.$set(t.formData,"sizeStr",e)},expression:"formData.sizeStr"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"版本介绍",prop:"versionStr"}},[a("el-input",{attrs:{placeholder:""},model:{value:t.formData.versionStr,callback:function(e){t.$set(t.formData,"versionStr",e)},expression:"formData.versionStr"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"下载信息",prop:"downloadStr"}},[a("quill-editor",{attrs:{config:t.editorOption},model:{value:t.formData.downloadStr,callback:function(e){t.$set(t.formData,"downloadStr",e)},expression:"formData.downloadStr"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[t.formData.id?a("el-button",{staticClass:"el-button",attrs:{type:"primary"},on:{click:t.updateData}},[t._v("修改")]):a("el-button",{staticClass:"el-button",attrs:{type:"primary"},on:{click:t.confirmData}},[t._v("添加")]),t._v(" "),a("el-button",{staticClass:"el-button",attrs:{type:""},on:{click:function(e){t.dialogFormVisibleDetail=!1}}},[t._v("取消")])],1)],1)],1)],1)},staticRenderFns:[]};var u={name:"gameIndex",components:{DialogGame:a("C7Lr")(s,c,!1,function(t){a("TAi5"),a("1T1I")},"data-v-48c1c4eb",null).exports},data:function(){return{topModel:{name:null,typeId:null,pageNum:1,pageSize:30},tableData:{records:[]},dialogInitDetail:[],dialogFormVisibleDetail:!1,axiosId:null,formData:{},gameTypeList:[]}},created:function(){this.getData(),this.$store.getters.game_type.length?this.gameTypeList=this.$store.getters.game_type:this.getGameType()},methods:{getGameType:function(){var t=this;Object(r.c)({pageSize:30,pageNum:1}).then(function(e){t.$store.dispatch("insertType",e.data.records),t.$set(t,"gameTypeList",e.data.records)})},handleCurrentChange:function(t){this.topModel.pageNum=t,this.getData()},addCreate:function(){this.formData={},this.dialogFormVisibleDetail=!0},inquire:function(){this.getData()},clear:function(){this.topModel={name:null,typeId:null},this.getData()},getData:function(){var t,e=this;(t=this.topModel,new l.a(function(e,a){Object(n.a)({url:"/api/game_detail/page",method:"post",data:t}).then(function(t){1==t.code?e(t):a(t)}).catch(function(t){a(t)})})).then(function(t){e.tableData=t.data})},modify:function(t){this.formData=t,this.dialogFormVisibleDetail=!0},deleteBtn:function(t){var e=this;this.$confirm("确定要删除吗?","消息提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){var a;(a=t.id,new l.a(function(t,e){Object(n.a)({url:"/api/game_detail/delete?id="+a,method:"post"}).then(function(a){1==a.code?t(a):e(a)}).catch(function(t){e(t)})})).then(function(t){e.$message({type:"success",message:t.msg}),e.dialogFormVisibleDetail=!1,e.getData()})}).catch(function(){})},isShow:function(t){this.dialogFormVisibleDetail=!1,t&&this.getData()}}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("el-form",{ref:"customerTopModel",attrs:{inline:!0,"label-position":"left"},model:{value:t.topModel,callback:function(e){t.topModel=e},expression:"topModel"}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"游戏名称:"}},[a("el-input",{attrs:{size:"small"},model:{value:t.topModel.name,callback:function(e){t.$set(t.topModel,"name",e)},expression:"topModel.name"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"游戏分类:"}},[a("el-select",{attrs:{size:"small"},model:{value:t.topModel.typeId,callback:function(e){t.$set(t.topModel,"typeId",e)},expression:"topModel.typeId"}},t._l(t.gameTypeList,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}),1)],1)],1),t._v(" "),a("el-col",{staticClass:"text-right",attrs:{span:8}},[a("el-form-item",{attrs:{label:""}},[a("el-button",{staticClass:"el-button",attrs:{size:"small",type:"primary"},on:{click:t.inquire}},[t._v("查询")]),t._v(" "),a("el-button",{staticClass:"el-button",attrs:{size:"small",type:""},on:{click:t.clear}},[t._v("清空")]),t._v(" "),a("el-button",{staticClass:"el-button",attrs:{size:"small",type:"danger"},on:{click:t.addCreate}},[t._v("新增")])],1)],1)],1)],1),t._v(" "),a("el-table",{attrs:{data:t.tableData.records,border:""}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"50px"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"游戏名称",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"typeName",label:"所属分类",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"catena",label:"所属系列",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tagStr",label:"标签",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sizeStr",label:"游戏大小",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createDate",label:"创建时间",align:"center",width:"150px"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",fixed:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.modify(e.row)}}},[t._v("修改\n        ")]),t._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.deleteBtn(e.row)}}},[t._v("删除\n        ")])]}}])})],1),t._v(" "),0!=t.tableData.total?a("div",{staticClass:"page-box"},[a("el-pagination",{attrs:{"current-page":t.tableData.current,"page-size":t.tableData.pageSize,layout:"total, prev,pager, next, jumper",total:t.tableData.total},on:{"current-change":t.handleCurrentChange}})],1):t._e(),t._v(" "),t.dialogFormVisibleDetail?a("dialog-game",{attrs:{formData:t.formData},on:{is_show:t.isShow}}):t._e()],1)},staticRenderFns:[]};var p=a("C7Lr")(u,m,!1,function(t){a("YsA5")},"data-v-1f2dfef8",null);e.default=p.exports},TAi5:function(t,e){},YsA5:function(t,e){}});