<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="70%"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <systematic v-if="visible" v-bind="$attrs" v-on="$listeners" />
  </el-dialog>
</template>

<script>
import systematic from '../systematic/index.vue'
export default {
  components: {
    systematic
  },
  props: {
    title: {
      // 标题
      type: String,
      default: ''
    },
    visible: {
      // 弹窗窗口
      type: Boolean,
      default: false
    },
    remoteSystemClose: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    handleClose() {
      this.remoteSystemClose()
    }
  }
}
</script>

<style>

</style>
