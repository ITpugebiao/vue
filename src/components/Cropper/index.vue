<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible1"
      :modal="false"
      :close-on-click-modal="false"
      title="裁剪图片"
      width="700px"
      height="600px"
      append-to-body
      @close="CropperCutCenterClosed"
    >
      <div class="flex">
        <div class="cropper-content">
          <div class="cropper">
            <vueCropper ref="cropper" :auto-crop="true" :center-box="true" :img="imgSrls" />
          </div>
        </div>
        <div class="footer-btn">
          <el-button type="success" size="mini" circle @click="changeScale(1)">+</el-button>
          <el-button type="success" size="mini" circle @click="changeScale(-1)">-</el-button>
          <el-button type="success" size="mini" circle @click="rotateLeft">↺</el-button>
          <el-button type="success" size="mini" circle @click="rotateRight">↻</el-button>
        </div>
        <div class="notarize">
          <el-button type="primary" size="mini" @click="saveImg">上传</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  name: 'PugePersonnelMattersSystemIndex',
  components: {
    VueCropper
  },
  props: {
    imgSrl: {
      type: String,
      default: ''
    },
    dialogVisible1: {
      type: Boolean,
      default: false
    },
    cutCenterClosed: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      img: ''
    }
  },
  computed: {
    imgSrls() {
      return this.imgSrl
    }
  },

  mounted() {},

  methods: {
    // 截图缩放大小
    changeScale(x) {
      this.$refs.cropper.changeScale(x)
    },
    // 图片向左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    // 图片向右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    // 获取裁剪之后的图片，默认blob，也可以获取base64的图片
    saveImg() {
      this.$refs.cropper.getCropBlob(data => {
        this.img = data
        console.log('da', data)
        // this.uploadFile = img;
        // this.upload();
        this.$emit('upload', this.img)
        this.CropperCutCenterClosed()
      })
    },
    CropperCutCenterClosed() {
      this.cutCenterClosed()
      this.img = ''
      this.$refs.cropper.clearCrop()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
