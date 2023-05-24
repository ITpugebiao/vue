// 合同管理
import request from '~/utils/fetch'

/**
 * 添加合同
 * @param {*} data
 * @returns
 */
export function addContract(data) {
  return request({
    url: '/inside/inside/contract',
    method: 'post',
    data
  })
}

/**
 * 修改合同
 * @param {*} data
 * @returns
 */
export function putContract(data) {
  return request({
    url: '/inside/inside/contract',
    method: 'put',
    data
  })
}

/**
 *  根据合约ID查询详细信息
 * @param {*} contractId
 * @returns
 */
export function getContract(contractId) {
  return request({
    url: `/inside/inside/contract/${contractId}`,
    method: 'get'
  })
}

/**
 * 删除合同
 * @param {*} contractId
 * @returns
 */
export function deleteContract(contractId) {
  return request({
    url: `/inside/inside/contract/${contractId}`,
    method: 'delete'
  })
}

/**
 * 查询所有合同
 * @returns
 */
export function searchContract() {
  return request({
    url: '/inside/inside/contract/search',
    method: 'get'
  })
}
