<template>
  <el-container class="layout-container">
    <side-bar />
    <el-container class="flex-center layout-main layout-backtop">
      <top />

      <el-scrollbar ref="layoutDefaultsScrollbarRef">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" :key="key" class="container-view" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" :key="key" class="container-view" />
      </el-scrollbar>
    </el-container>
    <el-backtop target=".layout-backtop .el-scrollbar__wrap" />
  </el-container>
</template>

<script>
import top from './top'
import SideBar from './Sidebar'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {
    top,
    SideBar
  },
  computed: {
    ...mapGetters(['isCollapse']),
    key() {
      return this.$route.path
    }
  },
  watch: {
    $route: {
      handler() {
        this.$refs.layoutDefaultsScrollbarRef.wrap.scrollTop = 0
      },
      deep: true
    }
  },
  created() {
    this.onLayoutResize()
    window.addEventListener('resize', this.onLayoutResize)
  },
  methods: {
    onLayoutResize() {
      const clientWidth = document.body.clientWidth
      if (clientWidth < 1000) {
        this.$store.state.themeConfig.themeConfig.isCollapse = false
        this.$bus.$emit('layoutMobileResize', {
          layout: 'default',
          clientWidth
        })
      } else {
        this.$bus.$emit('layoutMobileResize', {
          layout: '',
          clientWidth
        })
      }
    }
  },
  distoryed() {
    window.addEventListener('resize', this.onLayoutResize)
  }
}
</script>

<style lang="scss" scoped>
.layout-main {
  flex-direction: column !important;
}
.container-view {
  padding: 20px;
}
</style>
