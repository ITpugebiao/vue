<template>
  <div>
    <el-dialog :title="title" :visible.sync="addperformanceForm" :before-close="popupClose" :close-on-click-modal="false">
      <el-form ref="performanceForm" :model="performanceForm" :rules="rules">
        <el-form-item label="绩效项名称:" :label-width="formLabelWidth" prop="performanceName">
          <el-input v-model="performanceForm.performanceName" :disabled="status===3 && !!compileForm.id" autocomplete="off" />
        </el-form-item>
        <div v-if="status===3" class="number">
          <el-form-item label="分数:" label-width="60px" prop="performanceScore">
            <el-input v-model="performanceForm.performanceScore" :disabled="status===3?false:true" class="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="限制次数:" label-width="90px" prop="performanceLimit">
            <el-input v-model="performanceForm.performanceLimit" :disabled="status===3?false:true" autocomplete="off" />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="popupClose()">取 消</el-button>
        <el-button type="primary" @click="addperformance()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addPerformanceItem, compilePerformanceItem } from '~/api/performance/performanceItem'
export default {
  props: {
    // 打开弹出框
    addperformanceForm: {
      type: Boolean,
      default: false
    },
    // 级数
    status: {
      type: Number,
      default: 0
    },
    // 弹出框传递的数据
    compileForm: {
      type: Object,
      default: () => ({})
    },
    // 关闭弹出框
    remoteClose: {
      type: Function,
      default: () => {}
    },
    // 弹出框的标题
    grade: {
      type: String,
      default: ''
    },
    // 添加 绩效项id
    searchId: {
      type: String,
      default: '0'
    },
    // 更新数据
    renewal: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      formLabelWidth: '100px',
      // 弹出框里的字段
      performanceForm: {
        // 名称
        performanceName: '',
        // 分数
        performanceScore: '',
        // 限制次数
        performanceLimit: ''
      },
      rules: {
        performanceName: [
          { required: true, message: '请输入绩效项名称', trigger: 'blur' },
          { min: 1, max: 20, message: '请输入绩效项名称长度应该是1到20', trigger: 'blur' }
        ],
        performanceScore: [
          { required: true, message: '请输入分数', trigger: 'blur' },
          { required: false, pattern: new RegExp(/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/, 'g'), trigger: 'change', message: '请输入最多为两位小数的数字' }
        ],
        performanceLimit: [
          { required: true, message: '请输入限制次数', trigger: 'blur' },
          { required: false, pattern: new RegExp(/^[0-9]*$/, 'g'), trigger: 'change', message: '请输入数字' }
        ]
      }
    }
  },
  /**
     * 监听
    */
  watch: {
    compileForm: {
      immediate: true,
      handler(val) {
        if (val) {
          this.performanceForm = JSON.parse(JSON.stringify(val))
        }
      }
    },
    grade: {
      immediate: true,
      handler(val, oldVal) {
        if (val) {
          this.title = JSON.parse(JSON.stringify(val))
        }
      }
    }
  },
  methods: {
    //  取消
    popupClose() {
      this.remoteClose()
      this.$refs.performanceForm.resetFields()
    },
    // 提交
    addperformance() {
      this.$refs.performanceForm.validate((valid) => {
        if (valid) {
          // 编辑
          if (this.compileForm.id) {
            // console.log(this.compileForm)
            compilePerformanceItem(this.performanceForm)
              .then(() => {
                console.log(this.compileForm.parentId)
                console.log(this.status)
                this.renewal(this.compileForm.parentId)
                this.popupClose()
                this.$message({
                  message: '编辑成功',
                  type: 'success'
                })
              })
          } else {
            // 添加
            addPerformanceItem(this.searchId, this.performanceForm)
              .then(() => {
                // console.log(this.performanceForm)
                this.renewal(this.searchId)
                this.popupClose()
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
              })
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-dialog {
  width: 430px;
}
.number{
  display: flex;
  justify-content: space-between;
  /deep/ .el-input {
     width: 120px;
  }

}
</style>
