import request from '~/utils/fetch'

/**
 * 角色查询
 * @param {*} data
 * @returns
 */
export function roleSearch(data) {
  return request({
    url: '/system/system/role/search',
    method: 'post',
    data
  })
}

/**
 * 增加角色
 * @param {*} data
 * @returns
 */
export function addRole(data) {
  return request({
    url: '/system/system/role',
    method: 'post',
    data
  })
}

/**
 *  修改角色
 * @param {*} data
 * @returns
 */
export function editRole(data) {
  return request({
    url: '/system/system/role',
    method: 'put',
    data
  })
}

/**
 * 搜索单个角色
 * @param {*} params
 * @returns
 */
export function roleSearchOne(params) {
  return request({
    url: `/system/system/role/${params}`,
    method: 'get'
  })
}

/**
 *
 * 删除单个角色
 * @param {*} params
 * @returns
 */
export function deleteRole(params) {
  return request({
    url: `/system/system/role/${params}`,
    method: 'delete'
  })
}

/**
 * 搜索角色拥有的菜单ids列表
 * @param {*} params
 * @returns
 */
export function roleMenu(params) {
  return request({
    url: `/system/system/role/${params}/menu/ids`,
    method: 'get'
  })
}

/**
 * 给角色分配系统
 * @param {*} params
 * @param {*} data
 * @returns
 */
export function systemRole(params, data) {
  return request({
    url: `/system/system/role/${params}/system/save`,
    method: 'post',
    data
  })
}

/**
 * 给角色分配菜单
 * @param {*} id
 * @param {*} data
 * @returns
 */
export function menuRole(id, data) {
  return request({
    url: `/system/system/role/${id}/menu/save`,
    method: 'post',
    data
  })
}
