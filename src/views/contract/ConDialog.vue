<template>
  <el-dialog
    :visible.sync="visible"
    width="500px"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :destroy-on-close="true"
  >
    <el-form
      ref="contractData"
      label-width="100px"
      label-position="right"
      style="width: 400px"
      status-icon
      :model="contractData"
      :rules="rules"
    >
      <el-form-item label="合约名:" prop="contractName">
        <!--  eslint-disable-next-line -->
				<el-input v-model="contractData.contractName"></el-input>
      </el-form-item>
      <el-form-item label="是否缴费:">
        <el-radio-group v-model="status" @change="change">
          <el-radio :label="1" border>是</el-radio>
          <el-radio :label="0" border>否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="缴费金额:">
        <!--  eslint-disable-next-line -->
				<el-input :disabled="status == 1 ? false : true" v-model="contractData.contractPrice"></el-input>
      </el-form-item>

      <el-form-item label="上传:">
        <Upload :extend="extend" :class-name="className" @func="contractPPT" />
      </el-form-item>
      <el-form-item label="文件链接:" prop="contractContent">
        <!--  eslint-disable-next-line -->
        <el-input v-model="contractData.contractContent" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submitForm('contractData')">确定</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import Upload from '~/components/Upload/Upload'
import { addContract, putContract } from '~/api/contract'
export default {
  components: {
    Upload
  },
  props: {
    visible: {
      // 弹窗窗口  默认不自动弹出
      type: Boolean,
      default: false
    },
    remoteClose: {
      type: Function,
      default: function() {}
    }, // 用于关闭窗口
    contractData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      rules: {
        contractName: [{ required: true, message: '请输入合约名', trigger: 'blur' }],
        contractContent: [{ required: true, message: '请上传文件', trigger: 'blur' }]
      },
      status: 1,
      extend: '.pdf',
      className: 'upload-demo'
    }
  },
  methods: {
    contractPPT(res) {
      this.$set(this.contractData, 'contractContent', res)
    },
    submitForm(contractData) {
      this.$refs[contractData].validate(valid => {
        if (valid) {
          this.uploadCon()
        } else {
          this.$message.error('信息格式错误')
          return false
        }
      })
    },
    change(val) {
      if (val === 0) {
        // eslint-disable-next-line
				this.contractData.contractPrice = '';
      }
    },
    uploadCon() {
      if (this.contractData.id) {
        putContract(this.contractData).then(() => {
          this.remoteClose()
          this.message = ''
        })
      } else {
        addContract(this.contractData).then(() => {
          this.remoteClose()
          this.message = ''
        })
      }
    },
    handleClose() {
      this.$refs.contractData.resetFields()
      this.remoteClose()
      this.message = ''
      this.status = 1
    }
  }
}
</script>

