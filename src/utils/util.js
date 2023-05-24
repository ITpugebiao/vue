/* eslint-disable no-prototype-builtins */
/**
 * 设置主题
 */
export const setTheme = (name) => {
  document.body.className = name
}

export const loadStyle = (url) => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

/**
 * 判断屏幕
 */
export const getScreen = () => {
  const width = document.body.clientWidth
  if (width >= 1200) {
    return 3 // 大
  } else if (width >= 992) {
    return 2 //  中
  } else if (width >= 768) {
    return 1 // 小
  }
  return 0 // 超小
}

export const fullscreenEnable = () => {
  const isFullscreen = document.isFullscreen || document.mozIsFullScreen || document.webkitIsFullScreen
  return isFullscreen
}

/**
 * 判断是否全屏
 */
export const fullscreen = () => {
  if (fullscreenEnable()) {
    exitFullScreen()
  } else {
    reqFullScreen()
  }
}

export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen()
  }
}

export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen()
  }
}

/**
 * esc监听全屏
 */
export const listenerfullscreen = (callback) => {
  function listen() {
    callback()
  }

  document.addEventListener('fullscreenchange', function() {
    listen()
  })
  document.addEventListener('mozfullscreenchange', function() {
    listen()
  })
  document.addEventListener('webkitfullscreenchange', function() {
    listen()
  })
  document.addEventListener('msfullscreenchange', function() {
    listen()
  })
}

/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen()
  } else {
    reqFullScreen()
  }
}

/**
 * 生成一个随机数字
 */

export const randomString = (length) => {
  const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; --i) {
    result += str[Math.floor(Math.random() * str.length)]
  }
  return result
}

/**
 * 睡眠1秒
 */
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const deepCopy = (obj) => {
  const newObj = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof key === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }
  return newObj
}
