import request from '~/utils/fetch'

/**
 * 获取所有公告
 * @returns
 */
export function lookBulletin(data) {
  return request({
    url: '/inside/inside/Bbulletin/lookBulletin',
    method: 'post',
    data
  })
}
/**
 *添加公告
 * @param {*} data
 * @returns
 */
export function addBulletin(data) {
  return request({
    url: '/inside/inside/Bbulletin/addBulletin',
    method: 'post',
    data
  })
}
/**
 *根据Id查询公告
 * @param {*} id
 * @returns
 */
export function selectById(id) {
  return request({
    url: `/inside/inside/Bbulletin/selectById/${id}`,
    method: 'get'
  })
}
/**
 *更新公告
 * @param {*} data
 * @returns
 */
export function updateBulletin(data) {
  return request({
    url: '/inside/inside/Bbulletin/updateBulletin',
    method: 'put',
    data
  })
}

/**
 * 根据Id删除公告
 * @param {*} id
 * @returns
 */
export function deleteBulletin(id) {
  return request({
    url: `/inside/inside/Bbulletin/deleteBulletin/${id}`,
    method: 'delete'
  })
}
