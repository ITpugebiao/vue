import request from '~/utils/fetch'

/**
 * 查询在审核中的个人合约
 */
export function AuditContract() {
  return request({
    url: '/inside/inside/Bpersonal/searchPersonal',
    method: 'post'
  })
}

/**
 * 查询在等待审核解约的合同
 */
export function AuditContractTerminate() {
  return request({
    url: '/inside/inside/Bpersonal/searchPersonalThree',
    method: 'post'
  })
}

/**
 *
审核合约不通过
 */
export function AuditContractNo(data) {
  return request({
    url: '/inside/inside/Bpersonal/updatePersonalFive',
    method: 'put',
    data
  })
}

/**
 * 审核合约解约通过
 */
export function AuditContractTerminateYes(data) {
  return request({
    url: '/inside/inside/Bpersonal/updatePersonalFour',
    method: 'put',
    data
  })
}

/**
 * 审核合约通过
 */
export function AuditContractYes(data) {
  return request({
    url: '/inside/inside/Bpersonal/updatePersonalOne',
    method: 'put',
    data
  })
}
