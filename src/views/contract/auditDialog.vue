<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      width="30%"
      :before-close="remoteClose"
      :close-on-click-modal="false"
    >
      <img width="100%" :src="contractUrl">
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    contractUrl: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    remoteClose: {
      type: Function,
      default: function() {}
    }
  }
}
</script>

<style></style>
