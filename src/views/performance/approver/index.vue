<template>
  <div class="approver">
    <div class="approver-search">
      <!-- 搜索框 -->
      <el-input v-model="approverInput" placeholder="请输入内容">
        <el-button slot="append" icon="el-icon-search" @click="seekApprover()" />
      </el-input>
      <!-- 添加按钮 -->
      <el-button class="performance-item-add" type="primary" @click="gainApprovers()">添加审批人</el-button>
    </div>
    <!-- 弹出框 -->
    <AddApprover :remote-close="remoteClose" :add-approver-form="addApproverForm" @successfullyAddApprover="successfullyAdd" />
    <el-table
      :data="approverlist"
      border
      style="width: 100%"
    >
      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="160"
      />
      <el-table-column
        prop="approverName"
        label="姓名"
        align="center"
      />
      <el-table-column
        prop="approverGrade"
        label="等级"
        align="center"
      />
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="300"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="dedeleteApprover(scope.row.approverId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 强制弹出框 -->
    <el-dialog title="" :visible.sync="mandatoryDelete" :close-on-click-modal="false" class="mandatory-delete">
      <el-dialog
        width="30%"
        title=""
        append-to-body
        :close-on-click-modal="false"
      />
      <div>该审批人还有绩效申报未处理，是否强制删除该审批人</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="mandatoryDelete = false">取 消</el-button>
        <el-button type="primary" @click="mandatoryDeleteApprover()"> 确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { gainApprover, searchApprover, deciDedeleteApprover, dedeleteApprover, forceDedeleteApprover } from '~/api/performance/approver'
import AddApprover from '~/views/performance/approver/addApprover/index.vue'
export default {
  components: {
    AddApprover
  },
  data() {
    return {
      // 搜索框绑定的数据
      approverInput: '',
      // 表格数据
      approverlist: [],
      // 添加弹出框
      addApproverForm: false,
      // 强制弹出框
      mandatoryDelete: false,
      // 强制删除id
      mandatoryDeleteId: ''
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
      this.getApprover()
    },
    getApprover() {
      gainApprover().then(res => {
        this.approverlist = res.data.approverlist
      })
    },
    /**
     * 获取审批人
    */
    gainApprovers() {
      this.addApproverForm = true
    },
    /**
     * 模糊查询审批人
    */
    seekApprover() {
      searchApprover({ approverName: this.approverInput }).then(res => {
        this.approverlist = res.data.approverList
      })
    },
    /**
     * 弹出框关闭
    */
    remoteClose() {
      this.addApproverForm = false
      this.getApprover()
    },
    // 添加成功之后重新获取数据
    successfullyAdd() {
      this.getApprover()
    },
    /**
    * 强制删除审批人
    */
    mandatoryDeleteApprover() {
      forceDedeleteApprover(this.mandatoryDeleteId).then(() => {
        this.getApprover()
      })
      this.mandatoryDelete = false
    },
    /**
    * 删除
    */
    dedeleteApprover(approverId) {
      deciDedeleteApprover(approverId).then(res => {
        // 判断审批人是否能直接删除
        if (res.data.num === '1') {
          // 该审批人没有绩效申报未处理，直接删除
          this.$confirm('是否删除该审批人', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            dedeleteApprover(approverId)
            this.getApprover()
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getApprover()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        } else {
          // 强制弹出框打开
          this.mandatoryDeleteId = approverId
          this.mandatoryDelete = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.approver {
  .approver-search{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    /deep/ .el-input {
      width: 500px;
    }
  }
  .mandatory-delete {
    width: 600px;
    margin: 200px auto;
  }
}
</style>
