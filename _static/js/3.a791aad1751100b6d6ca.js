webpackJsonp([3],{"//R8":function(e,t){},"8+Bj":function(e,t,a){"use strict";t.a={INDUSTRYLIST:[{value:"农、林、牧、渔业",label:"农、林、牧、渔业"},{value:"采矿业",label:"采矿业"},{value:"制造业",label:"制造业"},{value:"电力、热力、燃气及水生产和供应业",label:"电力、热力、燃气及水生产和供应业 "},{value:"建筑业",label:"建筑业"},{value:"批发和零售业",label:"批发和零售业"},{value:"交通运输、仓储和邮政业",label:"交通运输、仓储和邮政业"},{value:"住宿和餐饮业",label:"住宿和餐饮业"},{value:"信息传输、软件和信息技术服务业",label:"信息传输、软件和信息技术服务业"},{value:"金融业",label:"金融业"},{value:"房地产业",label:"房地产业"},{value:"租赁和商务服务业",label:"租赁和商务服务业"},{value:"科学研究和技术服务业",label:"科学研究和技术服务业"},{value:"水利、环境和公共设施管理业",label:"水利、环境和公共设施管理业"},{value:"居民服务、修理和其他服务业",label:"居民服务、修理和其他服务业"},{value:"教育",label:"教育"},{value:"卫生和社会工作",label:"卫生和社会工作"},{value:"文化、体育和娱乐业",label:"文化、体育和娱乐业"},{value:"公共管理、社会保障和社会组织",label:"公共管理、社会保障和社会组织"},{value:"国际组织",label:"国际组织"}],ENTERPRISESIZE:[{label:"大型",value:1},{label:"中型",value:2},{label:"小型",value:3}],CREDITMONTH:[{label:"6",value:6},{label:"12",value:12},{label:"24",value:24}],BANNERTYPE:[{label:"网站首页",value:0},{label:"单机游戏",value:1},{label:"高速下载通道",value:2},{label:"游戏工具",value:3},{label:"教程资讯",value:4},{label:"网站公告",value:5}]}},WaqV:function(e,t){},Wypk:function(e,t){},bxFq:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("rVsN"),n=a.n(l),o=a("0zyd");a("oTFt"),a("9GaO"),a("v/ij");var i=a("aiqZ"),r=a("P9l9"),s=a("8+Bj"),u={props:["formData"],components:{quillEditor:i.quillEditor},name:"dialogBannerAdd",data:function(){return{bannerList:s.a.BANNERTYPE,formRules:{name:[{required:!0,message:"不能为空",trigger:"blur"}],url:[{required:!0,message:"不能为空",trigger:"blur"}],typeId:[{required:!0,message:"不能为空",trigger:"change"}]},fileList:[],dialogFormVisibleDetail:!0,editorOption:{theme:"bubble",placeholder:"every contentï¼support html",modules:{toolbar:[["bold","italic","underline","strike"],[{list:"ordered"},{list:"bullet"}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["link","image"],["clean"]]}}}},created:function(){},methods:{uploadHttp:function(e){var t=this,a=new FormData;a.append("img",e.file),Object(r.c)(a).then(function(e){t.$message({type:"success",message:"上传成功"}),t.formData.imgUrl=e.data})},reset:function(){this.$refs.formData.resetFields()},dialogClose:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.$emit("is_show",e)},confirmData:function(){var e=this;this.$refs.formData.validate(function(t){var a;t&&(a=e.formData,new n.a(function(e,t){Object(o.a)({url:"/api/banner/create",method:"post",data:a}).then(function(a){1==a.code?e(a):t(a)}).catch(function(e){t(e)})})).then(function(t){e.$message({type:"success",message:t.msg}),e.dialogClose("success")})})},updateData:function(){var e=this;this.$refs.formData.validate(function(t){var a;t&&(a=e.formData,new n.a(function(e,t){Object(o.a)({url:"/api/banner/update",method:"post",data:a}).then(function(a){1==a.code?e(a):t(a)}).catch(function(e){t(e)})})).then(function(t){e.$message({type:"success",message:t.msg}),e.dialogClose("success")})})}},computed:{}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.dialogFormVisibleDetail,"close-on-click-modal":!1},on:{"update:visible":function(t){e.dialogFormVisibleDetail=t},close:e.dialogClose}},[a("el-form",{ref:"formData",attrs:{model:e.formData,rules:e.formRules,"label-width":"150px","label-position":"right"}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"标题",prop:"name"}},[a("el-input",{attrs:{placeholder:""},model:{value:e.formData.name,callback:function(t){e.$set(e.formData,"name",t)},expression:"formData.name"}})],1)],1),e._v(" "),a("el-col",{staticClass:"text-left",attrs:{span:24}},[a("el-form-item",{attrs:{label:"banner",prop:"imgUrl"}},[a("el-upload",{attrs:{action:"",name:"imgUrl","show-file-list":!0,limit:1,"file-list":e.fileList,"list-type":"picture","http-request":e.uploadHttp}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"链接",prop:"url"}},[a("el-input",{attrs:{placeholder:""},model:{value:e.formData.url,callback:function(t){e.$set(e.formData,"url",t)},expression:"formData.url"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"banner所在位置",prop:"typeId"}},[a("el-select",{attrs:{multiple:""},model:{value:e.formData.typeId,callback:function(t){e.$set(e.formData,"typeId",t)},expression:"formData.typeId"}},e._l(e.bannerList,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}),1)],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"排序",prop:"sort"}},[a("el-input",{attrs:{placeholder:""},model:{value:e.formData.sort,callback:function(t){e.$set(e.formData,"sort",t)},expression:"formData.sort"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[e.formData.id?a("el-button",{staticClass:"el-button",attrs:{type:"primary"},on:{click:e.updateData}},[e._v("修改")]):a("el-button",{staticClass:"el-button",attrs:{type:"primary"},on:{click:e.confirmData}},[e._v("添加")]),e._v(" "),a("el-button",{staticClass:"el-button",attrs:{type:""},on:{click:function(t){e.dialogFormVisibleDetail=!1}}},[e._v("取消")])],1)],1)],1)],1)},staticRenderFns:[]};var m={name:"gameIndex",components:{DialogBannerAdd:a("C7Lr")(u,c,!1,function(e){a("Wypk"),a("WaqV")},"data-v-feed142e",null).exports},data:function(){return{topModel:{name:null,typeId:null,pageNum:1,pageSize:30},tableData:{records:[]},dialogInitDetail:[],dialogFormVisibleDetail:!1,axiosId:null,formData:{},gameTypeList:[]}},created:function(){this.getData()},methods:{_formatterBanner:function(e,t,a,l){return e.typeId.map(function(e){return s.a.BANNERTYPE.find(function(t){return t.value==e}).label}).join(",")},handleCurrentChange:function(e){this.topModel.pageNum=e,this.getData()},addCreate:function(){this.formData={typeId:[]},this.dialogFormVisibleDetail=!0},inquire:function(){this.getData()},clear:function(){this.topModel={name:null,typeId:null},this.getData()},getData:function(){var e,t=this;(e=this.topModel,new n.a(function(t,a){Object(o.a)({url:"/api/banner/page",method:"post",data:e}).then(function(e){1==e.code?t(e):a(e)}).catch(function(e){a(e)})})).then(function(e){t.tableData=e.data})},modify:function(e){this.formData=e,this.dialogFormVisibleDetail=!0},deleteBtn:function(e){var t=this;this.$confirm("确定要删除吗?","消息提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){var a;(a=e.id,new n.a(function(e,t){Object(o.a)({url:"/api/banner/delete?id="+a,method:"post"}).then(function(a){1==a.code?e(a):t(a)}).catch(function(e){t(e)})})).then(function(e){t.$message({type:"success",message:e.msg}),t.dialogFormVisibleDetail=!1,t.getData()})}).catch(function(){})},isShow:function(e){this.dialogFormVisibleDetail=!1,e&&this.getData()}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-form",{ref:"customerTopModel",attrs:{inline:!0,"label-position":"left"},model:{value:e.topModel,callback:function(t){e.topModel=t},expression:"topModel"}},[a("el-row",[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"标题:"}},[a("el-input",{attrs:{size:"small"},model:{value:e.topModel.name,callback:function(t){e.$set(e.topModel,"name",t)},expression:"topModel.name"}})],1)],1),e._v(" "),a("el-col",{staticClass:"text-right",attrs:{span:8}},[a("el-form-item",{attrs:{label:""}},[a("el-button",{staticClass:"el-button",attrs:{size:"small",type:"primary"},on:{click:e.inquire}},[e._v("查询")]),e._v(" "),a("el-button",{staticClass:"el-button",attrs:{size:"small",type:""},on:{click:e.clear}},[e._v("清空")]),e._v(" "),a("el-button",{staticClass:"el-button",attrs:{size:"small",type:"danger"},on:{click:e.addCreate}},[e._v("新增")])],1)],1)],1)],1),e._v(" "),a("el-table",{attrs:{data:e.tableData.records,border:""}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"50px"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"名称",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"url",label:"链接","show-overflow-tooltip":!0,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"typeId",label:"banner所在位置",align:"center",formatter:e._formatterBanner}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.modify(t.row)}}},[e._v("修改\n        ")]),e._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.deleteBtn(t.row)}}},[e._v("删除\n        ")])]}}])})],1),e._v(" "),0!=e.tableData.total?a("div",{staticClass:"page-box"},[a("el-pagination",{attrs:{"current-page":e.tableData.current,"page-size":e.tableData.pageSize,layout:"total, prev,pager, next, jumper",total:e.tableData.total},on:{"current-change":e.handleCurrentChange}})],1):e._e(),e._v(" "),e.dialogFormVisibleDetail?a("dialog-banner-add",{attrs:{formData:e.formData},on:{is_show:e.isShow}}):e._e()],1)},staticRenderFns:[]};var p=a("C7Lr")(m,d,!1,function(e){a("//R8")},"data-v-225ad44c",null);t.default=p.exports}});