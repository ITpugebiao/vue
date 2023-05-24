import request from '~/utils/fetch'

// 查询需要处理的合同

export function QueryContractProcessed() {
  return request({
    url: '/inside/inside/Bpersonal/selectContract',
    method: 'get'
  })
}

// 查询需要处理的报销
export function QueryApplyProcessed() {
  return request({
    url: '/inside/inside.insideInfo/apply/selectAuditBepaied',
    method: 'get'
  })
}
