<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="500px"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-form ref="formData" :rules="rules" :model="formData" label-width="100px" label-position="right" style="width:400px" status-icon>
      <el-form-item label="类型: " prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio v-if="formData.parentId !== 0" :label="2">菜单</el-radio>
          <el-radio v-if="formData.parentId !== 0" :label="3">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="名称: " prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="权限标识: " prop="code">
        <el-input v-model="formData.code" />
      </el-form-item>
      <el-form-item label="系统标识: " prop="systemType">
        <el-input v-model="formData.systemType" />
      </el-form-item>
      <el-form-item v-if="formData.type !==3" label="请求地址: " prop="url">
        <el-input v-model="formData.url" />
      </el-form-item>
      <el-form-item v-if="formData.type !==3" label="图标: " prop="icon">
        <el-input v-model="formData.icon" />
      </el-form-item>
      <el-form-item label="排序: " prop="sort">
        <el-input-number
          v-model="formData.sort"
          :min="1"
          :max="10000"
          style="width:300px"
        />
      </el-form-item>
      <el-form-item label="备注: ">
        <el-input v-model="formData.remark" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submitForm('formData')">确定</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { EditMenu, AddMenu } from '~/api/permission/menuRole'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    remoteClose: {
      type: Function,
      default: function() {}
    },
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    // 校验表单
    return {
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入权限标识', trigger: 'blur' }],
        systemType: [{ required: true, message: '请输入系统标识', trigger: 'blur' }],
        url: [{ required: true, message: '请输入请求地址', trigger: 'blur' }],
        icon: [{ required: true, message: '请输入图标', trigger: 'blur' }],
        type: [{ required: true, message: '请输入类型', trigger: 'change' }],
        sort: [{ required: true, message: '请选择排序', trigger: 'change' }]
      }
    }
  },
  computed: {
    formData() {
      return this.form
    }
  },
  methods: {
    submitForm(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          if (this.formData.type === 3) {
            this.formData.url = ''
            this.formData.icon = ''
          }
          this.submitData()
        } else {
          return false
        }
      })
    },
    async submitData() {
      let response = null
      if (this.formData.id) {
        response = await EditMenu(this.formData)
      } else {
        response = await AddMenu(this.formData)
      }
      if (response.code === 20000) {
        this.$message({ message: '保存成功', type: 'success' })
        this.handleClose()
      } else {
        this.$message({ message: '保存失败', type: 'error' })
      }
    },
    // 关闭窗口
    handleClose() {
      this.$refs.formData.resetFields()
      this.remoteClose()
    }
  }
}
</script>
