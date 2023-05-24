<template>
  <el-dialog
    title="查看罚款项"
    :visible.sync="visible"
    width="30%"
    center
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-form
      ref="fineData"
      :model="alterFineForm"
      label-width="80px"
      class="demo-ruleForm"
      label-position="left"
    >
      <el-form-item label="发布人">
        <el-input v-model="alterFineForm.publisherName" :disabled="true" placeholder="请选择发布人姓名" />
      </el-form-item>
      <el-form-item label="处罚人">
        <el-select v-model="alterFineForm.penalizeName" filterable clearable placeholder="请选择处罚人姓名" class="input-width" @change="selectGet">
          <el-option v-for="item in userList" :key="item.id" :label="item.nickName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="罚款金额">
        <el-input v-model="alterFineForm.finePrize" placeholder="请输入罚款金额" />
      </el-form-item>
      <el-form-item label="出据部门">
        <el-select v-model="alterFineForm.fineDepartment" placeholder="请选择出据部门" class="input-width">
          <el-option label="助理办" value="0" />
          <el-option label="效率部" value="1" />
          <el-option label="人事部" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="处罚原因">
        <el-input v-model="alterFineForm.fineReason" type="textarea" />
      </el-form-item>
      <el-form-item label="处罚凭证">
        <UploadCropper :image-url="alterFineForm.voucherUrl" :extend="extend" :class-name="className" @func="controlling" />
      </el-form-item>

    </el-form>
    <span v-if="alterFineForm.state == '3'" slot="footer" class="dialog-footer">
      <el-button type="primary" style="margin-right: 100px" @click="uploadCon">修 改</el-button>
      <el-button type="danger" @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getAllUserInfo, updateFine } from '~/api/fine'
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
    },
    fineData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      alterFineForm: {
        publisherId: '', // 发布人id
        publisherName: '', // 发布人姓名
        penalizeId: '', // 处罚人id
        penalizeName: '', // 被处罚人姓名
        voucherUrl: '', // 处罚凭证
        fineReason: '', // 处罚原因
        finePrize: '', // 处罚金额
        fineDepartment: '', // 出据部门
        state: ''
      },
      userList: [], // 获取所有处罚人信息
      extend: '.jpg,.png,jpeg', // 上传图片格式
      className: 'avatar-uploader' // 上传组件样式
    }
  },
  watch: {
    // 监听罚款项数据回显
    fineData(newVal) {
      this.alterFineForm = newVal
    }
  },
  mounted() {
    this.getAlluserInfo()
    // 获取用户姓名和id
    this.alterFineForm.publisherId = JSON.parse(Cookie.get(Key.userInfoKey)).uid
    this.alterFineForm.publisherName = JSON.parse(Cookie.get(Key.userInfoKey)).nickName
  },
  methods: {
    // 获取处罚人id和数据
    selectGet(vId) {
      let obj = {}
      obj = this.userList.find((item) => {
        return item.id === vId
      })
      this.alterFineForm.penalizeId = obj.id
      this.alterFineForm.penalizeName = obj.nickName
    },
    // 获取所有用户信息
    getAlluserInfo() {
      getAllUserInfo().then(res => {
        this.userList = res.data.userList
        // this.$bus.$emit('layoutMobileResize', this.userList, this.fineForm.publisherId, this.fineForm.publisherName)
      })
    },
    // 修改罚款项
    uploadCon() {
      console.log(this.alterFineForm)
      updateFine(this.alterFineForm).then(() => {
        this.remoteClose()
        this.$message({
          type: 'success',
          message: '修改成功',
          duration: 1500
        })
      })
      this.remoteClose()
    },
    // 上传图片地址
    controlling(item) {
      this.alterFineForm.voucherUrl = item
    },
    // 关闭对话框
    handleClose() {
      this.remoteClose()
    }
  }
}
</script>
<style scoped >
.input-width{
  width: 100%;
}
</style>
