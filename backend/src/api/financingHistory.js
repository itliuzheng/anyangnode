import http from '@/http'

/*
	POST 	  添加 融资管理记录审核表 	

	data = {
	  "id": 0,
	  "financingManagementId": 0,//financing_management 表id
	  "financingType": 0,//融资类型 ：1-风控审核，11-风控审批，21-财务审批，31-财务审核
	  "status": 0,//结果： 0-通过 1-拒绝
	  "remark": "@string",//处理意见
	  "auditorUser": "@string",//审核人
	  "auditorId": 0,//审核的id
	  "createDate": 1596421389696,//操作时间
	  "updateDate": 1596421389696,//更新时间
	  "statuses": "@string",//	  供筛选状态使用，  例如：3,4 	
	  "statusList": [//	  此字段无意义，只为解决sql 	
	    "@string"
	  ],
	  "pageNum": 0,
	  "pageSize": 0
	}


*/
export function postAdd(data){
  return new Promise((resolve,reject)=>{
    http({
      url:`/financing/financing-management-history/add`,
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
	GET 	  依据id获取记录 	

 */

export function getById(id){
  return new Promise((resolve,reject)=>{
    http({
      url:`/financing/financing-management-history/${id}`,
      method:'get',
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
	POST 	  详情 按钮 	
	data = {
	  "id": 0,
	  "financingManagementId": 0,//financing_management 表id
	  "financingType": 0,//融资类型 ：1-风控审核，11-风控审批，21-财务审批，31-财务审核
	  "status": 0,//结果： 0-通过 1-拒绝
	  "remark": "@string",//处理意见
	  "auditorUser": "@string",//审核人
	  "auditorId": 0,//审核的id
	  "createDate": 1596421389696,//操作时间
	  "updateDate": 1596421389696,//更新时间
	  "statuses": "@string",//	  供筛选状态使用，  例如：3,4 	
	  "statusList": [//	  此字段无意义，只为解决sql 	
	    "@string"
	  ],
	  "pageNum": 0,
	  "pageSize": 0
	}


 */

export function postPage(data){
  return new Promise((resolve,reject)=>{
    http({
      url:`/financing/financing-management-history/page`,
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
	POST 	  更新 	

	data = {
	  "id": 0,
	  "financingManagementId": 0,//financing_management 表id
	  "financingType": 0,//融资类型 ：1-风控审核，11-风控审批，21-财务审批，31-财务审核
	  "status": 0,//结果： 0-通过 1-拒绝
	  "remark": "@string",//处理意见
	  "auditorUser": "@string",//审核人
	  "auditorId": 0,//审核的id
	  "createDate": 1596421389696,//操作时间
	  "updateDate": 1596421389696,//更新时间
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
      url:`/financing/financing-management-history/update`,
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
      url:`/financing/financing-management-history/delete?id=${id}`,
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
