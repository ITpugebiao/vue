<template>
  <div class="addApprover">
    <el-dialog title="添加审批人" :visible.sync="addApproverForm" :close-on-click-modal="false" :before-close="cancelAddApprover">
      <el-select ref="nickName" v-model="nickName" clearable placeholder="请选择">
        <el-option
          v-for="(item, index) in addApprover"
          :key="index"
          :label="item.nickName"
          :value="item.id"
          :rules="[{ required: true, message: '审批人不能为空',trigger : 'change'}]"
        />
      </el-select>
      <el-table :data="addApprover">
        <el-table-column align="center" type="index" label="序号" width="100" />
        <el-table-column align="center" prop="nickName" label="姓名" width="160" />
        <el-table-column align="center" prop="pugeLevel" label="级别" width="160" />
        <el-table-column align="center" prop="pugeEmail" label="邮箱" />
        <el-table-column align="center" prop="pugeAvater" label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.pugeAvater" alt="">
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddApprover()">取 消</el-button>
        <el-button type="primary" @click="getAddApprover(nickName)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { selectApprover, appendApprover } from '~/api/performance/approver'

export default {
  props: {
    // 打开弹出框
    addApproverForm: {
      type: Boolean,
      default: false
    },
    // 关闭弹出框
    remoteClose: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      addApprover: [],
      nickName: '',
      additionApprover: {}
    }
  },
  created() {
    this.__init()
  },
  methods: {
    /**
     * 初始化页面
     */
    __init() {
      this.getSelectApprover()
    },
    getSelectApprover() {
      selectApprover().then(res => {
        console.log(res.data.userInterview)
        this.addApprover = res.data.userInterview
      })
    },
    /**
     * 取消
     */
    cancelAddApprover() {
      this.remoteClose()
      this.nickName = ''
    },
    /**
     * 添加
     */
    getAddApprover(id) {
      // 是否填写审批人
      if (this.nickName !== '') {
        // 清空数据 关闭弹窗
        this.cancelAddApprover()
        // 下拉框选择寻找对应的数据
        this.additionApprover = this.addApprover.filter(
          function(item) {
            return item.id === id
          }
        )
        const addition = this.additionApprover[0]
        appendApprover({ approverGrade: addition.pugeLevel, approverId: id, approverName: addition.nickName }).then(res => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        })
        this.$emit('successfullyAddApprover')
      } else {
        this.$message({
          message: '请选择审批人',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.addApprover {
  img {
    width: 60px;
    height: 50px;
  }
  .el-table {
    margin-top: 30px;
  }
}
</style>
