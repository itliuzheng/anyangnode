import http from '@/http';
/**
 * 保理管理  POST 获取分页
 * @param data = {
    "financingCompany": "@string",//融资企业
    "quotaStatus": 0,//额度状态 1-进行中 2- 已放款 3- 拒绝
    "status": 0,//审核状态：1-风控审核，11-风控审批，21-财务审核，31-财务审批
    "pageNum": 1,
    "pageSize": 10
  }
 * @returns {Promise<any>}
 */
export function postPage(data) {
  return new Promise((resolve, reject) => {
    http({
      url: '/financing/factoring/page',
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
