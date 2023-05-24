<template>
  <el-header :height="setHeaderHeight" class="layout-header">
    <navBar />
  </el-header>
</template>

<script>
import { mapGetters } from 'vuex'
import { fullscreenToggel, listenerfullscreen } from '~/utils/util'
import navBar from './navBar.vue'

export default {
  components: {
    navBar
  },
  data() {
    return {
      showColor: true,
      showDebug: true,
      showTheme: true,
      showFullScren: true,
      userInfo: {
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      }
    }
  },

  computed: {
    ...mapGetters([
      'isCollapse',
      'isFullScren',
      'themeConfig'
    ]),
    setHeaderHeight() {
      const { layout } = this.themeConfig
      if (layout !== 'classic') {
        return '84px'
      }
      return '100px'
    }
  },

  mounted() {
    listenerfullscreen(this.setScreen)
  },

  methods: {
    setCollapse() {
      this.$store.commit('common/SET_COLLAPSE')
    },

    logout() {
      this.$confirm(this.$t('logoutTip'), this.$t('tip'), {
        confirmButtonText: this.$t('submitText'),
        cancelButtonText: this.$t('cancelText'),
        type: 'warning'
      }).then(() => {
        window.location.href = `${process.env.VUE_APP_AUTH_URL}/logout?redirectURL=${window.location.href}`
      }).catch(() => {})
    },

    setScreen() {
      this.$store.commit('common/SET_FULLSCREN')
    },

    handleScreen() {
      fullscreenToggel()
    }
  }
}
</script>

<style lang="scss">
</style>
