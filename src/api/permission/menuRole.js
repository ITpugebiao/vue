import request from '~/utils/fetch'

/**
 * 菜单查询
 */
export function menuSearch(data) {
  return request({
    url: '/system/system/menu/search',
    method: 'post',
    data
  })
}

/**
 * 删除菜单
 */
export function DeleteMenu(id) {
  return request({
    url: `/system/system/menu/${id}`,
    method: 'delete'
  })
}

/**
 * 一条菜单查询
 */
export function SeeMenu(id) {
  return request({
    url: `/system/system/menu/${id}`,
    method: 'get'
  })
}

/**
 * 编辑菜单
 */
export function EditMenu(data) {
  return request({
    url: '/system/system/menu',
    method: 'put',
    data
  })
}

/**
 * 新增菜单
 */
export function AddMenu(data) {
  return request({
    url: '/system/system/menu',
    method: 'post',
    data
  })
}

export function pugesystem(userId) {
  return request({
    url: `/system/system/pugesystem/user/${userId}`,
    method: 'get'
  })
}

export function pugemenu(userId, systemId) {
  return request({
    url: `/system/system/menu/user/${userId}/${systemId} `,
    method: 'get'
  })
}
