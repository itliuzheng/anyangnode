import http from '@/http';

/*
    授信管理 - GET 列出所有未授信的用户列表
* */
export function getCustomersList(){
  return new Promise((resolve,reject)=>{
    http({
      url:'/creditapply/credit-apply/customers',
      method:'get'
    }).then(res => {
      if(res.code == 1){
        resolve(res);
      }else{
        reject(res);
      }
    }).catch(error=>{
      reject(error)
    })
  })
}
/*
    授信管理 - 授信申请 - 添加
*   {
      "companyName": "@string",//	  企业名称 	,必填
      "socialCreditCode": "@string",//	  统一社会信用代码 	,必填
      "creditAmount": 0.111111,//	  预授信额度（万） 	,必填
      "creditMonth": 0,//	  授信期限 	,必填
      "remark": "@string"//	  处理意见
    }
* */
export function postAdd(data){
  return new Promise((resolve,reject)=>{
    http({
      url:'/creditapply/credit-apply/add',
      method:'post',
      data
    }).then(res => {
      if(res.code == 1){
        resolve(res);
      }else{
        reject(res);
      }
    }).catch(error=>{
      reject(error)
    })
  })
}

/*
    授信管理 - POST 审批
*   {
      "numberCode": "@string",//	  编号 	,必填
      "status": 0,//	  审核状态： 1-拒绝 2-通过 	,必填
      "remark": "@string"//	  处理意见
    }
* */

export function postApprove(data){
  return new Promise((resolve,reject)=>{
    http({
      url:'/creditapply/credit-apply/approve',
      method:'post',
      data
    }).then(res => {
      if(res.code == 1){
        resolve(res);
      }else{
        reject(res);
      }
    }).catch(error=>{
      reject(error)
    })
  })
}

/*
*   授信管理 - 依据id获取记录
*   get
* */

export function getById(id){
  return new Promise((resolve,reject)=>{
    http({
      url:`/credit/company-credit-account/${id}`,
      method:'get'
    }).then(res => {
      if(res.code == 1){
        resolve(res);
      }else{
        reject(res);
      }
    }).catch(error=>{
      reject(error)
    })
  })
}

/*
*   授信管理 - 额度维护 - 获取分页数据
*   post
*
*   {
      "id": 0,
      "userId": 0,//用户id
      "financeOrgId": 0,//金融机构用户id
      "financeOrgName": "@string",//金融机构名称--授信机构
      "socialCreditCode": "@string",//被授信企业的统一社会信用代码
      "companyName": "@string",//被授信企业名称
      "creditAccount": 0.111111,//授信金额（元）
      "availableAccount": 0.111111,//可用额度 （元）
      "usedAccount": 0.111111,//已使用额度 （元）
      "freezeAccount": 0.111111,//冻结额度（元）
      "freezingAccount": 0.111111,//在途冻结额度（元）
      "status": 0,//1-正常， 2-终止, 3-到期
      "statusName": "@string",
      "createDate": 1595300941653,//时间
      "creditStartDate": 1595300941653,//授信开始时间
      "creditEndDate": 1595300941653,//授信结束时间
      "creditMonth": 0,//授信的期限 1,3,6,9,12 个月
      "remark": "@string",//备注
      "contacts": "@string",//联系人
      "phone": "@string",//手机号
      "pageNum": 0,
      "pageSize": 0
    }
* */

export function postPage(data){
  return new Promise((resolve,reject)=>{
    http({
      url:'/credit/company-credit-account/page',
      method:'post',
      data
    }).then(res => {
      if(res.code == 1){
        resolve(res);
      }else{
        reject(res);
      }
    }).catch(error=>{
      reject(error)
    })
  })
}

/*
*     授信管理 - POST 额度变更
*   {
        "id": 0,//	  id
        "status": {},
        "account": 0.111111,//	  变更的额度
        "operation": "@string",//	  运算操作 ADD-加操作，SUB-减操作
        "remark": "@string"//	  备注
      }
* */

export function postChangeAccount(data){
  return new Promise((resolve,reject)=>{
    http({
      url:'/credit/company-credit-account/changeAccount',
      method:'post',
      data
    }).then(res => {
      if(res.code == 1){
        resolve(res);
      }else{
        reject(res);
      }
    }).catch(error=>{
      reject(error)
    })
  })
}

/*
*     POST 查看额度变更历史记录
*     {
          "id": 0,
          "pageNum": 0,
          "pageSize": 0
       }
* */

export function postAccountHistory(data){
  return new Promise((resolve,reject)=>{
    http({
      url:`/credit/company-credit-account/account/history`,
      method:'post',
      data
    }).then(res => {
      if(res.code == 1){
        resolve(res);
      }else{
        reject(res);
      }
    }).catch(error=>{
      reject(error)
    })
  })
}


/*
*   授信申请、审批、进度查询 - 授信审批详情 GET 详情
*
* */

export function getByNumberCode(numberCode){
  return new Promise((resolve,reject)=>{
    http({
      url:`/creditapply/credit-apply/${numberCode}`,
      method:'get'
    }).then(res => {
      if(res.code == 1){
        resolve(res);
      }else{
        reject(res);
      }
    }).catch(error=>{
      reject(error)
    })
  })
}

/*
*     授信申请、审批、进度查询 - POST 获取分页数据
*   {
      "companyName": "@string",//	  企业名称
      "status": 0,//	  0-进行中 1-拒绝 2-通过
      "pageNum": 0,
      "pageSize": 0
      }

* */

export function postApplyPage(data){
  return new Promise((resolve,reject)=>{
    http({
      url:'/creditapply/credit-apply/page',
      method:'post',
      data
    }).then(res => {
      if(res.code == 1){
        resolve(res);
      }else{
        reject(res);
      }
    }).catch(error=>{
      reject(error)
    })
  })
}

/*
*   授信管理 - GET 列出所有未授信的用户列表
* */

export function getNotCreditCustomers(){
  return new Promise((resolve,reject)=>{
    http({
      url:`/creditapply/credit-apply/customers`,
      method:'get'
    }).then(res => {
      if(res.code == 1){
        resolve(res);
      }else{
        reject(res);
      }
    }).catch(error=>{
      reject(error)
    })
  })
}

/*
*   授信管理 - GET 列出所有可用状态
* */

export function getStatus(){
  return new Promise((resolve,reject)=>{
    http({
      url:`/creditapply/credit-apply/status`,
      method:'get'
    }).then(res => {
      if(res.code == 1){
        resolve(res);
      }else{
        reject(res);
      }
    }).catch(error=>{
      reject(error)
    })
  })
}
