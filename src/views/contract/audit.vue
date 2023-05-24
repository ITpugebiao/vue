<template>
  <div class="app-container">
    <Tabs
      v-model="activeTab"
      :options="options"
      @click.native="changeTab"
    />
    <el-table
      :data="list"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="60"
      />
      <el-table-column
        align="center"
        prop="nickName"
        label="昵称"
      />
      <el-table-column
        align="center"
        prop="contractName"
        label="合同名"
      />
      <el-table-column
        align="center"
        prop="contractStatus"
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.contractStatus === '2'"
            type="warning"
          >审核中</el-tag>
          <el-tag
            v-if="scope.row.contractStatus === '3'"
            type="danger"
          >未解约</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="340"
      >
        <template slot-scope="scope">
          <!-- scope.row 代表想要获取对象里的哪一个值-->
          <el-button
            v-permission="'audit:check'"
            type="success"
            size="mini"
            @click="Examine(scope.row.contractComplete)"
          >
            查看
          </el-button>
          <el-button
            v-permission="'audit:pass'"
            type="success"
            size="mini"
            @click="handleEdit(scope.row)"
          >
            通过
          </el-button>
          <el-button
            v-if="activeTab == '2'"
            v-permission="'audit:nopass'"
            type="danger"
            size="mini"
            @click="handleDelete(scope.row)"
          >
            不通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <auditDialog :visible="dialogVisible" :contract-url="contractUrl" :remote-close="remoteClose" />
  </div>
</template>

<script>
import Tabs from '~/components/Tabs/ButtonTab.vue'
import auditDialog from './auditDialog.vue'
import {
  AuditContract,
  AuditContractTerminate,
  AuditContractNo,
  AuditContractTerminateYes,
  AuditContractYes
} from '~/api/auditContract'
export default {
  components: {
    Tabs,
    auditDialog
  },
  data() {
    return {
      list: [],
      options: [
        {
          name: '2',
          label: '审核中'
        },
        {
          name: '3',
          label: '审核解约'
        }
      ],
      activeTab: '2',
      contractUrl: '',
      dialogVisible: false
    }
  },
  created() {
    this.changeTab()
  },
  methods: {
    changeTab() {
      if (this.activeTab === '2') {
        AuditContract().then(res => {
          this.list = res.data.personalContracts
        })
      } else if (this.activeTab === '3') {
        AuditContractTerminate().then(res => {
          this.list = res.data.personalContracts
        })
      }
    },
    handleEdit(val) {
      this.$confirm('是否审核', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (this.activeTab === '2') {
            AuditContractYes(val)
              .then(() => {
                this.$message({ message: '审核通过', type: 'success' })
                this.changeTab()
              })
              .catch(() => {
                this.$message({ message: '审核失败', type: 'error' })
              })
          } else if (this.activeTab === '3') {
            AuditContractTerminateYes(val)
              .then(() => {
                this.$message({ message: '审核通过', type: 'success' })
                this.changeTab()
              })
              .catch(() => {
                this.$message({ message: '审核失败', type: 'error' })
              })
          }
          this.changeTab()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消审核'
          })
        })
    },
    handleDelete(val) {
      this.$confirm('是否审核?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          AuditContractNo(val).then(() => {
            this.$message({ message: '审核不通过', type: 'danger' })
            this.changeTab()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消审核'
          })
        })
    },
    Examine(url) {
      this.contractUrl = url
      this.dialogVisible = true
    },
    remoteClose() {
      this.dialogVisible = false
      this.contractUrl = ''
    }
  }
}
</script>

<style>
</style>
