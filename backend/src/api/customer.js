import http from '@/http';

export function postAdd(
  data = {
    "companyName": "",//企业名称
    "status": 0,//状态：0-未授信，1-已授信
    "pageNum": 1,
    "pageSize": 10
  }
  ){
  return new Promise((resolve,reject)=>{
    http({
      url:'/customer/add',
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

export function getId(id){
  return new Promise((resolve,reject)=>{
    http({
      url:`/customer/${id}`,
      method:'get'
    }).then(res => {
      if(res.code == 1){
        resolve(res.data);
      }else{
        reject(res);
      }
    }).catch(error=>{
      reject(error)
    })
  })
}
export function postPage(data){
  return new Promise((resolve,reject)=>{
    http({
      url:'/customer/page',
      method:'post',
      data
    }).then(res => {
      if(res.code == 1){
        resolve(res.data);
      }else{
        reject(res);
      }
    }).catch(error=>{
      reject(error)
    })
  })
}
export function postUpdate(data){
  return new Promise((resolve,reject)=>{
    http({
      url:'/customer/update',
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
export function postDeleteId(id){
  return new Promise((resolve,reject)=>{
    http({
      url:`/customer/delete/${id}`,
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


