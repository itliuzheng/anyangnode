import http from '@/http';

 function resourcesAll(){
  return new Promise((resolve,reject)=>{
    http({
      url:'/resources/all',
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

 function resourcesAllId(id){
  return new Promise((resolve,reject)=>{
    http({
      url:`/resources/all?roleId=${id}`,
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

 function resourcesAdd(data){
  return new Promise((resolve,reject)=>{
    http({
      url:'/resources/add',
      method:'post',
      data:data
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

 function resourcesUpdate(data){
  return new Promise((resolve,reject)=>{
    http({
      url:'/resources/update',
      method:'post',
      data:data
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

 function resourcesDelete(id){
  return new Promise((resolve,reject)=>{
    http({
      url:`/resources/delete/${id}`,
      method:'post'
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

 function rolePage(data){
  return new Promise((resolve,reject)=>{
    http({
      url:`/role/page`,
      method:'post',
      data:data
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

 function roleType(data,type = 'add'){
  return new Promise((resolve,reject)=>{
    http({
      url:`/role/${type}`,
      method:'post',
      data:data
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

 function roleDelete(id){
  return new Promise((resolve,reject)=>{
    http({
      url:`/role/delete/${id}`,
      method:'post'
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

 function roleAuthorize(data){
  return new Promise((resolve,reject)=>{
    http({
      url:`/role/authorize/`,
      method:'post',
      data:data
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

 function sysuserId(id){
  return new Promise((resolve,reject)=>{
    http({
      url:`/sysuser/${id}`,
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
 function sysuserPage(data){
  return new Promise((resolve,reject)=>{
    http({
      url:`/sysuser/page`,
      method:'post',
      data:data
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

 function sysuserType(data,type = 'add'){
  return new Promise((resolve,reject)=>{
    http({
      url:`/sysuser/${type}`,
      method:'post',
      data:data
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

 function sysuserEnableDisable(id){
  return new Promise((resolve,reject)=>{
    http({
      url:`/sysuser/enable-disable/${id}`,
      method:'post'
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



export {
  resourcesAll,
  resourcesAllId,
  resourcesAdd,
  resourcesUpdate,
  resourcesDelete,
  rolePage,
  roleType,
  roleDelete,
  roleAuthorize,
  sysuserId,
  sysuserPage,
  sysuserType,
  sysuserEnableDisable,
};
