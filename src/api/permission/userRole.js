import request from '~/utils/fetch'

/**
 * 用户查询
 */
export function userSearch(data) {
  return request({
    url: '/system/system/user/search',
    method: 'post',
    data
  })
}

/**
 * 新增用户
 */
export function addUser(data) {
  return request({
    url: '/system/system/user',
    method: 'post',
    data
  })
}

/**
 * 删除用户
 */
export function deleteUser(id) {
  return request({
    url: `/system/system/user/${id}`,
    method: 'delete'
  })
}

/**
 * 修改用户
 */
export function editUser(data) {
  return request({
    url: '/system/system/user',
    method: 'put',
    data
  })
}

/**
 * 一条用户查询
 */
export function echoData(id) {
  return request({
    url: `/system/system/user/${id}`,
    method: 'get'
  })
}

/**
 * 查询用户的角色ids
 */
export function SearchRole(id) {
  return request({
    url: `/system/system/user/${id}/role/ids`,
    method: 'get'
  })
}

/**
 * 给用户分配角色
 */
export function setRole(id, roleIds) {
  return request({
    url: `/system/system/user/${id}/role/save`,
    method: 'post',
    data: roleIds
  })
}

/**
 *修改密码
 */
export function editPassword(data) {
  return request({
    url: '/system/system/user/password',
    method: 'put',
    data
  })
}
