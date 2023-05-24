<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="50%"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-form
      ref="formData"
      :model="form"
      label-width="100px"
      label-position="right"
      style="width: 400px"
      status-icon
      :rules="rules"
    >
      <el-form-item label="角色名称: " prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="备注: ">
        <el-input v-model="form.remark" type="textarea" />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          size="mini"
          @click="submitForm('formData')"
        >确定</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addRole, editRole } from '~/api/permission/defaultRole'
export default {
  name: 'RoleEditDialog',
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
    formData: {
      // 提交表单数据
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]

      }
    }
  },
  computed: {
    form() {
      return this.formData
    }
  },
  methods: {
    // 关闭窗口
    handleClose() {
      this.$refs.formData.resetFields()
      this.remoteClose()
    },

    // 确定
    submitForm(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          this.submitData()
        }
      })
    },

    async submitData() {
      if (this.formData.id) {
        await editRole(this.form)
        this.$message.success('修改角色成功')
      } else {
        await addRole(this.form)
        this.$message.success('增加角色成功')
      }
      this.handleClose()
    }
  }
}
</script>

<style>

</style>
