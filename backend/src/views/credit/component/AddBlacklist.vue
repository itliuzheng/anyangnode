<template>
  <div class="main">
    <el-dialog title="授信变更记录"
               :visible.sync="dialogFormVisible"
                @open="open"
                @close="close"
               class="repeatArray"
              center>

      <div>
        <el-table
          class="history-table"
        :data="page.records"
          height="180"
          @selection-change="handleSelectionChange"
        width="100%">
          <el-table-column prop="operateUser" label="操作人">
          </el-table-column>
          <el-table-column prop="createDate" label="操作时间">
          </el-table-column>
          <el-table-column  label="操作类型">
            <template slot-scope="scope">
              <div class="blue inlineBlock">
                <p v-if="scope.row.operate == 1">变更额度</p>
                <p v-else-if="scope.row.operate == 2">解冻额度</p>
                <p v-else-if="scope.row.operate == 3">冻结额度</p>
                <p v-else-if="scope.row.operate == 4">终止额度</p>
                <p v-else-if="scope.row.operate == 5">恢复额度</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="changeAccount" label="备注">
            <template slot-scope="scope">
              <div class="blue inlineBlock">
                <p v-if="scope.row.operate == 1">{{scope.row.remark}}</p>
                <p v-else-if="scope.row.operate == 2">{{scope.row.changeAccount}}</p>
                <p v-else-if="scope.row.operate == 3">{{scope.row.changeAccount}}</p>
                <p v-else-if="scope.row.operate == 4">{{scope.row.availableAccount}}</p>
                <p v-else-if="scope.row.operate == 5"></p>
              </div>
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
      </div>

      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

  export default {
    props:['api','data'],
    data(){
      let id = this.data.id;
      return {
        dialogFormVisible:true,
        id:id,
        page:{
          "current":1,
          "pageSize":10,
          "pages":1,
          "records":[
          ],
          "total":0
        },
        multipleSelection:null
      }
    },
    beforeMount(){
      this.getInit(this.id);
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      getInit(id){
        var _this = this;
        let url = `${_this.api}account/history`
      },
      open(){

      },
      close(){
        this.$emit('is_show',false)
      },
      handleCurrentChange(val) {
        this.getInit(this.id,val);
      },
    },
    mounted(){
    }
  }
</script>
<style lang="scss">

</style>
<style scoped lang="scss">
  $blue : #409EFF;
  .blue{
    color: $blue;
  }
  .repeatArray{
    .el-input{
      width: 150px;
    }
  }

  .zd-icon{
    font-size: 24px;
    color: #f95353;
    cursor: pointer;
  }
  .zd-icon-blue{
    color: #57a3f3;
  }
  .svg-box{
    display: inline-block;
    vertical-align: sub;
  }
</style>

