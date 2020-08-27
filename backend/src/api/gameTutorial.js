import http from '@/http';

export function getById(id) {
  return new Promise((resolve, reject) => {
    http({
      url: `/api/game_tutorial/${id}`,
      method: 'get',
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

export function postPage(data) {
  return new Promise((resolve, reject) => {
    http({
      url: '/api/game_tutorial/page',
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
      url: '/api/game_tutorial/create',
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
      url: '/api/game_tutorial/update',
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
      url: `/api/game_tutorial/delete?id=${id}`,
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
