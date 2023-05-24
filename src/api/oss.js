import request from '~/utils/fetch'

/**
 *  获取oss秘钥
 */
export function searchQuit() {
  return request({
    url: '/thirdService/thirdService/oss/policy',
    method: 'get'
  })
}
