import request from '~/utils/fetch'

/**
 * 系统查询
 */
export function systemSearch() {
  return request({
    url: '/system/system/pugesystem/search',
    method: 'post'
  })
}

/**
 * 新增系统
 */
export function addSystem(data) {
  return request({
    url: '/system/system/pugesystem',
    method: 'post',
    data
  })
}

/**
 * 编辑系统
 */
export function editSystem(data) {
  return request({
    url: '/system/system/pugesystem',
    method: 'put',
    data
  })
}

/**
 * 删除系统
 */
export function deleteSystem(params) {
  return request({
    url: `/system/system/pugesystem/${params}`,
    method: 'delete'
  })
}

/**
 * 一条系统查询
 */
export function searchSystemOne(params) {
  return request({
    url: `/system/system/pugesystem/${params}`,
    method: 'get'
  })
}

/**
 * 查询角色拥有的系统ids集合
 */
export function roleSearchSystem(params) {
  return request({
    url: `/system/system/pugesystem/${params}/system/ids`,
    method: 'get'
  })
}

/**
 * 保存系统分配
 */
export function saveRoleSystem(data, params) {
  return request({
    url: `/system/system/role/${params}/system/save`,
    method: 'post',
    data
  })
}
