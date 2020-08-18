import http from '@/http';

export function loginByUsername(username,password) {
  const data = {
    loginName:username,
    password
  };
  return http({
    url:'/api/user/login',
    method:'post',
    data
  })
}

export function getUserInfo() {
  return http({
    url: '/api/sysuser/resources',
    method: 'get',
  })
}
