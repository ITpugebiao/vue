<template>
  <div class="app-container">
    <el-button
      v-if="!userId"
      v-permission="'manager:add'"
      type="primary"
      size="max"
      @click="addCon"
    >添加合同</el-button>
    <el-button v-if="userId" type="primary" size="max" @click="distrCon">分配合同</el-button>
    <el-table
      ref="conRef"
      style="width: 100%;margin-top:20px;"
      :data="contractList"
      row-key="id"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="infoIds" reserve-selection type="selection" width="55" />
      <el-table-column align="center" type="index" label="序号" width="60" />
      <el-table-column align="center" prop="contractName" label="合同名" />

      <el-table-column v-if="!userId" label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-permission="'manager:edit'" size="mini" @click="handleEdit(scope.row.id)">查询</el-button>
          <el-button
            v-permission="'manager:delete'"
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <ConDialog :visible="conVisible" :remote-close="remoteClose" :contract-data="contractData" />
  </div>
</template>

<script>
import ConDialog from './ConDialog.vue'
import { searchContract, deleteContract, getContract } from '~/api/contract'
export default {
  components: {
    ConDialog
  },
  props: {
    userId: {
      type: String,
      default: ''
    },
    infoIds: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      conVisible: false,
      contractList: [],
      contractData: { id: '' },
      ContractIds: []
    }
  },
  mounted() {
    this.SearchCon()
  },
  methods: {
    addCon() {
      this.conVisible = true
    },
    remoteClose() {
      this.conVisible = false
      this.contractData = { id: '' }
      this.SearchCon()
    },
    SearchCon() {
      searchContract().then(res => {
        this.contractList = res.data.contractList
        this.chackCon()
      })
    },
    chackCon() {
      this.$refs.conRef.clearSelection()
      if (this.infoIds) {
        this.contractList.forEach(item => {
          if (this.infoIds.includes(item.id)) {
            this.$refs.conRef.toggleRowSelection(item, true)
          }
        })
      }
    },
    handleDelete(id) {
      this.$confirm('确认删除该合同吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteContract(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.SearchCon()
        })
      })
    },
    handleEdit(id) {
      getContract(id).then(res => {
        this.contractData = res.data.contract
        this.conVisible = true
      })
    },
    handleSelectionChange(val) {
      this.ContractIds = val
    },
    distrCon() {
      this.$emit('conIds', this.ContractIds)
      this.$emit('contractPPT')
    }
  }
}
</script>

<style></style>
