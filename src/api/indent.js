import request from '~/utils/fetch'

// 查询订单信息
export function trackOrder() {
  return request({
    url: '/pay/pay/insideOrder/searchNo',
    method: 'get'
  })
}
