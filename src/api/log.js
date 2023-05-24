/**
 * 普歌日志接口
 */
import request from '~/utils/fetch'
/**
 * 添加日志
 */
export function addlog(data) {
  return request({
    url: '/inside/inside/log/saveLog',
    method: 'post',
    data
  })
}
/**
 * 删除日志
 */
export function removelog(id) {
  return request({
    url: `/inside/inside/log/deleteLog/${id}`,
    method: 'delete'
  })
}
/**
 * 修改日志
 */
export function modifylog(data) {
  return request({
    url: '/inside/inside/log/updateLog',
    method: 'put',
    data
  })
}
/**
 * 分页查询日志
 */
export function paginglog(data) {
  return request({
    url: '/inside/inside/log/selectSearchLog',
    method: 'post',
    data
  })
}
/**
 * 根据id查看日志详情
 */
export function querylog(id) {
  return request({
    url: `/inside/inside/log/getLog/${id}`,
    method: 'get'
  })
}
