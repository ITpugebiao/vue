import request from '~/utils/fetch'

/**
 * 注册
 */
export function Register(data) {
  return request({
    url: '/system/api/user/register',
    method: 'post',
    data
  })
}

/**
 * 用户名检测
 */
export function Checkout(username) {
  return request({
    url: `/system/api/user/username/${username}`,
    method: 'get'
  })
}
