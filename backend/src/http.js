import axios from 'axios';
import {
  Loading,
  Message,
  MessageBox
} from 'element-ui';
import store from '@/store'
import router from './router';
import { sessionStorage } from '@/assets/js/storage';


// if (!store.getters.token) {
//   store.commit('SET_TOKEN', sessionStorage.getItem('token'));
// }

// axios 配置

const http = axios.create({
  baseURL:process.env.BASE_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  transformRequest: [function (data, headers) {
    // headers.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiYWRtaW7nrqHnkIblkZgifV0sInVzZXJJZCI6IjEiLCJ1c2VyVHlwZSI6IjEiLCJ1c2VyTmFtZSI6ImFkbWluIiwiY29tcGFueU5hbWUiOiIyMTQxNCIsInNvY2lhbENyZWRpdENvZGUiOiIxMjM0NTYiLCJzdWIiOiJhZG1pbiIsImlhdCI6MTU5NTgxNTgwNSwiZXhwIjoxOTExMzQ4NjA4fQ.47toBTfM3JjxOoe8sF4b4MJbpUzk6d32_iQCayh_yjhhizKSHceWeXU0hxYpWzx7J91XtOTpX0vPQFDVJDJEbg' // store.getters.token;
    
    let token = store.getters.token;
    headers.Authorization = token && ( 'Bearer ' + token);
    if (headers['Content-Type'] === 'multipart/form-data') {
      return data;
    } else {
      return JSON.stringify(data);
    }
  }]
});


var loadingInstance;

// 请求拦截器
http.interceptors.request.use(config => {

  loadingInstance = Loading.service({
    fullscreen: true,
    lock: true,
    text: '正在请求数据...'
  });

  // 开发环境下，如果请求是 post,put,patch,则打印数据体，方便调试
  if (process.env.NODE_ENV === 'development') {
    const { method } = config;
    if (method === 'post' || method === 'put' || method === 'patch') {
      // console.log(config.data);
    }
  }

  return config;
}, error => {
  loadingInstance.close();
  Message.error({
    message: '请求失败'
  });
  return Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use(res => {
  loadingInstance.close();
  // console.log(res);
  if(res.data.code == 3){
    MessageBox.alert(res.data.msg, '提示', {
      confirmButtonText: '重新登陆',
      showClose: false,
      type: 'error',
      callback: action => {
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        });
      }
    });
  }
  if(res.data.code != 1){
    MessageBox.alert(res.data.msg, '提示', {
      confirmButtonText: `请通知管理员！`,
      showClose: false,
      type: 'error',
      callback: action => {
        // router.back()
      }
    });
  }
  return res.data;
}, error => {
  loadingInstance.close();
  if (error && error.response) {
    // console.log(error.response);

    switch (error.response.status) {
      // 401 token失效
      case 401:
        // MessageBox.alert('身份信息已过期，请重新登陆', '提示', {
        //   confirmButtonText: '重新登陆',
        //   showClose: false,
        //   type: 'error',
        //   callback: action => {
        //     router.replace({
        //       path: '/login',
        //       query: {
        //         redirect: router.currentRoute.fullPath
        //       }
        //     });
        //   }
        // });
        
        router.push('/login');
        break;

      // 403 服务器拒绝访问
      case 403:
        router.push('/error/403');
        break;

      // 404 访问的资源不存在
      case 404:
        router.push('/error/404');
        break;

      // 500 服务器错误
      case 500:
        router.push('/error/500');
        break;
    }

    return Promise.reject(error);
  }
});

export default http;