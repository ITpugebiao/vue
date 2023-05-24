<template>
  <div>
    <el-upload
      ref="upload"
      :data="uploadData"
      :class="className"
      :action="host"
      :on-change="handleChange"
      :accept="extend"
      :auto-upload="false"
      :show-file-list="false"
      :http-request="httpRequest"
    >
      <div v-show="className == 'upload-demo'">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传/{{ extend }}文件</div>
      </div>
      <div v-show="className == 'avatar-uploader'">
        <img v-if="imageUrls" :src="imageUrls" onerror="src='https://img0.baidu.com/it/u=1479178160,1916382043&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=505'" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </div>
    </el-upload>

    <Cropper :cut-center-closed="CutCenterClosed" :img-srl="imgSrl" :dialog-visible1="dialogVisible1" @upload="upload" />
  </div>
</template>

<script>
import { searchQuit } from '~/api/oss'
import { randomString } from '~/utils/util'
import Cropper from '../Cropper/index.vue'
import axios from '@/common/axios'
export default {
  components: {
    Cropper
  },
  props: {
    extend: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      uploadData: {},
      fileName: '',
      host: '',
      uploadFile: '',
      imgSrl: '',
      dialogVisible1: false,
      cutOut: ''
    }
  },
  computed: {
    imageUrls() {
      console.log('变化')
      return this.imageUrl
    }
  },
  methods: {
    // submit 之后会触发此方法
    httpRequest(request) {
      this.$refs.upload.clearFiles()
      this.formData = null
      const { action, data, filename } = request
      // 新建formDate对象
      this.formData = new FormData()
      for (const key in data) {
        this.formData.append(key, data[key])
      }
      console.log('this.uploadFile', this.uploadFile)
      // 文件单独push,第三个参数指定上传的文件名
      this.formData.append(filename, this.uploadFile, this.fileName)
      axios
        .baseAxios({
          headers: {
            contentType: 'multipart/form-data' // 需要指定上传的方式
          },
          url: action,
          method: 'post',
          data: this.formData,
          timeout: 200000000 // 防止文件过大超时
        })
        .then(res => {
          if (res.code === 20000) {
            this.$message({
              type: 'success',
              message: `图片上传成功`,
              duration: 1500
            })
            console.log(1231)
            this.bannerUrl = res.data.ossData.filename
            this.cutOut = false
            this.$emit('func', this.bannerUrl)
            this.imgSrl = ''
            this.dialogVisible1 = false
          } else {
            this.$message.error('网络错误')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    async handleChange(file) {
      const { raw, name } = file
      console.log('raw=>', raw)
      this.openCropper(raw)
      this.fileName = name
      this.gainKays()
      this.dialogVisible1 = true
    },
    openCropper(file) {
      var files = file
      const isLt5M = files.size > 5 << 20
      if (isLt5M) {
        this.$message.error('请上传5M内的图片')
        return false
      }
      var reader = new FileReader()
      reader.onload = e => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          // console.log(window.URL.createObjectURL(new Blob([e.target.result])));
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        console.log(data)
        this.imgSrl = data
        console.log(this.imageUrl)
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      console.log('files', files)
      reader.readAsArrayBuffer(files)
      this.showCropper = true
    },
    gainKays() {
      return new Promise((resolve, reject) => {
        searchQuit()
          .then(res => {
            const oss = res.data.ossData
            this.host = oss.host
            this.uploadData.key = oss.dir + '/' + randomString(6) + '/' + '_${filename}'
            this.uploadData.dir = oss.dir
            this.uploadData.host = oss.host
            this.uploadData.policy = oss.policy
            this.uploadData.ossaccessKeyId = oss.accessid
            this.uploadData.signature = oss.signature
            this.uploadData.callback = oss.callback
            resolve(true)
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: '上传失败',
              duration: 1500
            })
            reject(err)
          })
      })
    },
    upload(img) {
      this.uploadFile = img
      console.log(this.uploadFile)
      this.$refs.upload.submit()
    },
    // 关闭修改框清除数据
    CutCenterClosed() {
      this.imgSrl = ''
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #409eff;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}
.avatar {
	width: 178px;
	height: 178px;
	display: block;
}
.flex {
	display: flex;
	flex: 4;
}
.cropper-content {
	width: 400px;
	height: 400px;
	background: pink;
}

.cropper {
	width: 400px;
	height: 400px;
	background: yellow;
}

.footer-btn {
	margin-left: 10px;
	margin-right: 10px;
}
.footer-btn > .el-button {
	display: block;
	width: 30px;
	height: 30px;
	margin: 15px 0px 0px 10px;
}
.notarize {
	margin: 100px 20px 0 50px;
}
.notarize > .el-button {
	display: block;
	text-align: center;
}
</style>
