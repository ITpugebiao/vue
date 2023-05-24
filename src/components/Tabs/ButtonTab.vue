<template>
  <div class="button-tab">
    <basic-tab
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import BasicTab from './BasicTab.vue'
export default {
  components: {
    BasicTab
  }
}
</script>

<style lang="scss" scoped>
.button-tab{
  ::v-deep .el-tabs--card>.el-tabs__header{
    border: none;
    .el-tabs__nav{
      border: none;
    }
    .el-tabs__item{
      border: none;
      margin-left: 2px;
    }
  }
}
</style>
