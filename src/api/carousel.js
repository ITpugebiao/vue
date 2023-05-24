// 轮播图管理
import request from '~/utils/fetch'

/**
 * 查询所有的轮播
 * @returns
 */
export function SearchCarousel() {
  return request({
    url: '/inside/inside/Binspirational-picture/selectAllPictur',
    method: 'get'
  })
}
/**
 * 添加轮播图
 * pictureUrl 图片地址
 * sentence 励志语
 * @param {*} data
 * @returns
 */
export function AddCarousel(data) {
  return request({
    url: '/inside/inside/Binspirational-picture/savePicture',
    method: 'post',
    data
  })
}
/**
 * 删除轮播图
 * @param {*} id
 * @returns
 */
export function DeleteCarousel(id) {
  return request({
    url: `inside/inside/Binspirational-picture/deletPicture/${id}`,
    method: 'delete'
  })
}
