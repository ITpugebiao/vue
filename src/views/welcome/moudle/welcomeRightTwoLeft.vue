<template>
  <div class="welcomeRightTwoLeft ">
    <el-table :data="AuditList" max-height="290">
      <el-table-column align="center" prop="name" label="姓名" />
      <el-table-column align="center" prop="department" label="部门" />
      <el-table-column align="center" prop="ifBepaied" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.ifBepaied === '2'" type="warning">审核中</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <el-button type="text" size="small" @click.native.prevent="deleteRow()">
          处理
        </el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { QueryApplyProcessed } from '~/api/welcome'
export default {
  name: 'PugePersonnelMattersSystemWelcomerighttwoleft',

  data() {
    return {
      AuditList: []
    }
  },

  mounted() {
    this.QueryProcessed()
  },

  methods: {
    QueryProcessed() {
      QueryApplyProcessed().then(res => {
        this.AuditList = res.data.applyAuditList
      })
    },
    deleteRow() {
      this.$router.push('/financialAudit')
    }
  }
}
</script>

<style lang="scss" scoped>
.state {
	animation: fBig 0.5s alternate 6;
}
@keyframes fBig {
	from {
		font-size: 20px;
	}
	to {
		font-size: 25px;
	}
}
</style>
