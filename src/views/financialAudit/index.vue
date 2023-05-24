<template>
  <div>
    <el-tabs v-model="activeName">
      <!-- 之所以用三个是因为没有实现缓存,每次切换都得调接口 -->
      <el-tab-pane label="报销中" name="Bepaied">
        <el-table :data="userDatas.Bepaied" border stripe style="width: 100%">
          <el-table-column align="center" type="index" label="序号" width="60" />
          <el-table-column align="center" prop="name" label="姓名" />
          <el-table-column align="center" prop="applyProject" label="报销项" />
          <el-table-column align="center" prop="applyMoney" label="报销金额" />
          <el-table-column align="center" prop="department" label="部门" />
          <el-table-column align="center" prop="gmtCreate" label="申请时间" />
          <el-table-column align="center" prop="auditStatus" label="审计状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.auditStatus == 1" type="success">已通过</el-tag>
              <el-tag v-if="scope.row.auditStatus == 0" type="danger">未通过</el-tag>
              <el-tag v-if="scope.row.auditStatus == 2" type="warning">审计中</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ifBepaied" label="报销状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.ifBepaied == 1" type="success">已报销</el-tag>
              <el-tag v-if="scope.row.ifBepaied == 0" type="danger">未报销</el-tag>
              <el-tag v-if="scope.row.ifBepaied == 2" type="warning">报销中</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="witness" label="证明人" />

          <el-table-column width="200" align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                v-show="scope.row.auditStatus == 2"
                v-permission="'financialAudit:competenceAuditor'"
                type="primary"
                size="mini"
                @click="handleSystem(scope.row.id)"
              >
                审计
              </el-button>
              <el-button
                v-show="scope.row.auditStatus == 1"
                v-permission="'financialAudit:seeAudit'"
                size="mini"
                @click="handlePremission(scope.row.id)"
              >
                查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="拒绝报销" name="noBepaied">
        <el-table :data="userDatas.noBepaied" border stripe style="width: 100%">
          <el-table-column align="center" type="index" label="序号" width="60" />
          <el-table-column align="center" prop="name" label="姓名" />
          <el-table-column align="center" prop="applyProject" label="报销项" />
          <el-table-column align="center" prop="applyMoney" label="报销金额" />
          <el-table-column align="center" prop="department" label="部门" />
          <el-table-column align="center" prop="gmtModified" label="审核时间" />
          <el-table-column align="center" prop="auditStatus" label="审计状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.auditStatus == 1" type="success">已通过</el-tag>
              <el-tag v-if="scope.row.auditStatus == 0" type="danger">未通过</el-tag>
              <el-tag v-if="scope.row.auditStatus == 2" type="warning">审计中</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ifBepaied" label="报销状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.ifBepaied == 1" type="success">已报销</el-tag>
              <el-tag v-if="scope.row.ifBepaied == 0" type="danger">未报销</el-tag>
              <el-tag v-if="scope.row.ifBepaied == 2" type="warning">报销中</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="witness" label="证明人" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已报销" name="yesBepaied">
        <el-table :data="userDatas.yesBepaied" border stripe style="width: 100%">
          <el-table-column align="center" type="index" label="序号" width="60" />
          <el-table-column align="center" prop="name" label="姓名" />
          <el-table-column align="center" prop="applyProject" label="报销项" />
          <el-table-column align="center" prop="applyMoney" label="报销金额" />
          <el-table-column align="center" prop="department" label="部门" />
          <el-table-column align="center" prop="gmtModified" label="报销时间" />
          <el-table-column align="center" prop="auditStatus" label="审计状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.auditStatus == 1" type="success">已通过</el-tag>
              <el-tag v-if="scope.row.auditStatus == 0" type="danger">未通过</el-tag>
              <el-tag v-if="scope.row.auditStatus == 2" type="warning">审计中</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="ifBepaied" label="报销状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.ifBepaied == 1" type="success">已报销</el-tag>
              <el-tag v-if="scope.row.ifBepaied == 0" type="danger">未报销</el-tag>
              <el-tag v-if="scope.row.ifBepaied == 2" type="warning">报销中</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="witness" label="证明人" />
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <audit :form-data="auditData" :from-visible="FromVisible" :handle-close="handleClose" />
    <finance :form-data="financeData" :from-visible="financeVisible" :handle-close="financeClose" />
  </div>
</template>

<script>
import { SearchExpenseAccount, SearchAudit } from '~/api/financialAudit'
import Audit from './AuditVisible.vue'
import finance from './financeVisible.vue'

export default {
  name: 'PugePersonnelMattersSystemIndex',
  components: {
    Audit,
    finance
  },

  data() {
    return {
      auditDatas: {},
      auditData: {},
      financeData: {},
      FromVisible: false,
      financeVisible: false,
      userData: {
        noBepaied: [],
        yesBepaied: [],
        Bepaied: []
      },
      activeName: 'Bepaied'
    }
  },
  computed: {
    userDatas() {
      return this.userData
    }
  },

  created() {
    this.Search()
  },
  methods: {
    // 查询通过审计的数据
    Search() {
      SearchExpenseAccount().then(res => {
        this.userData.noBepaied = res.data.applyMap.noBepaied
        this.userData.yesBepaied = res.data.applyMap.yesBepaied
        this.userData.Bepaied = res.data.applyMap.Bepaied
        this.userData = res.data.applyMap
      })
    },

    // 审核
    handleSystem(id) {
      SearchAudit(id).then(res => {
        this.auditData = res.data.apply
        this.FromVisible = true
      })
    },

    // 报销
    handlePremission(id) {
      SearchAudit(id).then(res => {
        this.financeData = res.data.apply
        this.financeVisible = true
      })
    },

    // 清除个人审核数据
    handleClose() {
      this.auditData = {}
      this.FromVisible = false
      this.Search()
    },

    // 清除个人报销数据
    financeClose() {
      this.financeData = {}
      this.financeVisible = false
      this.Search()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
