import axios from 'axios'

export default {
  baseAxios(options) {
    const { url, method, data, timeout, ...others } = options
    return axios({
      url,
      method,
      ...others,
      data,
      timeout
    })
      .then(({ data }) => {
        return Promise.resolve(data)
      }).catch(err => {
        return Promise.reject(err)
      })
  }
}
