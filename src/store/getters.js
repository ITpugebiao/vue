const getters = {
  token: state => state.user.token,
  isCollapse: state => state.common.isCollapse,
  isFullScren: state => state.common.isFullScren,
  themeName: state => state.common.themeName,
  visitedViews: state => state.tagsView.visitedViews,
  language: state => state.common.language,

  // 菜单按钮权限
  init: state => state.menu.init,
  menuList: state => state.menu.menuList,
  buttonList: state => state.menu.buttonList,

  themeConfig: state => state.themeConfig.themeConfig
}

export default getters
