import Vue from 'vue'
import App from '~/App.vue'
import router from '~/router'
import store from '~/store'
import i18n from '~/lang'
import Element from 'element-ui'
import '~/assets/styles/index.scss'
import '~/permission'
import '~/directives'
import { loadStyle } from './utils/util'
import iconfont from '~/config/iconfontSite'
import 'element-ui/lib/theme-chalk/index.css'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

const req = require.context('~/assets/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
iconfont.iconfontVersion.forEach(ele => {
  loadStyle(iconfont.iconfontUrl.replace('$key', ele))
})
Vue.use(Element)
Vue.use(Viewer)
Viewer.setDefaults({
  // 需要配置的属性 注意属性并没有引号
  title: false,
  toolbar: true,
  navbar: false
})
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
