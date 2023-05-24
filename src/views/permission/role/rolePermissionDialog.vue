<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="70%"
      :before-close="handleClose"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <Menu v-if="visible" v-bind="$attrs" v-on="$listeners" />
    </el-dialog>
  </div>
</template>

<script>
import Menu from '../menu/index.vue'
export default {
  components: {
    Menu
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    remoteClose: {
      type: Function,
      default: () => function() {},
      required: true
    }
  },
  data() {
    return {
      loading: false // 加载中  true显示加载中 ， false不显示加载中
    }
  },
  methods: {
    handleClose() {
      this.remoteClose()
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
    margin-top: 30px;
}
</style>
