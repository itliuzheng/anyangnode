
export const STATUSLIST = [
	{label: '拒绝', value: 1},
	{label: '通过', value: 0}
]

//1-风控审核，11-风控审批，21-财务审批，31-财务审核
export const FINANCINGTYPELIST = [
	{label: '风控审核', value: 1},
	{label: '风控审批', value: 11},
	{label: '财务审核', value: 21},
	{label: '财务审批', value: 31}
]

export const CREDITLIST = [
	{label: '通过', value: 2},
	{label: '拒绝', value: 1}
]

export const FINANCINGLIST = {
  financingRiskAudit: [
    {label: '通过', value: 11, name: "风控审批(风控审核通过)"},
    {label: '拒绝', value: 2, name: "风控审核拒绝"},
  ],
  financingRiskApproval: [
    {label: '通过', value: 21, name: "财务审核(风控审批通过)"},
    {label: '拒绝', value: 12, name: "风控审批拒绝"},
  ],
  financingFinanceAudit: [
    {label: '通过', value: 31, name: "财务审批(财务审核通过)"},
    {label: '拒绝', value: 22, name: "财务审核拒绝"},
  ],
  financingFinanceApproval: [
    {label: '通过', value: 33, name: "财务审批通过"},
    {label: '拒绝', value: 32, name: "财务审批拒绝"},
  ],
}

//1-进行中 2- 已放款 3- 拒绝
export const QUOTASTATUS = [
	{label: '进行中', value: 1},
	{label: '已放款', value: 2},
	{label: '拒绝', value: 3}
]

