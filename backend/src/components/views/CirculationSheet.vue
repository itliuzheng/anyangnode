<template>
<div>
  <el-tabs v-model="activeName" @tab-click="tabCur">
    <el-tab-pane label="流转单" name="first">
      <table border="1" cellspacing="0">
        <tbody>
          <tr>
            <th colspan="2" class="bg">支付信息</th>
            <th colspan="2" class="bg">接收信息</th>
            <th colspan="2" class="bg">承诺付款信息</th>
          </tr>
          <tr>
            <th width="100px" class="bg">支付E信编号</th>
            <th width="200px" class="colorGrey">{{tableData.payNumberCode}}</th>
            <th width="100px" class="bg">接收E信编号</th>
            <th width="200px" class="colorGrey">{{tableData.receiveNumberCode}}</th>
            <th width="100px" class="bg">开立E信编号</th>
            <th width="200px" class="colorGrey">{{tableData.openNumberCode}}</th>
          </tr>
          <tr>
            <th class="bg">E信支付方</th>
            <th class="colorGrey">{{tableData.payOrgName}}</th>
            <th class="bg">E信接收方</th>
            <th class="colorGrey">{{tableData.receiveOrgName}}</th>
            <th class="bg">承诺付款方</th>
            <th class="colorGrey">{{tableData.openOrgName}}</th>
          </tr>
          <tr>
            <th class="bg">账号</th>
            <th class="colorGrey">{{tableData.payBankNumber}}</th>
            <th class="bg">账号</th>
            <th class="colorGrey">{{tableData.receiveBankNumber}}</th>
            <th class="bg">账号</th>
            <th class="colorGrey">{{tableData.openBankNumber}}</th>
          </tr>
          <tr>
            <th class="bg">开户行</th>
            <th class="colorGrey">{{tableData.receiveBankName}}</th>
            <th class="bg">开户行</th>
            <th class="colorGrey">{{tableData.payBankName}}</th>
            <th class="bg">开户行</th>
            <th class="colorGrey">{{tableData.openBankName}}</th>
          </tr>
          <tr>
            <th class="bg">纳税人识别号</th>
            <th class="colorGrey">{{tableData.payTaxpayerDiscernNumber}}</th>
            <th class="bg">纳税人识别号</th>
            <th class="colorGrey">{{tableData.receiveTaxpayerDiscernNumber}}</th>
            <th class="bg">纳税人识别号</th>
            <th class="colorGrey">{{tableData.openTaxpayerDiscernNumber}}</th>
          </tr>
          <tr>
            <th class="bg">支付日期</th>
            <th class="colorGrey">{{tableData.payDate}}</th>
            <th class="bg">接收日期</th>
            <th class="colorGrey">{{tableData.acceptDate}}</th>
            <th class="bg">承诺付款日</th>
            <th class="colorGrey">{{tableData.paymentDate}}</th>
          </tr>
          <tr>
            <th colspan="1" class="bg">立账单编号</th>
            <th colspan="3" class="colorBlue">{{tableData.tradeNumberCode}}</th>
            <th class="bg">承诺付款函编号</th>
            <th class="colorBlue">{{tableData.paymentLetterNumber}}</th>
          </tr>
          <tr>
            <th colspan="1" class="bg">币种及金额</th>
            <th colspan="3" class="colorGrey">{{tableData.amountName}}</th>
            <th colspan="2" style="padding:0">
              <tr rowspan="5">
                <td>十</td>
                <td>亿</td>
                <td>千</td>
                <td>百</td>
                <td>十</td>
                <td>万</td>
                <td>千</td>
                <td>百</td>
                <td>十</td>
                <td>元</td>
                <td>角</td>
                <td>分</td>
              </tr>
              <tr rowspan="5">
                <td>{{amountObj.milliard}}</td>
                <td>{{amountObj.billion}}</td>
                <td>{{amountObj.tenBillion}}</td>
                <td>{{amountObj.million}}</td>
                <td>{{amountObj.shiwan}}</td>
                <td>{{amountObj.tenThousand}}</td>
                <td>{{amountObj.thousand}}</td>
                <td>{{amountObj.hundred}}</td>
                <td>{{amountObj.ten}}</td>
                <td>{{amountObj.yuan}}</td>
                <td>{{amountObj.jiao}}</td>
                <td>{{amountObj.fen}}</td>
              </tr>
            </th>
          </tr>
          <tr>
            <th class="bg">支付方经办人</th>
            <th class="colorGrey">{{tableData.applyUser}}</th>
            <th class="bg">支付方审核人</th>
            <th class="colorGrey">{{tableData.approveUser}}</th>
            <th class="bg">接收方审核人</th>
            <th class="colorGrey">{{tableData.receiveApproveUser}}</th>
          </tr>
          <tr>
            <th colspan="1" height="200px" class="bg">支付方电子印章电子印章签章日期</th>
            <th colspan="2">5</th>
            <th colspan="1" class="bg">接收方电子印章<br/>电子印章签章日期</th>
            <th colspan="2">7</th>
          </tr>
        </tbody>
      </table>
    </el-tab-pane>
    <el-tab-pane label="持有记录" name="third">
      <el-table
      border
      :data="getTable"
      style="width: 100%">
      <el-table-column
        prop="companyName"
        label="持有方"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="持有金额"
        align="center">
      </el-table-column>
    </el-table>
    </el-tab-pane>
  </el-tabs>
  <!-- <div class="bottomBtn">
    <el-button v-if="tmp" @click="submitBtn" type="primary" size="medium">提交</el-button>
    <el-button @click="goBack" type="primary" size="medium">返回</el-button>
  </div> -->
  
</div>
</template>
<script>
import {geteCoreDetail, getClearing} from '@/api/api'
export default {
  props:{
    init:{
      type:Object,
    }
  },
  data () {
    return {
      url: null,
      numberCode: '',
      activeName: 'first',
      getTable: [],
      tradeNumberCode: '',
      receiveSocialCreditCode: '',
      amount: '',
      paymentDate: '',
      eType: '',
      amountObj: {
          'milliard': '',
          'billion': '',
          'tenBillion': '',
          'million': '',
          'shiwan': '',
          'tenThousand': '',
          'thousand': '',
          'hundred': '',
          'ten': '',
          'yuan': '',
          'jiao': '',
          'fen': '',
        },
      tableData: {
        tradeNumberCode: '', // 贸易立账单的编号
        amount: '', // 金额(元)
        amountName: '', // 金额中文大写
        // 支付方
        payNumberCode: '', // 支付E信编号
        payOrgName: '', // E信支付方
        payBankNumber: '', // 账号
        payBankName: '', // 开户行
        payTaxpayerDiscernNumber: '', // 支付方公司的纳税人识别号
        payDate: '', // 支付日期
        applyUser: '', // 支付方 经办人
        approveUser: '', // 支付方 审核人
        // 接收方
        receiveNumberCode: '', // 接收E信编号
        receiveOrgName: '', // E信接收方
        receiveBankNumber: '', // 接收方公司的银行账号
        receiveBankName: '', // 接收方公司的银行账号的开户行
        receiveTaxpayerDiscernNumber: '', // 接收方公司的纳税人识别号
        acceptDate: '', // 接收日期
        receiveApproveUser: '', // 接收方 审批人名称
        // 承诺付款方
        openNumberCode: '', // 开立E信编号
        openOrgName: '', // 承诺付款方
        openBankNumber: '', // 开立方公司的银行账号
        openBankName: '', // 开立方公司的银行账号的开户行
        openTaxpayerDiscernNumber: '', // 开立方公司的纳税人识别号
        paymentDate: '', // 承诺付款日期
        paymentLetterNumber: '' // 付款函编号

      },
      columns: [
        {
          prop: 'companyName',
          label: '持有方',
          align: 'center'
        },
        {
          prop: 'amount',
          label: '持有E信金额(元)',
          align: 'center'
        }
      ],
      progress: {
        numberCode: this.numberCode
      },
      columnsMessage: [
        {
          prop: 'numberCode',
          label: '流转E信编号',
          align: 'center'
        },
        {
          prop: 'companyName',
          label: '接收方',
          align: 'center'
        },
        {
          prop: 'status',
          label: '流转类型',
          align: 'center',
          formatter: (row) => {
            switch(row.status){
              case 1:
                return '支付'
              default:
                return '融资'
            }
          }
        },
        {
          prop: 'amount',
          label: '流转金额（元）',
          align: 'center'
        },
        {
          prop: 'approveDate',
          label: '交易时间',
          align: 'center'
        }
      ]
    }
  },
  created () {
    this.numberCode = this.init.numberCode
    this.tradeNumberCode = this.$route.query.tradeNumberCode
    this.receiveSocialCreditCode = this.$route.query.receiveSocialCreditCode
    this.getDetail()
  },
  watch: {
    'init': function (newVal,oldVal) {
        this.numberCode = newVal.numberCode
        this.getDetail()
    }
  },
  methods: {
    tabCur () {
      if (this.activeName == 'third') {
        getClearing(this.numberCode).then(res => {
          if (res.code == 1) {
            this.getTable = res.data
          }
        })
        .catch(err => {
          this.$message.error(err.msg)
        })
      }
    },
    arrAssign (arr, Arrflag) {
      if (Arrflag) { // arrFlag = true 没有小数点
        arr.push('-','-')
      }
      this.amountObj.milliard = arr[0]
      this.amountObj.billion = arr[1]
      this.amountObj.tenBillion = arr[2]
      this.amountObj.million = arr[3]
      this.amountObj.shiwan = arr[4]
      this.amountObj.tenThousand = arr[5]
      this.amountObj.thousand = arr[6]
      this.amountObj.hundred = arr[7]
      this.amountObj.ten = arr[8]
      this.amountObj.yuan = arr[9]
      arr[10] == '.' ? this.amountObj.jiao = arr[11] : this.amountObj.jiao = arr[10]
      arr[10] == '.' ? this.amountObj.fen = arr[12] : this.amountObj.fen = arr[11]
      if (arr[10] == '.' && arr.length == 12) {
        this.amountObj.fen = '-'
      }
    },
    switcFn (arr,flag) {
      switch (arr.length) {
          case 1:
            arr.unshift('-','-','-','-','-','-','-','-','-')
            this.arrAssign(arr,flag)
            break
          case 2:
            arr.unshift('-','-','-','-','-','-','-','-')
            this.arrAssign(arr,flag)
            break
          case 3:
            arr.unshift('-','-','-','-','-','-','-')
            this.arrAssign(arr,flag)
            break
          case 4:
            arr.unshift('-','-','-','-','-','-')
            this.arrAssign(arr,flag)
            break
          case 5:
            arr.unshift('-','-','-','-','-')
            this.arrAssign(arr,flag)
            break
          case 6:
            arr.unshift('-','-','-','-')
            this.arrAssign(arr,flag)
            break
          case 7:
            arr.unshift('-','-','-')
            this.arrAssign(arr,flag)
            break
          case 8:
            arr.unshift('-','-')
            this.arrAssign(arr,flag)
            break
          case 9:
            arr.unshift('-')
            this.arrAssign(arr,flag)
            break
          default:
            this.arrAssign(arr,flag)
        }
    },
    loop () {
      let arr = this.tableData.amount.toString().split('')
      if (arr.indexOf('.') == -1) {
        this.switcFn(arr,true) // 没有小数点
      } else {
        this.switcFn(arr,false) // 有小数点
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    getTmpDetail () {
      let obj = {}
      obj.receiveSocialCreditCode = this.receiveSocialCreditCode
      obj.tradeNumberCode = this.tradeNumberCode
      obj.amount = this.amount
      obj.payNumberCode = this.numberCode
      obj.paymentDate = this.paymentDate
      obj.eType = this.eType
      this.$http.post(tmpDetail, obj)
        .then(res => {
          let resp = res
          if (resp.code === 1) {
            this.tableData.tradeNumberCode = resp.data.tradeNumberCode // 贸易立账单的编号
            this.tableData.amount = resp.data.amount // 金额(元)
            this.tableData.amountName = resp.data.amountName // 金额中文大写
            // 支付方
            this.tableData.payNumberCode = resp.data.payNumberCode // 支付E信编号
            this.tableData.payOrgName = resp.data.payOrgName // E信支付方
            this.tableData.payBankNumber = resp.data.payBankNumber // 账号
            this.tableData.payBankName = resp.data.payBankName // 开户行
            this.tableData.payTaxpayerDiscernNumber = resp.data.payTaxpayerDiscernNumber // 支付方公司的纳税人识别号
            this.tableData.payDate = resp.data.payDate // 支付日期
            this.tableData.applyUser = resp.data.applyUser // 支付方 经办人
            this.tableData.approveUser = resp.data.approveUser // 支付方 审核人
            // 接收方
            this.tableData.receiveNumberCode = resp.data.receiveNumberCode // 接收E信编号
            this.tableData.receiveOrgName = resp.data.receiveOrgName // E信接收方
            this.tableData.receiveBankNumber = resp.data.receiveBankNumber // 接收方公司的银行账号
            this.tableData.receiveBankName = resp.data.receiveBankName // 接收方公司的银行账号的开户行
            this.tableData.receiveTaxpayerDiscernNumber = resp.data.receiveTaxpayerDiscernNumber // 接收方公司的纳税人识别号
            this.tableData.acceptDate = resp.data.acceptDate // 接收日期
            this.tableData.receiveApproveUser = resp.data.receiveApproveUser // 接收方 审批人名称
            // 承诺付款方
            this.tableData.openNumberCode = resp.data.openNumberCode // 开立E信编号
            this.tableData.openOrgName = resp.data.openOrgName // 承诺付款方
            this.tableData.openBankNumber = resp.data.openBankNumber // 开立方公司的银行账号
            this.tableData.openBankName = resp.data.openBankName // 开立方公司的银行账号的开户行
            this.tableData.openTaxpayerDiscernNumber = resp.data.openTaxpayerDiscernNumber // 开立方公司的纳税人识别号
            this.tableData.paymentDate = resp.data.paymentDate // 承诺付款日期
            this.tableData.paymentLetterNumber = resp.data.paymentLetterNumber // 付款函编号
            this.loop()
          } else {
            this.$message.error(resp.msg)
          }
        })
        .catch(er => {})
    },
    getDetail () {
      geteCoreDetail(this.numberCode).then(res => {
          let resp = res
          if (resp.code === 1) {
            this.tableData.tradeNumberCode = resp.data.tradeNumberCode // 贸易立账单的编号
            this.tableData.amount = resp.data.amount // 金额(元)
            this.tableData.amountName = resp.data.amountName // 金额中文大写
            // 支付方
            this.tableData.payNumberCode = resp.data.payNumberCode // 支付E信编号
            this.tableData.payOrgName = resp.data.payOrgName // E信支付方
            this.tableData.payBankNumber = resp.data.payBankNumber // 账号
            this.tableData.payBankName = resp.data.payBankName // 开户行
            this.tableData.payTaxpayerDiscernNumber = resp.data.payTaxpayerDiscernNumber // 支付方公司的纳税人识别号
            this.tableData.payDate = resp.data.payDate // 支付日期
            this.tableData.applyUser = resp.data.applyUser // 支付方 经办人
            this.tableData.approveUser = resp.data.approveUser // 支付方 审核人
            // 接收方
            this.tableData.receiveNumberCode = resp.data.receiveNumberCode // 接收E信编号
            this.tableData.receiveOrgName = resp.data.receiveOrgName // E信接收方
            this.tableData.receiveBankNumber = resp.data.receiveBankNumber // 接收方公司的银行账号
            this.tableData.receiveBankName = resp.data.receiveBankName // 接收方公司的银行账号的开户行
            this.tableData.receiveTaxpayerDiscernNumber = resp.data.receiveTaxpayerDiscernNumber // 接收方公司的纳税人识别号
            this.tableData.acceptDate = resp.data.acceptDate // 接收日期
            this.tableData.receiveApproveUser = resp.data.receiveApproveUser // 接收方 审批人名称
            // 承诺付款方
            this.tableData.openNumberCode = resp.data.openNumberCode // 开立E信编号
            this.tableData.openOrgName = resp.data.openOrgName // 承诺付款方
            this.tableData.openBankNumber = resp.data.openBankNumber // 开立方公司的银行账号
            this.tableData.openBankName = resp.data.openBankName // 开立方公司的银行账号的开户行
            this.tableData.openTaxpayerDiscernNumber = resp.data.openTaxpayerDiscernNumber // 开立方公司的纳税人识别号
            this.tableData.paymentDate = resp.data.paymentDate // 承诺付款日期
            this.tableData.paymentLetterNumber = resp.data.paymentLetterNumber // 付款函编号
            this.loop()
          } else {
            this.$message.error(resp.msg)
          }
        })
        .catch(er => {})
    }
  }
}
</script>
<style lang="" scoped>
  table {
    font-size: 14px;
    border: 1px solid #DDDDDD;
  }
  tr td{
    width: 31px;
  }
  tr th {
    padding: 10px;
  }
  .bg {
    background: rgba(251,251,251,1);
    color: #333333;
  }
  .colorBlue {
    color: #6B79FF;
    text-align: left;
  }
  .colorBlank {
    color: #333333;
  }
  .colorGrey {
    color: #666666;
    text-align: left;
  }
  .bottomBtn {
    text-align: center;
    margin-top: 15px;
  }
  .el-tabs__nav-wrap {
    padding-left: 15px;
  }
</style>
