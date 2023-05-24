<template>
  <div class="layout-navbars-container">
    <NavBarItem />
  </div>
</template>

<script>
// import TagView from '../TagsView/index'
import NavBarItem from './navBarItem.vue'
export default {
  components: {
    // TagView,
    NavBarItem
  }
}
</script>

<style scoped lang="scss">
.layout-navbars-container {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
}
</style>
