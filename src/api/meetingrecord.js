/**
 * 普歌例会记录接口
 */
import request from '~/utils/fetch'
/**
  * 添加例会
  */
export function addmeeting(data) {
  return request({
    url: '/inside/inside/meeting/add',
    method: 'post',
    data
  })
}
/**
 * 删除例会
 */
export function removemeeting(id) {
  return request({
    url: `/inside/inside/meeting/${id}`,
    method: 'delete'
  })
}
/**
 * 修改例会
 */
export function modifymeeting(data) {
  return request({
    url: '/inside/inside/meeting/update',
    method: 'put',
    data
  })
}
/**
 * 查所有例会
 */
// export function findallmeeting(data) {
//   return request({
//     url: '/inside/inside/meeting/find',
//     method: 'post',
//     data
//   })
// }
/**
 * 查询关键字，查相关会议
 */
export function querymeeting(data) {
  return request({
    url: '/inside/inside/meeting/find/one',
    method: 'post',
    data
  })
}

