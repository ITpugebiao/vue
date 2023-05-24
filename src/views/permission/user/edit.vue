<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="500px"
    :before-close="remoteClose"
    :close-on-click-modal="false"
    :destroy-on-close="true"
  >
    <!-- // label-position 向右对齐                   //表单校验图标 -->
    <el-form ref="form" :model="form" label-width="100px" label-position="right" style="width: 400px" status-icon>
      <el-form-item label="用户名: " prop="username">
        <!--  eslint-disable-next-line -->
				<el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="用户头像: " prop="username">
        <UploadCropper :extend="extend" :class-name="className" :image-url="form.pugeAvater" @func="AccountAvater" />
      </el-form-item>
      <el-form-item label="昵称: " prop="nickName">
        <el-input v-model="form.nickName" maxlength="50" />
      </el-form-item>
      <el-form-item label="手机号: " prop="mobile">
        <el-input v-model="form.mobile" maxlength="11" />
      </el-form-item>
      <el-form-item label="邮箱: " prop="pugeEmail">
        <el-input v-model="form.pugeEmail" maxlength="50" />
      </el-form-item>
      <el-form-item label="密码过期: " prop="isCredentialsNonExpired">
        <el-radio-group v-model="form.isCredentialsNonExpired" :disabled="disflag">
          <el-radio :label="1" border>未过期</el-radio>
          <el-radio :label="0" border>已过期</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="账户过期: " prop="isAccountNonExpired">
        <el-radio-group v-model="form.isAccountNonExpired" :disabled="disflag">
          <el-radio :label="1" border>未过期</el-radio>
          <el-radio :label="0" border>已过期</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="账号锁定: " prop="isAccountNonLocked">
        <el-radio-group v-model="form.isAccountNonLocked" :disabled="disflag">
          <el-radio :label="1" border>未过期</el-radio>
          <el-radio :label="0" border>已过期</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submitForm('form')">确定</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import * as api from '~/api/permission/userRole'
import UploadCropper from '~/components/UploadCropper/index'
export default {
  components: {
    UploadCropper
  },
  props: {
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
      type: Function,
      default: function() {}
    }, // 用于关闭窗口
    forms: {
      // 提交表单数据
      type: Object,
      default: () => {}
    },
    disflag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      extend: '.jpg,.png',
      className: 'avatar-uploader'
    }
  },
  computed: {
    form() {
      return this.forms
    }
  },
  methods: {
    handleClose() {
      // 注意不可以通过  this.visible=false 来关闭，因为它是父组件的属性
      this.$refs.form.resetFields()
      this.remoteClose()
    },
    async submitForm() {
      if (!this.form.id) {
        this.$emit('userPassword', this.form.username)
      }
      this.submitData()
    },

    async submitData() {
      let response = null
      if (this.form.id) {
        response = await api.editUser(this.form)
      } else {
        response = await api.addUser(this.form)
      }
      if (response.code === 20000) {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        // 关闭窗口
        this.handleClose()
      } else {
        this.$message({
          message: '保存失败',
          type: 'error'
        })
      }
    },

    AccountAvater(item) {
      this.form.pugeAvater = item
    }
  }
}
</script>
