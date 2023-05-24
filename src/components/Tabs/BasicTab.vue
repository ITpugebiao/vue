<template>
  <el-tabs
    v-model="bindValue"
    type="card"
    v-on="$listeners"
  >
    <el-tab-pane
      v-for="item in options"
      :key="item.name"
      :name="item.name"
    >
      <span slot="label">
        <i :class="`iconfont ${item.icon}`" />
        {{ item.label }}
      </span>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    bindValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('update:value', val)
        this.$emit('input', val)
      }
    }
  }
}
</script>
<style lang="scss" scope>
.el-tabs--card > .el-tabs__header {
  margin-bottom: 20px;
  border-bottom: 1px solid #E6EBF1;
  /* margin: 0 auto; */
  .el-tabs__item {
    background-color: #FFFFFF;
    /* width: 118px; */
    /* height: 42px; */
    border-radius: 2px;
    color: #999999;
    text-align: center;
    border: 1px solid #E6EBF1;
    &.is-active {
      background-color: #409EFF;
      color: #FFFFFF;
      border: 1px solid #409EFF;
    }
    &:first-child {
      border-left: 1px solid #E6EBF1;
      border-radius: 4px 2px 2px 4px;
    }
    &:last-child {
      border-radius: 2px 4px 4px 2px;
    }
  }
  .el-tabs__item + .el-tabs__item {
    border-left: none;
  }
  .el-tabs__nav {
    border: none;
  }
}
</style>
