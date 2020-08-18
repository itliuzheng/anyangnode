
/*
*
 *   0 - 额度变更,
 *   1 - 解冻额度,
 *   2 - 冻结额度,
 *   3 - 终止额度,
 *   4 - 恢复额度",
*
* */
export const CHANGEACCOUNT = [
  {label: '额度变更', status: 'CHANGE' , itemTitle:"变更额度"},
  {label: '解冻额度', status: 'UNFREEZE' , itemTitle:"解冻量"},
  {label: '冻结额度', status: 'FREEZE' , itemTitle:"冻结量"},
  {label: '终止额度', status: 'TERMINATION' , itemTitle:""},
  {label: '恢复额度', status: 'RECOVER' , itemTitle:""},
]

// export const OPERATETYPE = [
//   null,
//   "变更额度",
//   "解冻额度",
//   "冻结额度",
//   "终止额度",
//   "恢复额度",
//   "融资申请",
//   "融资申请失败",
//   "放款",
//   "还款",
//   "还款失败",
//   "平仓"
// ]

export const OPERATETYPE = {
  "1":"变更额度",
  "2":"解冻额度",
  "3":"冻结额度",
  "4":"终止额度",
  "5":"恢复额度",
  "6":"融资申请",
  "7":"融资申请失败",
  "8":"放款",
  "9":"还款",
  "10":"还款失败",
  "11":"平仓"
}


