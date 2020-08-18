import http from '@/http';

 function CUSTOMERPOST(data){
  return new Promise((resolve,reject)=>{
    setTimeout(function () {
      let date = {
        code:1,
        data:null,
        msg:'成功'
      }
      resolve(date);
    },1000);
    // http({
    //   url:'/resources/all',
    //   method:'get'
    // }).then(res => {
    //   if(res.code == 1){
    //     resolve(res);
    //   }else{
    //     reject(res);
    //   }
    // }).catch(error=>{
    //   reject(error)
    // })
  })
}

function getProductCustomer(){
  return new Promise((resolve,reject)=>{
    http({
      url:'/product/create',
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

function getProduct(data){
  return new Promise((resolve,reject)=>{
    http({
      url:'/product/list',
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
function getProductAdd(data){
  return new Promise((resolve,reject)=>{
    http({
      url:'/product/create',
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

function getProductUpdate(data){
  return new Promise((resolve,reject)=>{
    http({
      url:'/product/update',
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

function getProductDelete(id){
  return new Promise((resolve,reject)=>{
    http({
      url:`/product/delete?id=${id}`,
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

function getProductStatus(data){
  return new Promise((resolve,reject)=>{
    http({
      url:'/product/product/productStatus',
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

function getClearingPage(data){
  return new Promise((resolve,reject)=>{
    http({
      url:'/clearing/page',
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

function getClearing(numberCode){
  return new Promise((resolve,reject)=>{
    http({
      url:`/clearing/${numberCode}`,
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

function geteCoreDetail(numberCode){
  return new Promise((resolve,reject)=>{
    http({
      url:`/ecore/e-core/detail/${numberCode}`,
      method:'post'
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
   CUSTOMERPOST,
   getProductCustomer,
   getProductUpdate,
   getProduct,
   getProductAdd,
   getProductDelete,
   getProductStatus,
   getClearingPage,
   getClearing,
   geteCoreDetail
}
