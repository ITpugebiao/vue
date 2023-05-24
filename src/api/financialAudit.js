// 财务报销审计接口
import request from '~/utils/fetch'

/**
 * 查询所有的报销单
 * @returns
 */
export function SearchExpenseAccount() {
  return request({
    url: '/inside/inside.insideInfo/apply/selectBepaied',
    method: 'get'
  })
}

/**
 * @param {*} id
 * @returns
 * 根据id查询详细的报销信息
 */
export function SearchAudit(id) {
  return request({
    url: `/inside/inside.insideInfo/apply/selectBepaiedById/${id}`
  })
}
/**
 *  是否通过审计
 * @param {*} id
 * @param {*} status
 * @returns
 */
export function comptroller(id, status) {
  return request({
    url: `inside/inside.insideInfo/apply/updateStatus/${id}/${status}`,
    method: 'get'
  })
}

/**
 * 是否报销
 * @param {*} id
 * @param {*} status
 * @returns
 */
export function reimbursement(id, status) {
  return request({
    url: `/inside/inside.insideInfo/apply/ifBepaied/${id}/${status}`,
    method: 'get'
  })
}
