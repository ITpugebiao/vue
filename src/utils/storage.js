import website from '~/config/website'

const keyName = website.key + '-'

export const setStorage = (key, value) => {
  return localStorage.setItem(keyName + key, value)
}

export const getStorage = (key) => {
  return localStorage.getItem(keyName + key)
}

export const deleteStorage = (key) => {
  return localStorage.removeItem(keyName + key)
}

export const clearStorage = () => {
  return localStorage.clearStorage()
}
