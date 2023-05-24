<template>
  <div>
    <el-upload
      ref="upload"
      :data="uploadData"
      :class="className"
      :action="host"
      :before-upload="handleChange"
      :accept="extend"
      :on-success="upSuccess"
      :file-list="fileLists"
      :limit="1"
      :before-remove="beforeRemove"
      :on-exceed="Exceed"
      :on-remove="onRemove"
    >
      <div v-show="className == 'upload-demo'">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传/{{ extend }}文件</div>
      </div>
      <div v-show="className == 'avatar-uploader'">
        <img v-if="imageUrl" onerror="src='https://img0.baidu.com/it/u=1479178160,1916382043&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=505'" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </div>
    </el-upload>
  </div>
</template>

<script>
import { searchQuit } from '~/api/oss'
import { randomString } from '~/utils/util'
import { getUUID } from '@/utils/Time'
export default {
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
    },
    fileList: {
      type: [String, Array],
      required: false,
      default: () => ''
    }
  },
  data() {
    return {
      uploadData: {},
      fileName: '',
      host: '',
      fileLists: []
    }
  },
  watch: {
    fileList(value) {
      // 重置的情况下。文件列表清空
      if (!value || !value.length) {
        this.fileLists = []
      }
    }
  },

  created() {
    this.editFileList()
  },
  methods: {
    beforeRemove(file) {
      return this.$confirm(`确定移除  ${file.name}？`)
    },
    onRemove() {
      this.$refs.upload.clearFiles()
      this.fileLists = []
      this.$emit('clearFileList')
      this.$emit('func', '')
    },
    async handleChange(file) {
      const { name } = file
      this.fileName = name
      await this.gainKays()
    },
    gainKays() {
      return new Promise((resolve, reject) => {
        searchQuit()
          .then(res => {
            const oss = res.data.ossData
            this.host = oss.host
            this.uploadData.key = oss.dir + '/' + randomString(6) + '/' + this.fileName
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
    editFileList() {
      const fileList = this.fileList
      // console.log('fileList:', fileList)
      // 封面直传字符串形式
      if (typeof fileList === 'string' && fileList) {
        // a-upload规范格式key
        this.fileLists = [{
          uid: getUUID(),
          url: fileList,
          name: '共享文件' // file的名字，url中获取
        }]
      }
    },
    async upSuccess(res) {
      // this.fileLists.push({ name: this.fileName, url: this.fileList.fileUrl })
      await this.$emit('func', res.data.ossData.filename)
      this.$message({
        type: 'success',
        message: '上传成功',
        duration: 1500
      })
    },
    Exceed() {
      this.$message.error('文件已达最大上传数量')
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
</style>
