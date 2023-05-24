import store from '~/store'

function checkPermission(el, binding) {
  const { value } = binding
  const buttonList = store.getters && store.getters.buttonList
  if (value) {
    const hasPermission = buttonList.some(button => {
      return value === button
    })
    //
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('need roles!')
  }
}

const permission = {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}

export default permission
