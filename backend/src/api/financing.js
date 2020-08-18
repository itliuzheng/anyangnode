import http from '@/http'

/*
	GET 	  依据id获取记录 	
*/
export function getById(){
  return new Promise((resolve,reject)=>{
    http({
      url:`/financing/financing-management/${id}`,
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
	POST 	  获取分页 风控审核、风控审批、财务审核、财务审批 的数据 	
	data = {
			  "financingCompany": "@string",//融资企业
			  "quotaStatus": 0,//额度状态 1-进行中 2- 已放款 3- 拒绝
			  "status": 0,//审核状态：1-风控审核，11-风控审批，21-财务审批，31-财务审核
			  "pageNum": 0,
			  "pageSize": 0
			}

	return {
		  "code": 1,//	  业务错误码 	
		  "data": {//	  结果集 	
		    "current": 0,//	  当前 	
		    "pageSize": 0,//	  页大小 	
		    "pages": 0,//	  总页数 	
		    "total": 1,//	  总数据量 	
		    "records": {//	  数据 	
		      "id": 0,
		      "financingCode": "@string",//融资申请编号
		      "financingCompany": "@string",//融资企业
		      "numberCode": "@string",//E信编号
		      "financeAmount": 0.111111,//融资金额（元）
		      "financeRate": 0.111111,//融资利率（日%）
		      "tradeStatus": 0,//贸易信息是否通过  0-否，1-是
		      "status": 0,//审核状态：0-初始状态，1-风控审核，2-风控审核拒绝，11-风控审批，12-风控审批拒绝，21-财务审批，22-财务审批拒绝，31-财务审核，32-财务审核拒绝 ,33-财务审核通过
		      "createDate": 1596421389696,//创建时间
		      "updateDate": 1596421389696,//更新时间
		      "quotaStatus": 0,//额度状态 1-进行中 2- 已放款 3- 拒绝
		      "statuses": "@string",//	  供筛选状态使用，  例如：3,4 	
		      "statusList": [//	  此字段无意义，只为解决sql 	
		        "@string"
		      ],
		      "pageNum": 0,
		      "pageSize": 0
		    }
		  },
		  "msg": "@string"//	  描述 	
		}
*/

export function postPage(data){
  return new Promise((resolve,reject)=>{
    http({
      url:`/financing/financing-management/page`,
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
	POST 获取分页 进度查询 数据
	data = {
	  "financingCompany": "@string",//融资企业
	  "quotaStatus": 0,//额度状态 1-进行中 2- 已放款 3- 拒绝
	  "status": 0,//审核状态：1-风控审核，11-风控审批，21-财务审批，31-财务审核
	  "pageNum": 0,
	  "pageSize": 0
	}

	return {
	  "code": 1,//	  业务错误码 	
	  "data": {//	  结果集 	
	    "current": 0,//	  当前 	
	    "pageSize": 0,//	  页大小 	
	    "pages": 0,//	  总页数 	
	    "total": 1,//	  总数据量 	
	    "records": {//	  数据 	
	      "id": 0,
	      "financingCode": "@string",//融资申请编号
	      "financingCompany": "@string",//融资企业
	      "numberCode": "@string",//E信编号
	      "financeAmount": 0.111111,//融资金额（元）
	      "financeRate": 0.111111,//融资利率（日%）
	      "tradeStatus": 0,//贸易信息是否通过  0-否，1-是
	      "status": 0,//审核状态：
	      "statusName": "@string",
	      "pageNum": 0,
	      "pageSize": 0
	    }
	  },
	  "msg": "@string"//	  描述 	
	}

*/
export function postSchedule(data){
  return new Promise((resolve,reject)=>{
    http({
      url:'/financing/financing-management/schedule',
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
	POST 更新
	data = {
	  "id": 0,
	  "financingCode": "@string",//融资申请编号
	  "financingCompany": "@string",//融资企业
	  "numberCode": "@string",//E信编号
	  "financeAmount": 0.111111,//融资金额（元）
	  "financeRate": 0.111111,//融资利率（日%）
	  "tradeStatus": 0,//贸易信息是否通过  0-否，1-是
	  "status": 0,//审核状态：0-初始状态，1-风控审核，2-风控审核拒绝，11-风控审批，12-风控审批拒绝，21-财务审批，22-财务审批拒绝，31-财务审核，32-财务审核拒绝 ,33-财务审核通过
	  "createDate": 1596421389696,//创建时间
	  "updateDate": 1596421389696,//更新时间
	  "quotaStatus": 0,//额度状态 1-进行中 2- 已放款 3- 拒绝
	  "statuses": "@string",//	  供筛选状态使用，  例如：3,4 	
	  "statusList": [//	  此字段无意义，只为解决sql 	
	    "@string"
	  ],
	  "pageNum": 0,
	  "pageSize": 0
	}

*/

export function postUpdate(data){
  return new Promise((resolve,reject)=>{
    http({
      url:'/financing/financing-management/update',
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
	POST 删除
	id

 */
export function postDelete(id){
  return new Promise((resolve,reject)=>{
    http({
      url:`/financing/financing-management/delete?id=${id}`,
      method:'post',
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
	POST 	  审核 按钮 	

	data = {
	  "id": 0,//业务id,必填
	  "status": 0,//状态 2-风控审核拒绝，
	  11-风控审批(风控审核通过)，
	  12-风控审批拒绝，
	  21-财务审批(风控审批通过)，
	  22-财务审批拒绝，
	  31-财务审核(财务审批通过)，
	  32-财务审核拒绝，
	  33-财务审核通过,
	  必填
	  "financingType": 0,//融资类型 1-风控审核,11-风控审批,21-财务审批,31-财务审核,必填
	  "remark": "@string"//审核意见
	}

	{
  "id": 0,//业务id,必填
  "status": 0,//状态
   2-风控审核拒绝，
   11-风控审批(风控审核通过)，
   12-风控审批拒绝，
   21-财务审核(风控审批通过)，
   22-财务审核拒绝，
   31-财务审批(财务审核通过)
   ，32-财务审核拒绝，
   33-财务审核通过,必填
  "financingType": 0,//融资类型 1-风控审核,11-风控审批,21-财务审核,31-财务审批,必填
  "remark": "@string"//审核意见
}



 */

export function postApproval(data){
  return new Promise((resolve,reject)=>{
    http({
      url:'/financing/financing-management/approval',
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
