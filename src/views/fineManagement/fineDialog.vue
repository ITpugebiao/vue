<template>
  <el-dialog
    title="添加罚款项"
    :visible.sync="visible"
    width="30%"
    center
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-form
      ref="fineForm"
      :model="fineForm"
      :rules="fineRules"
      label-width="80px"
      class="demo-ruleForm"
      label-position="left"
    >
      <el-form-item label="发布人" prop="publisherName">
        <el-input v-model="fineForm.publisherName" :disabled="true" placeholder="请选择发布人姓名" />
      </el-form-item>
      <el-form-item label="处罚人" prop="penalizeName">
        <el-select v-model="fineForm.penalizeName" filterable clearable placeholder="请选择处罚人姓名" class="input-width" @change="selectGet">
          <el-option v-for="item in userList" :key="item.id" :label="item.nickName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="罚款金额" prop="finePrize">
        <el-input v-model="fineForm.finePrize" clearable placeholder="请输入罚款金额" />
      </el-form-item>
      <el-form-item label="出据部门" prop="fineDepartment">
        <el-select v-model="fineForm.fineDepartment" clearable placeholder="请选择出据部门" class="input-width">
          <el-option label="助理办" value="0" />
          <el-option label="效率部" value="1" />
          <el-option label="人事部" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="处罚原因" prop="fineReason">
        <el-input v-model="fineForm.fineReason" type="textarea" />
      </el-form-item>
      <el-form-item label="处罚凭证" prop="voucherUrl">
        <UploadCropper :image-url="fineForm.voucherUrl" :extend="extend" :class-name="className" @func="controlling" />
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" style="margin-right: 100px" @click="pushFine">发 布</el-button>
      <el-button type="danger" @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getAllUserInfo, addFine } from '~/api/fine'
import { Cookie, Key } from '~/utils/cookie'
import UploadCropper from '../../components/UploadCropper'
export default {
  components: {
    UploadCropper
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
      // 添加罚款项表单信息
      fineForm: {
        publisherId: '', // 发布人id
        publisherName: '', // 发布人姓名
        penalizeId: '', // 处罚人id
        penalizeName: '', // 被处罚人姓名
        voucherUrl: '', // 处罚凭证
        fineReason: '', // 处罚原因
        finePrize: '', // 处罚金额
        fineDepartment: ''// 出据部门
      },
      // 添加罚款项校验
      fineRules: {
        publisherName: [
          { required: true, message: '请输入发布人姓名', trigger: 'blur' }
        ],
        penalizeName: [
          { required: true, message: '请输入处罚人姓名', trigger: 'blur' }
        ],
        finePrize: [
          { required: true, message: '请输入处罚金额', trigger: 'blur' }
        ],
        fineDepartment: [
          { required: true, message: '请选择出据部门', trigger: 'blur' }
        ],
        fineReason: [
          { required: true, message: '请输入处罚原因', trigger: 'blur' }
        ],
        voucherUrl: [
          { required: true, message: '请上传处罚凭证', trigger: 'blur' }
        ]
      },
      userList: [], // 获取所有处罚人信息
      extend: '.jpg,.png,jpeg', // 上传图片格式
      className: 'avatar-uploader' // 上传组件样式
    }
  },
  mounted() {
    this.getAlluserInfo()
    // 获取用户姓名和id
    this.fineForm.publisherId = JSON.parse(Cookie.get(Key.userInfoKey)).uid
    this.fineForm.publisherName = JSON.parse(Cookie.get(Key.userInfoKey)).nickName
  },
  methods: {
    // 获取处罚人id和数据
    selectGet(vId) {
      let obj = {}
      obj = this.userList.find((item) => {
        return item.id === vId
      })
      this.fineForm.penalizeId = obj.id
      this.fineForm.penalizeName = obj.nickName
    },
    // 获取所有用户信息
    getAlluserInfo() {
      getAllUserInfo().then(res => {
        this.userList = res.data.userList
      })
    },
    // 添加罚款
    pushFine() {
      this.$refs.fineForm.validate(valid => {
        if (valid) {
          addFine(this.fineForm).then((res) => {
            this.handleClose()
            this.$message({
              type: 'success',
              message: '添加成功',
              duration: 1500
            })
          })
        } else {
          this.$message.error('信息格式错误')
          return false
        }
      })
    },
    // 关闭对话框
    handleClose() {
      this.$refs.fineForm.resetFields()
      this.remoteClose()
    },
    // 上传图片地址
    controlling(item) {
      this.fineForm.voucherUrl = item
    }
  }
}
</script>
<style  scoped>
.input-width{
  width: 100%;
}
</style>
