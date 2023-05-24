const state = {
  themeConfig: {
    layout: 'defaults',
    isCollapse: false,
    isBreadcrumb: true
  }
}

const mutations = {
  // 设置布局配置
  getThemeConfig(state, data) {
    state.themeConfig = data
  }
}

const actions = {
  // 设置布局配置
  setThemeConfig({ commit }, data) {
    commit('getThemeConfig', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
