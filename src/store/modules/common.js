import { setStorage, getStorage } from '~/utils/storage'

const state = {
  language: getStorage('language') || 'zh',
  colorName: '#1890ff',
  isCollapse: false, // 是否折叠
  isFullScren: false,
  themeName: getStorage('themeName') || 'theme-default'
}

const mutations = {
  SET_LANGUAGE(state, language) {
    state.language = language
    setStorage('language', state.language)
  },
  SET_COLOR_NAME: (state, colorName) => {
    state.colorName = colorName
    setStorage('colorName', state.colorName)
  },

  SET_COLLAPSE: (state) => {
    state.isCollapse = !state.isCollapse
  },

  SET_FULLSCREN: (state) => {
    state.isFullScren = !state.isFullScren
  },
  SET_THEME_NAME: (state, themeName) => {
    state.themeName = themeName
    setStorage('themeName', state.themeName)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
