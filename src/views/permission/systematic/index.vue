<template>
  <div class="app-container">
    <el-form :inline="true" size="mini">
      <el-form-item>
        <el-button v-if="!roleIds" v-permission="'systematic:add'" icon="el-icon-circle-plus-outline" type="primary" @click="openAdd">新增</el-button>
        <el-button v-if="roleIds" size="mini" icon="el-icon-circle-plus-outline" type="primary" @click="handleUserRole">设置系统</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="systemDataTable"
      tooltip-effect="dark"
      :data="list"
      border
      stripe
      style="width: 100%"
      row-key="id"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="roleIds" type="selection" width="55" reserve-selection />
      <el-table-column align="center" type="index" label="序号" width="60" />
      <el-table-column prop="systemName" align="center" label="系统名称" min-width="20%">
        <template slot-scope="scope">
          {{ scope.row.systemName }}
        </template>
      </el-table-column>
      <el-table-column prop="systemType" align="center" label="类型类型" min-width="20%">
        <template slot-scope="scope">
          {{ scope.row.systemType }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="!roleIds"
        label="操作"
        min-width="20%"
        align="center"
      >
        <template slot-scope="scope">
          <el-button v-permission="'systematic:edit'" type="success" size="mini" @click="handleEdit(scope.row.id)">
            编辑
          </el-button>
          <el-button v-permission="'systematic:delete'" type="danger" size="mini" @click="handleDelete(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-dialog :remote-close="remoteClose" :form-data="edit.form" :visible="edit.visible" :title="edit.title" />
  </div>
</template>

<script>
import { systemSearch, searchSystemOne, deleteSystem } from '~/api/permission/systemRole'
import editDialog from './edit.vue'
export default {
  components: {
    editDialog
  },
  props: {
    roleIds: {
      type: [String, Number, Array],
      required: false,
      default: null
    }
  },
  data() {
    return {
      loading: true,
      list: [],
      edit: {
        title: '',
        visible: false,
        form: {}
      },
      checkedRoleIds: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    openAdd() {
      this.edit.visible = true
      this.edit.title = '新增'
    },

    async fetchData() {
      const { data } = await systemSearch()
      this.loading = false
      this.list = data.systemList
      this.checkedRoles()
    },

    checkedRoles() {
      this.$refs.systemDataTable.clearSelection()
      if (this.roleIds) {
        this.list.forEach(item => {
          if (this.roleIds.indexOf(item.id) !== -1) {
            this.$refs.systemDataTable.toggleRowSelection(item, true)
          }
        })
      }
    },

    handleUserRole() {
      const checkedRoleIds = []
      this.checkedRoleList.forEach(item => {
        checkedRoleIds.push(item.id)
      })
      this.$emit('saveRoleSystem', checkedRoleIds)
    },

    handleSelectionChange(val) {
      this.checkedRoleList = val
    },

    remoteClose() {
      this.edit.form = {}
      this.edit.visible = false
      this.fetchData()
    },

    handleDelete(id) {
      this.$confirm('确认删除这条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteSystem(id).then((res) => {
          this.$message.success('删除成功')
          this.fetchData()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    },

    handleEdit(id) {
      searchSystemOne(id).then((res) => {
        this.edit.form = res.data.system
        this.edit.title = '编辑'
        this.edit.visible = true
      })
    }
  }
}
</script>

<style>

</style>
