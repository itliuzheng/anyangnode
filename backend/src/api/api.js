import http from '@/http';

function postUpload(data){
  return new Promise((resolve,reject)=>{
    http({
      url:`/api/website/upload`,
      method:'post',
      data:data,
      headers:{
        'Content-Type':'multipart/form-data'
      }
    }).then(res => {
      if(res.code == 1){
        resolve(res)
      }else{
        reject(res)
      }
    }).catch(error=>{
      reject(error)
    })
  })
}

function getInfo(){
  return new Promise((resolve,reject)=>{
    http({
      url:`/api/website/info`,
      method:'get',
    }).then(res => {
      if(res.code == 1){
        resolve(res)
      }else{
        reject(res)
      }
    }).catch(error=>{
      reject(error)
    })
  })
}

function postAdd(data){
  return new Promise((resolve,reject)=>{
    http({
      url:`/api/website/add`,
      method:'post',
      data
    }).then(res => {
      if(res.code == 1){
        resolve(res)
      }else{
        reject(res)
      }
    }).catch(error=>{
      reject(error)
    })
  })
}


export {
  postUpload,
  getInfo,
  postAdd
}
