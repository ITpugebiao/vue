<template>
  <div>
    <el-dialog title="文件信息" :visible.sync="formVisible" :close-on-click-modal="false" :before-close="popoverClose">
      <el-form ref="fileForm" :model="fileForms" :rules="rules">
        <el-form-item label="文件名:" :label-width="formLabelWidth" prop="fileName">
          <el-input v-model="fileForms.fileName" autocomplete="off" :disabled="fileForm.id !== undefined" />
        </el-form-item>
        <el-form-item label="文件描述:" :label-width="formLabelWidth" prop="summary">
          <el-input v-model="fileForms.summary" type="textarea" :rows="3" prop="authorName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="文件标签:" :label-width="formLabelWidth" prop="label">
          <el-select v-model="fileForms.label" placeholder="请选择" @change="change">
            <el-option label="全体" value="全体" />
            <el-option label="前端" value="前端" />
            <el-option label="后端" value="后端" />
            <el-option label="实习生" value="实习生" />
          </el-select>
        </el-form-item>
        <el-form-item label="上传者:" :label-width="formLabelWidth" prop="authorName">
          <el-input v-model="fileForms.authorName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="上传文件:" :label-width="formLabelWidth">
          <Upload :class-name="className" :file-list="fileForms.fileUrl" @func="filePath" @clearFileList="clearFileList" />
        </el-form-item>
        <el-form-item label="文件地址:" :label-width="formLabelWidth" prop="fileUrl">
          <el-input v-model="fileForms.fileUrl" :disabled="true" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="popoverClose()">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { uploadFile, compileFile } from '@/api/file'
import Upload from '~/components/Upload/Upload'
export default {
  components: {
    Upload
  },
  props: {
    formVisible: {
      type: Boolean,
      default: false
    },
    // 信息表单
    fileForm: {
      type: Object,
      default: () => {},
      required: true
    },
    remoteClose: {
      type: Function,
      default: function() {}
    },
    remoteCloseFile: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      formLabelWidth: '120px',
      extend: '.pdf',
      className: 'upload-demo',
      image: '',
      rules: {
        fileName: [
          { required: true, message: '请输入文件名', trigger: 'blur' },
          { min: 1, max: 100, message: '长度应该是1到100', trigger: 'blur' }
        ],
        summary: [
          { required: true, message: '请输入文件描述', trigger: 'blur' },
          { min: 1, max: 50, message: '长度应该是1到50', trigger: 'blur' }
        ],
        label: [
          { required: true, message: '请输入文件描述', trigger: 'change' },
          { min: 1, max: 10, message: '长度应该是1到10', trigger: 'change' }
        ],
        authorName: [
          { required: true, message: '请输入上传者', trigger: 'blur' },
          { min: 1, max: 100, message: '长度应该是1到5', trigger: 'blur' }
        ],
        fileUrl: [{ required: true, message: '请上传文件', trigger: 'blur' }]
      },
      list: []
    }
  },
  computed: {
    fileForms() {
      return this.fileForm
    }
  },
  methods: {
    filePath(res) {
      this.$set(this.fileForms, 'fileUrl', res)
    },
    handleChange(file) {
      this.image = URL.createObjectURL(file.raw)
    },
    //  取消
    popoverClose() {
      this.remoteClose()
      this.$refs.fileForm.resetFields()
    },
    /**
     *提交
     */
    onSubmit() {
      this.$refs.fileForm.validate(valid => {
        // 编辑
        if (valid) {
          if (this.fileForm.id) {
            compileFile(this.fileForm).then((res) => {
              this.popoverClose()
              if (res.code === 20000) {
                this.$message({
                  message: '更新成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '更新失败',
                  type: 'error'
                })
                // this.$message.error(res.data.message || '编辑失败')
              }
            })
          } else {
            // 上传
            uploadFile(this.fileForms).then((res) => {
              this.popoverClose()
              if (res.code === 20000) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '添加失败',
                  type: 'error'
                })
              }
            })
          }
        }
      })
    },
    /**
     * 清除
     */
    clearFileList() {
      this.remoteCloseFile()
    },

    change(value) {
      this.fileForms.label = value
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-dialog {
  width: 490px;
}
/deep/ textarea, /deep/ .el-input__inner, /deep/ .el-upload-dragger {
  width: 290px;
}
</style>
