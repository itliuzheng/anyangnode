import http from '@/http';

export function postPage(data) {
  return new Promise((resolve, reject) => {
    http({
      url: '/api/game_tool/page',
      method: 'post',
      data
    }).then(res => {
      if (res.code == 1) {
        resolve(res);
      } else {
        reject(res);
      }
    }).catch(error => {
      reject(error)
    })
  })
}

export function postAdd(data) {
  return new Promise((resolve, reject) => {
    http({
      url: '/api/game_tool/create',
      method: 'post',
      data
    }).then(res => {
      if (res.code == 1) {
        resolve(res);
      } else {
        reject(res);
      }
    }).catch(error => {
      reject(error)
    })
  })
}

export function postUpdate(data) {
  return new Promise((resolve, reject) => {
    http({
      url: '/api/game_tool/update',
      method: 'post',
      data
    }).then(res => {
      if (res.code == 1) {
        resolve(res);
      } else {
        reject(res);
      }
    }).catch(error => {
      reject(error)
    })
  })
}

export function postDelete(id) {
  return new Promise((resolve, reject) => {
    http({
      url: `/api/game_tool/delete?id=${id}`,
      method: 'post',
    }).then(res => {
      if (res.code == 1) {
        resolve(res);
      } else {
        reject(res);
      }
    }).catch(error => {
      reject(error)
    })
  })
}
