import axios from 'axios'
import { showLoading, hideLoading } from './loading'
import { Message } from 'element-ui'
import {
  Cookie,
  Key
} from './cookie'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
})

service.interceptors.request.use(params => {
  showLoading()
  const hash = window.location.hash.replace('#', '') === '/register'
  const config = {
    ...params,
    url: `${params.url}`
  }
  if (!hash) {
    config.headers = { Authorization: `Bearer ${Cookie.get(Key.accessTokenKey)?.replace(/"/g, '')}` }
  }
  return config
})
service.interceptors.response.use(response => {
  hideLoading()
  const res = response.data
  if (res.code !== 20000) {
    Message({
      message: res.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(res.message || 'Error')
  }
  return res
},
error => {
  hideLoading()
  if (error.response && error.response.status === 401 && error.response.data.code && error.response.data.code === 1401) {
    let isLock = true
    if (isLock && Cookie.get(Key.refreshTokenKey)) {
      // 有刷新令牌
      isLock = false
      window.location.href = `${process.env.VUE_APP_AUTH_URL}/refresh?redirectURL=${window.location.href}`
    } else {
      window.location.href = `${process.env.VUE_APP_AUTH_URL}?redirectURL=${window.location.href}`
    }
    return Promise.reject(error.message || 'Error')
  }
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default service
