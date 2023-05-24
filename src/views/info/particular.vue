<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="500px"
    :before-close="beforeClose"
    :close-on-click-modal="false"
    :destroy-on-close="true"
  >
    <!-- // label-position 向右对齐                   //表单校验图标 -->
    <el-form :model="user" label-width="100px" label-position="right" style="width: 400px" status-icon>
      <el-form-item label="姓名: " prop="name">
        <el-input v-model="user.name" :disabled="disflag" />
      </el-form-item>
      <el-form-item label="头像: " prop="photo">
        <UploadCropper :image-url="user.photo" :extend="extend" :class-name="className" @func="UserAvater" />
      </el-form-item>
      <el-form-item label="身份证号: " prop="nubmerInfo">
        <el-input v-model="user.nubmerInfo" maxlength="50" :disabled="disflag" />
      </el-form-item>
      <el-form-item label="手机号: " prop="mobile">
        <el-input v-model="user.mobile" maxlength="11" :disabled="disflag" />
      </el-form-item>
      <el-form-item label="邮箱: " prop="pugeEmail">
        <el-input v-model="user.pugeEmail" maxlength="50" :disabled="disflag" />
      </el-form-item>
      <el-form-item v-if="!user.id" label="生日: ">
        <el-input v-model="user.pugeBirthday" maxlength="50" :disabled="disflag" />
      </el-form-item>
      <el-form-item label="工号: " prop="pugeNumber">
        <el-input v-model="user.pugeNumber" maxlength="50" :disabled="disflag" />
      </el-form-item>
      <el-form-item label="籍贯: " prop="nativeInfo">
        <el-input v-model="user.nativeInfo" maxlength="50" :disabled="disflag" />
      </el-form-item>
      <el-form-item label="是否单亲: " prop="yesnoInfo">
        <el-radio-group v-model="user.yesnoInfo" :disabled="disflag">
          <el-radio :label="'1'" border>单亲</el-radio>
          <el-radio :label="'0'" border>双亲</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="家庭人数: " prop="familyNumber">
        <el-input v-model="user.familyNumber" maxlength="50" :disabled="disflag" />
      </el-form-item>
      <el-form-item label="家庭状况: " prop="familyMoneyInfo">
        <el-input v-model="user.familyMoneyInfo" maxlength="50" :disabled="disflag" />
      </el-form-item>
      <el-form-item label="是否离职: " prop="yesnoQuit">
        <el-radio-group v-model="user.yesnoQuit">
          <el-radio :label="'0'" border>未离职</el-radio>
          <el-radio :label="'1'" border>已离职</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="!disflag">
        <el-button type="primary" size="mini" @click="submitForm()">确定</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { EditUserData } from '@/api/info'
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
    userData: {
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
      // 校验表单
      // rules: {
      //   name: [
      //     { required: true, message: '请输入姓名', trigger: 'blur' },
      //     { min: 1, max: 10, message: '长度在1到10个字符', trigger: 'blur' }
      //   ],
      //   nubmerInfo: [{ required: true, message: '请输入身份证号', trigger: 'blur' },
      //   { validator: identity }
      //   ],
      //   mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' },
      //   { validator: checkPhone }],
      //   pugeEmail: [{ required: true, message: '请输入邮箱', trigger: 'blur' },
      //   { validator: checkEmail }],
      //   pugeNumber: [{ required: true, message: '请输入工号', trigger: 'blur' },
      //   { validator: checkNumm }],
      //   nativeInfo: [{ required: true, message: '请输入籍贯', trigger: 'blur' }],
      //   yesnoInfo: [{ required: true, message: '请选择', trigger: 'change' }],
      //   familyNumber: [{ required: true, message: '请输入家庭人数', trigger: 'blur' },
      //   { validator: checkNum }],
      //   familyMoneyInfo: [{ required: true, message: '请输入家庭状况', trigger: 'blur' }],
      //   yesnoQuit: [{ required: true, message: '请选择', trigger: 'change' }]
      // }
      extend: '.jpg,.png',
      className: 'avatar-uploader'
    }
  },
  computed: {
    user() {
      return this.userData
    }
  },
  methods: {
    handleClose() {
      this.$emit('remoteClose')
    },
    beforeClose() {
      // 注意不可以通过  this.visible=false 来关闭，因为它是父组件的属性
      // this.$refs.user.resetFields();
      // this.remoteClose();
      this.$emit('remoteClose')
    },
    submitForm() {
      EditUserData(this.user)
        .then(() => {
          this.$message.success('修改信息成功')
        })
        .catch(() => {
          this.$message.error('修改信息失败')
        })
      this.$emit('remoteClose')
    },
    UserAvater(item) {
      this.user.photo = item
    }
  }
}
</script>

