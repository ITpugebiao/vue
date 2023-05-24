<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :fullscreen="true"
      center
      :before-close="handleClose"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <template slot="title"><p class="title">发布公告</p></template>
      <el-form ref="afficheform" :model="afficheform" :rules="afficheRules" label-width="80px" label-position="right" status-icon>
        <el-form-item label="标题" prop="title">
          <el-input v-model="afficheform.title" placeholder="请填写标题" clearable class="input-width" />
        </el-form-item>
        <el-form-item label="发布人" prop="publisher">
          <el-input v-model="afficheform.publisher" disabled="true" placeholder="请填写发布人" class="input-width" />
        </el-form-item>
        <el-form-item label="所属部门" prop="department">
          <el-select v-model="afficheform.department" clearable placeholder="请选择部门" class="input-width">
            <el-option label="助理办" value="0" />
            <el-option label="人事部" value="1" />
            <el-option label="效率部" value="2" />
            <el-option label="宣传部" value="3" />
            <el-option label="资产部" value="4" />
          </el-select>
        </el-form-item>
        <!-- 富文本编辑器 -->
        <editor ref="editor" @changeHtml="changeHtml" />

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" style="margin-right: 100px" @click="submitForm">发 布</el-button>
        <el-button type="danger" @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// 引入富文本组件
import editor from '../../components/Editor/index'
import { Cookie, Key } from '~/utils/cookie'
// 引入Api
import { addBulletin } from '~/api/affiche'
export default {
  components: {
    editor
  },
  props: {
    visible: {
      // 弹窗窗口  默认不自动弹出
      type: Boolean,
      default: false
    },
    // 关闭对话框
    remoteClose: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      afficheform: {
        content: '',
        publisher: '',
        department: '',
        title: ''
      },
      // 表单校验
      afficheRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        publisher: [
          { required: true, message: '请输入发布人', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请输入发布部门', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.afficheform.publisher = JSON.parse(Cookie.get(Key.userInfoKey)).nickName
  },
  methods: {
    init() {
      this.$refs.editor.setHtml(this.myeditor)
    },
    save() {
      this.myeditor = this.$refs.editor.getHtml()
    },
    // 获取富文本正文
    changeHtml(data) {
      this.afficheform.content = data
    },
    // 关闭对话框的监听
    handleClose() {
      this.$refs.afficheform.resetFields()
      this.remoteClose()
    },
    // 发布公告
    submitForm() {
      this.$refs.afficheform.validate((valid) => {
        if (valid && this.afficheform.content !== '') {
          addBulletin(this.afficheform).then(res => {
            this.$message({
              type: 'success',
              message: '发布成功',
              duration: 1500
            })
            this.handleClose()
          })
        } else {
          this.$message({
            type: 'error',
            message: '请将信息填写完整！',
            duration: 1500
          })
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
/* .input-width{
  width: 15%;
} */
.title {
  font-size: 30px;
  font-weight: 300;
  text-shadow: 0 8px 5px #8896ab;
}
</style>
