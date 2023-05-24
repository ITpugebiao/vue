import request from '~/utils/fetch'

/**
 *查询所有用户信息
 * @param {*}
 * @returns
 */
export function getAllUserInfo() {
  return request({
    url: '/inside/inside/Bfine/getAllUserInfo',
    method: 'get'
  })
}
/**
 * 条件查询对应的罚款项目
 * @returns
 */
export function lookFine(data) {
  return request({
    url: '/inside/inside/Bfine/lookFine',
    method: 'post',
    data
  })
}
/**
 * 添加罚款项目的款项
 * @returns
 */
export function addFine(data) {
  return request({
    url: '/inside/inside/Bfine/addFine',
    method: 'post',
    data
  })
}

/**
 * 根据Id查询罚款项目
 * @param {*} id
 * @returns
 */
export function selectById(id) {
  return request({
    url: `/inside/inside/Bfine/selectById/${id}`,
    method: 'get'
  })
}

/**
 * 修改罚款项目
 * @returns
 */
export function updateFine(data) {
  return request({
    url: '/inside/inside/Bfine/updateFine',
    method: 'put',
    data
  })
}
/**
 * 确认发布罚款
 * @returns
 */
export function releaseFine(data) {
  return request({
    url: '/inside/inside/Bfine/releaseFine',
    method: 'post',
    data
  })
}
/**
 * 根据Id删除罚款项
 * @param {*} id
 * @returns
 */
export function deleteFine(id) {
  return request({
    url: `/inside/inside/Bfine/deleteFine/${id}`,
    method: 'delete'
  })
}

/**
 * 同步订单状态
 * @returns
 */
export function syncFineStatus() {
  return request({
    url: '/inside/inside/Bfine/syncFineStatus',
    method: 'put'
  })
}
