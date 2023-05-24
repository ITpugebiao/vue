import request from '~/utils/fetch'
/**
 * 审批人
 * id                  主键id
 * approverId          审批人id
 * approverName        审批人姓名
 * approverGrade       审批人等级
 */

/**
 * 查询审批人
 */
export function gainApprover() {
  return request({
    url: '/inside/inside/Bapprover/selectAllApprover',
    method: 'get'
  })
}

/**
 * 快捷搜索审批人
 */
export function searchApprover(data) {
  return request({
    url: '/inside/inside/Bapprover/selectOneApprover',
    method: 'post',
    data
  })
}

/**
 * 添加审批人
 */
export function appendApprover(data) {
  return request({
    url: '/inside/inside/Bapprover/saveApprover',
    method: 'post',
    data
  })
}

/**
 * 获取审批人信息
 */
export function selectApprover() {
  return request({
    url: '/inside/inside/Bdistribution/getUserInterview',
    method: 'get'
  })
}

/**
 * 判断审批人是否能直接删除      0 可能需要强制删除，1 直接删除审批人
 */
export function deciDedeleteApprover(approverId) {
  return request({
    url: `/inside/inside/Bapprover/ifdeleteApprover/${approverId}`,
    method: 'get'
  })
}

/**
 * 删除审批人
 */
export function dedeleteApprover(approverId) {
  return request({
    url: `/inside/inside/Bapprover/deleteApprover/${approverId}`,
    method: 'delete'
  })
}

/**
 * 强制删除审批人
 */
export function forceDedeleteApprover(approverId) {
  return request({
    url: `/inside/inside/Bdeclare/forceDeletion/${approverId}`,
    method: 'put'
  })
}
