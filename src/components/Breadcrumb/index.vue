<template>
  <div class="layout-navbars-breadcrumb" :style="{ display: isShowBreadcrumb }">
    <i
      class="layout-navbars-breadcrumb-icon"
      :class="getThemeConfig.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      @click="onThemeConfigChange"
    />
    <el-breadcrumb class="app-breadcrumb layout-navbars-breadcrumb-hide" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
          <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
          <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levelList: null
    }
  },
  computed: {
    getThemeConfig() {
      return this.$store.state.themeConfig.themeConfig
    },
    isShowBreadcrumb() {
      const { layout, isBreadcrumb } = this.$store.state.themeConfig.themeConfig
      if (layout === 'classic' || layout === 'transverse') {
        return 'none'
      }
      return isBreadcrumb ? '' : 'none'
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    onThemeConfigChange() {
      this.$store.state.themeConfig.themeConfig.isCollapse = !this.$store.state.themeConfig.themeConfig.isCollapse
    },
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isDashboard(first)) {
        matched = [{ path: '/', meta: { title: '首页' }}].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      // const { params } = this.$route;
      // const toPath = pathToRegexp.compile(path);
      // return toPath(params);
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-navbars-breadcrumb {
	flex: 1;
	height: inherit;
	display: flex;
	align-items: center;
	padding-left: 15px;
  .layout-navbars-breadcrumb-icon {
		cursor: pointer;
		font-size: 18px;
		margin-right: 15px;
		color: #606266;
  }
}
.app-breadcrumb {
  display: flex;
  margin-left: 8px;
  align-items: center;
  .el-breadcrumb {
    display: inline-block;
    font-size: 12px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
}
</style>
