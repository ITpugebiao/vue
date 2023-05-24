<template>
  <div class="layout-navbars-breadcrumb-index">
    <Breadcrumb />
    <ThemeNav />
  </div>
</template>

<script>
import Breadcrumb from '~/components/Breadcrumb'
import ThemeNav from './ThemeNav.vue'
export default {
  components: {
    Breadcrumb,
    ThemeNav
  }
}
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-index {
	height: 50px;
	display: flex;
  justify-content: space-between;
	align-items: center;
	padding-right: 15px;
	background: var(--bg-topBar);
	overflow: hidden;
	border-bottom: 1px solid #f1f2f3;
}
</style>
