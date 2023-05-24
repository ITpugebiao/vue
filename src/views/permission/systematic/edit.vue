<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="500px"
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
        <el-form-item label="系统名称: " prop="systemName">
          <el-input v-model="form.systemName" />
        </el-form-item>
        <el-form-item label="系统类型: " prop="systemType">
          <el-input v-model="form.systemType" />
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
  </div>
</template>

<script>
import { addSystem, editSystem } from '~/api/permission/systemRole'
export default {
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
      // 校验表单
      rules: {
        systemName: [
          { required: true, message: '请输入系统名称', trigger: 'blur' }
        ],
        systemType: [{ required: true, message: '请输入系统类型', trigger: 'blur' }]
      }
    }
  },
  // systemName systemType
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
    submitForm(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          this.submitData()
        }
      })
    },
    async submitData() {
      if (this.form.id) {
        await editSystem(this.form)
        this.$message.success('保存成功')
      } else {
        await addSystem(this.form)
        this.$message.success('保存成功')
      }
      this.handleClose()
    }
  }
}
</script>

<style>

</style>
