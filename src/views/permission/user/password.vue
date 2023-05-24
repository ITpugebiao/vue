<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="380px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <!-- // label-position 向右对齐                   //表单校验图标 -->
      <el-form
        ref="formData"
        :rules="rules"
        :model="formData"
        label-width="100px"
        label-position="right"
        style="width: 300px"
        status-icon
      >
        <el-form-item label="新密码: " prop="newPassword">
          <el-input
            v-model="formData.newPassword"
            type="password"
            placeholder="请输入新密码"
            maxlength="40"
          />
        </el-form-item>
        <el-form-item label="确认密码: " prop="repPassword">
          <el-input
            v-model="formData.repPassword"
            type="password"
            placeholder="请输入确认密码"
            maxlength="50"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            @click="submitForm()"
          >确定</el-button>
          <el-button size="mini" @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import * as api from '~/api/permission/userRole'
export default {
  props: {
    userId: {
      type: String,
      default: null
    },
    title: {
      // 弹窗的标题
      type: String,
      default: ''
    },
    visible: {
      // 弹窗窗口  默认不自动弹出
      type: Boolean,
      default: false
    },
    remoteClose: {
      // 用于关闭窗口
      type: Function,
      default: function() {}
    }
  },
  data() {
    // 自定义校验器 校验密码是否一致
    const validateRepPassword = (rule, value, callback) => {
      // value就是确认密码
      if (value !== this.formData.newPassword) {
        return callback(new Error('两次输入密码不一致!'))
      }
      return callback()
    }
    return {
      formData: {}, // 提交的表单数据
      rules: {
        newPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 40, message: '长度在6到40个字符', trigger: 'blur' }
        ],
        repPassword: [
          { required: true, message: '请确定密码', trigger: 'blur' },
          { validator: validateRepPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.formData.userId = this.userId
          api.editPassword(this.formData).then(res => {
            this.handleClose()
            this.$message.success('密码修改成功')
          }).catch(() => {
            this.$message.error('密码修改失败')
            this.handleClose()
          })
        }
      })
    },
    handleClose() {
      this.$refs.formData.resetFields()
      this.remoteClose()
    }
  }
}
</script>
