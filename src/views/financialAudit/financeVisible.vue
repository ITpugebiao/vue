<template>
  <div>
    <el-dialog title="报销" :visible.sync="fromVisible" width="30%" :close-on-click-modal="false" :before-close="ListClose">
      <el-form :model="formData" label-width="100px" label-position="right" style="width: 400px" status-icon>
        <el-form-item label="姓名: " prop="name">
          <!--  eslint-disable-next-line -->
					<!-- <el-input v-model="formData.name"></el-input> -->
          <p>{{ formData.name }}</p>
        </el-form-item>
        <el-form-item label="报销项: " prop="applyProject">
          <!-- <el-input v-model="formData.applyProject" maxlength="50"></el-input> -->
          <p>{{ formData.applyProject }}</p>
        </el-form-item>
        <el-form-item label="报销金额: " prop="applyMoney">
          <!-- <el-input v-model="formData.applyMoney" maxlength="11"></el-input> -->
          <p>{{ formData.applyMoney }}</p>
        </el-form-item>
        <el-form-item label="审报时间: " prop="gmtCreate">
          <!-- <el-input v-model="formData.department" maxlength="50"></el-input> -->
          <p>{{ formData.gmtCreate }}</p>
        </el-form-item>
        <el-form-item label="审计时间: " prop="gmtCreate">
          <!-- <el-input v-model="formData.department" maxlength="50"></el-input> -->
          <p>{{ formData.gmtModified }}</p>
        </el-form-item>
        <el-form-item label="部门: " prop="department">
          <!-- <el-input v-model="formData.department" maxlength="50"></el-input> -->
          <p>{{ formData.department }}</p>
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
            v-permission="'financialAudit:pass'"
            type="primary"
            size="mini"
            @click="financePass(formData.id, 1)"
          >通过</el-button>
          <el-button
            v-permission="'financialAudit:noPass'"
            type="primary"
            size="mini"
            @click="financePass(formData.id, 0)"
          >不通过</el-button>
          <el-button v-permission="'financialAudit:cancel'" size="mini" @click="ListClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { reimbursement } from '~/api/financialAudit'
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
      visible: false
    }
  },
  created() {
  },

  methods: {
    async financePass(id, status) {
      await reimbursement(id, status)
        .then(res => {
          if (res.code === 20000) {
            this.$message({
              message: '审核成功',
              type: 'success'
            })
          }
        })
        .catch(error => {
          this.$message.error(error)
        })
      this.ListClose()
    },
    // 清除list , 关闭
    async ListClose() {
      await this.handleClose()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
