import {getToken,setToken,removeToken} from "@/utils/token";
import {loginByUsername,getUserInfo} from "@/api/login"
import {parseStrEmpty} from "@/utils";
import { MessageBox } from 'element-ui';
import router from '@/router';
import { Message } from 'element-ui'



const user = {
  state:{
    token:getToken(),
    roles:[]
  },
  mutations:{
    SET_TOKEN:(state,token)=>{
      state.token = token;
      setToken(token);
    },
    SET_ROLES:(state,roles)=>{
      state.roles = roles
    }
  },
  actions:{
    //用户名登录
    LoginByUsername({commit},userInfo){
      // const username = userInfo.username.trim();
      return new Promise((resolve,reject)=>{
        loginByUsername(userInfo.username,userInfo.password).then(res => {
          if(res.code == 1){
            const token = res.data;
            commit('SET_TOKEN',token);
            resolve(res);
          }else{
            // Message.error('please login again')
            reject(res);
          }
        }).catch(error=>{
          // Message.error(error || error.message)
          reject(error)
        })
      })
    },
    // 获取用户所拥有的菜单
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {

        getUserInfo().then(res => {

          if (res.code != 1) {
            reject('error')
          }
          const data = res.data;
          //
          if (data && data.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data)
          } else {
            reject('getUserInfo: roles must be a non-null array !')
          }
          resolve(res)

        }).catch(error => {
          MessageBox.alert('网络异常，请稍后重试', '连接超时', {
            confirmButtonText: '确定',
            callback: action => {
              router.go(0);
            }
          });
          reject(error)
        })
      })
    },
    // 动态修改权限
    // ChangeRoles({ commit }, role) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', role)
    //     setToken(role)
    //     getUserInfo(role).then(response => {
    //       const data = response.data
    //       commit('SET_ROLES', data.roles)
    //       resolve()
    //     })
    //   })
    // }

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()

        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
  }
};

export default user
