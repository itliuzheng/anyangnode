import http from '@/http';

export function getById(id) {
  return new Promise((resolve, reject) => {
    http({
      url: `/api/notice/${id}`,
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
      url: '/api/notice/page',
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
      url: '/api/notice/create',
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
      url: '/api/notice/update',
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
      url: `/api/notice/delete?id=${id}`,
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
