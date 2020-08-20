<template>
  <div class="app-container">
    <el-form v-model="topModel" ref="customerTopModel" :inline="true" label-position="left">
      <el-row>
        <el-col :span="8">
          <el-form-item label="商品名称:">
            <el-input v-model="topModel.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态:">
            <el-select v-model="topModel.status">
              <el-option label="上架" :value="1"></el-option>
              <el-option label="下架" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button class="el-button el-button--primary" @click="inquire">查询</el-button>
          <el-button class="el-button" type="" @click="clear">清空</el-button>
          <el-button class="el-button el-button--primary" @click="added">新增</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" border>
      <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
      <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="description" label="商品描述" align="center" width="150px"></el-table-column>
      <el-table-column prop="price" label="价格(元)" align="center"></el-table-column>
      <el-table-column prop="date" label="商品状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">下架</span>
          <span v-else-if="scope.row.status == 1">上架</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button class="" type="text" size="small" v-if="scope.row.status == 0"
                     @click="enable(scope.row)">上架
          </el-button>
          <el-button class="" type="text" size="small" v-if="scope.row.status == 1"
                     @click="stopUsing(scope.row)">下架
          </el-button>
          <el-button class="" type="text" size="small"
                     @click="modify(scope.row)">修改
          </el-button>
          <el-button class="" type="text" size="small"
                     @click="deleteBtn(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page" v-if="page.total != 0">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-size="page.pageSize"
        layout="total, prev,pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogFormVisibleProduct" >
      <dialog-product :dialogForm="dialogInitProduct" @closeDialog="closeDialog"></dialog-product>
    </el-dialog>

  </div>
</template>

<script>
  // import { getProduct, getProductDelete, getProductUpdate } from '@/api/api'
  import DialogProduct from "@/components/views/DialogProduct"
  export default {
    name: "creditProgress",
    components: {
      DialogProduct
    },
    data() {
      return {
        page:{
          current:1,
          pageSize:10,
          pageNum:1,
          total:0,
          records:[
          ],
        },
        topModel: {
          name: null,
          status: null,
        },
        tableData: [],
        dialogInitProduct: {},
        dialogFormVisibleProduct:false
      }
    },
    created () {
      this.getProductFn()
    },
    methods: {
      handleCurrentChange (val) {
        this.getProductFn(val)
      },
      getProductFn(page = 1){
        let _this = this;
        let date = {
          pageNum: page,
          pageSize: 10,
          name: _this.topModel.name,
          status: _this.topModel.status
        }
        getProduct(date).then((res) => {
          this.tableData = res.data.records
          if(res.data){
            _this.page = res.data
          }
        });

      },
      closeDialog(data) {
        if (!data) {
          this.dialogFormVisibleProduct = false
        } else { // 新增or修改
          this.getProductFn()
          this.dialogFormVisibleProduct = false
        }
      },
      inquire() {
        this.getProductFn()
      },
      clear() {
        this.topModel = {
          name: null,
          status: null
        }
        this.getProductFn()
      },
      getData(data) {
        console.log(data)
      },
      added(row) {
        let obj = {}
        this.dialogInitProduct = obj
        this.dialogFormVisibleProduct = true
      },
      getProductStatusFn (productId,status) {
        let obj = {}
        obj._id = productId;
        obj.status = status;
        getProductUpdate(obj).then((res) => {
          this.$message.success(res.msg)
          this.getProductFn()
        })
      },
      enable (row) {
        this.$confirm('确定要上架该产品吗？', '提示', {
          type: 'warning',
          center: true
        }).then(() => {
          this.getProductStatusFn(row._id,1)
        }).catch(() => {

        })
      },
      stopUsing (row) {
        this.$confirm('确定要下架该产品吗？', '提示', {
          type: 'warning',
          center: true
        }).then(() => {
          this.getProductStatusFn(row._id,0)
        }).catch(() => {

        })
      },
      modify (row) {
        let obj = Object.assign({},row)
        obj.modify = true;
        this.dialogInitProduct = obj
        this.dialogFormVisibleProduct = true
      },
      deleteBtn (row) {
        this.$confirm('确定要删除该产品吗？', '提示', {
          type: 'warning',
          center: true
        }).then(() => {
          getProductDelete(row._id).then((res) => {
            this.$message.success(res.msg)
            this.getProductFn()
          })
        }).catch(() => {

        })
      }
    }

  }
</script>

<style scoped>

</style>
