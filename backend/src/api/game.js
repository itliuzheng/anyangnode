import http from '@/http';

export function postPage(data) {
  return new Promise((resolve, reject) => {
    http({
      url: '/api/game_type/page',
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
      url: '/api/game_type/create',
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
      url: '/api/game_type/update',
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
      url: `/api/game_type/delete?id=${id}`,
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
