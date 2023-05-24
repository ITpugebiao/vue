// 文件管理
import request from '~/utils/fetch'

/**
 * 搜索栏条件查询文件
 * @param {*} data
 * @returns
 */
export function searchFile(data) {
  return request({
    url: '/inside/inside/file/search',
    method: 'post',
    data
  })
}
/**
 * 删除文件
 * @param {*} data
 * @returns
 */
export function deleteFile(id) {
  return request({
    url: `/inside/inside/file/removeFile/${id}`,
    method: 'delete'
  })
}
/**
 * 更新文件
 * @param {*} data
 * @returns
 */
export function compileFile(data) {
  return request({
    url: '/inside/inside/file/updateFile',
    method: 'put',
    data
  })
}

/**
 * 上传文件
 * @param {*} data
 * @returns
 */
export function uploadFile(data) {
  return request({
    url: '/inside/inside/file/saveFile',
    method: 'post',
    data
  })
}

/**
 * 下载文件
 * @param {*} data
 * @returns
 */
export function downloadFile(id) {
  return request({
    url: `/inside/inside/file/downloadFile/${id}`,
    method: 'get'
  })
}
