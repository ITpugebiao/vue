// 清除缓存
import request from '~/utils/fetch'

/**
 * 清除测试缓存
 * @returns
 */
export function ClearTestEnvironment() {
  return request({
    url: '/inside/inside/BClearCache/ClearIntranetVPN',
    method: 'get'
  })
}

/**
 *  清除线上缓存
 * @returns
 */
export function ClearProdEnvironment() {
  return request({
    url: '/inside/inside/BClearCache/ClearProdVPN',
    method: 'get'
  })
}
