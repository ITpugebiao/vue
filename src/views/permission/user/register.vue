<template>
  <div>
    <el-dialog
      title="扫码注册"
      :visible.sync="visible"
      width="250px"
      :before-close="close"
      :close-on-click-modal="false"
      @open="open"
    >
      <div
        v-if="flag"
        ref="qrCodeUrl"
        class="qrcode"
      />
    </el-dialog>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  props: {
    visible: {
      // 弹窗窗口  默认不自动弹出
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      flag: false
    }
  },
  mounted() {
  },
  methods: {
    creatQrCode() {
      this.qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: `${window.location.origin}/#/register`, // 需要转换为二维码的内容
        width: 200,
        height: 200,
        colorDark: '#e7ab8c',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    },
    open() {
      this.flag = true
      this.$nextTick(() => {
        this.creatQrCode()
      })
    },
    close() {
      this.flag = false
      this.$emit('close', false)
    }
  }
}
</script>

<style>
.el-dialog__body{
  margin: auto;
}
</style>
