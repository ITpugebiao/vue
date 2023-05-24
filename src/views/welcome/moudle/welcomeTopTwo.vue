<template>
  <div class="welcomeTopTwo">
    <el-table :data="tableData" max-height="140">
      <el-table-column align="center" prop="nickName" label="姓名" />
      <el-table-column align="center" prop="contractName" label="合同名" />
      <el-table-column align="center" prop="contractStatus" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.contractStatus === '2'" type="warning">审核中</el-tag>
          <el-tag v-if="scope.row.contractStatus === '3'" type="danger">申请解约</el-tag>
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
import { QueryContractProcessed } from '~/api/welcome'
export default {
  name: 'PugePersonnelMattersSystemWelcometoptwo',

  data() {
    return {
      tableData: []
    }
  },

  mounted() {
    this.SearchContract()
  },

  methods: {
    // 查询需要处理的合同
    SearchContract() {
      QueryContractProcessed().then(res => {
        this.tableData = res.data.personalContracts
      })
    },
    deleteRow() {
      this.$router.push('/contract/audit')
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
