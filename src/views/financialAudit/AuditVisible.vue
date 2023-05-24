<template>
  <div>
    <el-dialog title="审核" :visible.sync="fromVisible" width="30%" :close-on-click-modal="false" :before-close="PictureArrayClose">
      <el-form :model="formData" label-width="100px" label-position="right" style="width: 400px" status-icon>
        <el-form-item label="姓名: " prop="name">
          <!--  eslint-disable-next-line -->
					<p>{{ formData.name }}</p>
        </el-form-item>
        <el-form-item label="报销项: " prop="applyProject">
          <p>{{ formData.applyProject }}</p>
        </el-form-item>
        <el-form-item label="报销金额: " prop="applyMoney">
          <p>{{ formData.applyMoney }}</p>
        </el-form-item>
        <el-form-item label="审报时间: " prop="gmtCreate">
          <!-- <el-input v-model="formData.department" maxlength="50"></el-input> -->
          <p>{{ formData.gmtCreate }}</p>
        </el-form-item>
        <el-form-item label="部门: " prop="department">
          <p>{{ formData.department }}</p>
        </el-form-item>
        <el-form-item label="证明人: " prop="witness">
          <p>{{ formData.witness }}</p>
        </el-form-item>
        <el-form-item label="报销凭证: " prop="payPicture">
          <viewer>
            <img :src="formData.payPicture ? formData.payPicture : 'https://img0.baidu.com/it/u=1479178160,1916382043&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=505'" style="width: 80px;height: 80px">
          </viewer>
        </el-form-item>
        <el-form-item label="报销二维码: " prop="payerQrcode">
          <viewer>
            <img :src="formData.payerQrcode ? formData.payerQrcode : 'https://img0.baidu.com/it/u=1479178160,1916382043&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=505'" style="width: 80px;height: 80px">
          </viewer>
        </el-form-item>
        <el-form-item>
          <el-button
            v-permission="'financialAudit:passAudit'"
            type="primary"
            size="mini"
            @click="pass(formData.id, 1)"
          >通过</el-button>
          <el-button
            v-permission="'financialAudit:noPassAudit'"
            type="primary"
            size="mini"
            @click="pass(formData.id, 0)"
          >不通过</el-button>
          <el-button v-permission="'financialAudit:cancelAudit'" size="mini" @click="PictureArrayClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { comptroller } from '~/api/financialAudit'
export default {
  name: 'PugePersonnelMattersSystemAuditvisible',
  props: {
    formData: {
      type: Object,
      default: () => {}
    },
    fromVisible: {
      type: Boolean,
      default: false
    },
    handleClose: {
      type: Function,
      default: function() {}
    }
  },

  data() {
    return {
    }
  },

  mounted() {},

  methods: {
    async pass(id, status) {
      await comptroller(id, status)
        .then(res => {
          if (res.code === 20000) {
            this.$message({
              message: '审计成功',
              type: 'success'
            })
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
      this.PictureArrayClose()
    },

    // 清除放大列表
    PictureArrayClose() {
      this.handleClose()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
