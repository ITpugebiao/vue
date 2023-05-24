/**
 * 邮箱
 */

export const checkEmail = function(rule, value, callback) {
  if (/^([a-zA-Z0-9_-])+@puge.email$/.test(value) === false) {
    callback(new Error('请输入正确的邮箱'))
  } else {
    callback()
  }
}

/* 手机号 */
export const checkPhone = (rule, value, callback) => {
  if (/^1[3456789]\d{9}$/.test(value) === false) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

/*
 * 身份证号
 */
export const identity = (rule, value, callback) => {
  if (/^[0-9]{19}/.test(value)) {
    callback(new Error('请输入正确的身份证号'))
  } else {
    callback()
  }
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 用户名
export const checkNum = (rule, value, callback) => {
  if (value) {
    if (/[\u4E00-\u9FA5]/g.test(value)) {
      callback(new Error('不能包含中文!'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
// 工号
export const checkNumm = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入普歌工号'))
  }
  const reg = /^[0-9]{3,15}$/
  if (reg.test(value)) {
    callback()
  } else {
    return callback(new Error('请输入正确的工号'))
  }
}

