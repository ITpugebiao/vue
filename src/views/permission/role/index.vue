<template>
  <div class="app-container">
    <el-form
      ref="query"
      :inline="true"
      :model="query"
      size="mini"
    >
      <el-form-item
        prop="name"
        label="角色名称:"
      >
        <el-input v-model="query.name" />
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-search"
          type="primary"
          @click="queryData('query')"
        >查询</el-button>
        <el-button
          icon="el-icon-refresh"
          type="primary"
          @click="reload"
        >重置</el-button>
        <el-button
          v-if="!roleIds"
          v-permission="'role:add'"
          icon="el-icon-circle-plus-outline"
          type="primary"
          @click="openAdd"
        >新增</el-button>
        <el-button
          v-if="roleIds"
          size="mini"
          icon="el-icon-circle-plus-outline"
          type="primary"
          @click="handleUserRole"
        >设置角色</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="dataTable"
      tooltip-effect="dark"
      :data="list"
      border
      stripe
      style="width: 100%"
      row-key="id"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="roleIds"
        type="selection"
        width="55"
        reserve-selection
      />
      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="60"
      />
      <el-table-column
        align="center"
        prop="name"
        label="角色名称"
      />
      <el-table-column
        align="center"
        prop="remark"
        label="备注"
      />
      <el-table-column
        v-if="!roleIds"
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            v-permission="'role:systemallot'"
            type="primary"
            size="mini"
            @click="handleSystem(scope.row.id)"
          >
            分配系统
          </el-button>
          <el-button
            v-permission="'role:menuallot'"
            type="primary"
            size="mini"
            @click="handlePremission(scope.row.id)"
          >
            分配权限
          </el-button>
          <el-button
            v-permission="'role:edit'"
            type="success"
            size="mini"
            @click="handleEdit(scope.row.id)"
          >
            编辑

          </el-button>
          <el-button
            v-permission="'role:delete'"
            type="danger"
            size="mini"
            @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="page.current"
      :page-sizes="[5,10]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      style="text-align: center;margin-top:10px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <role-edit-dialog
      :remote-close="remoteClose"
      :form-data="edit.form"
      :visible="edit.visible"
      :title="edit.title"
    />
    <role-permission-dialog
      :remote-close="remotePermissionClose"
      :visible="permission.visible"
      :title="permission.title"
      :menu-id="permission.menuIds"
      @saveRoleMenu="saveRoleMenu"
    />
    <role-system-dialog
      :remote-system-close="remoteSystemClose"
      :role-ids="system.roleIds"
      :title="system.title"
      :visible="system.visible"
      @saveRoleSystem="saveRolesSystem"
    />
  </div>
</template>

<script>
import roleEditDialog from './roleEditDialog.vue'
import rolePermissionDialog from './rolePermissionDialog.vue'
import roleSystemDialog from './roleSystemDialog.vue'
import { roleSearch, roleSearchOne, deleteRole, roleMenu, menuRole } from '~/api/permission/defaultRole'
import { roleSearchSystem, saveRoleSystem } from '~/api/permission/systemRole'
export default {
  name: 'Role',
  components: {
    roleEditDialog,
    rolePermissionDialog,
    roleSystemDialog
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
      query: {
        name: ''
      },
      list: [],
      page: {
        total: 0,
        current: 1,
        size: 10
      },
      edit: {
        title: '',
        visible: false,
        form: {}
      },
      permission: {
        visible: false,
        roleId: null,
        title: '分配权限',
        menuIds: []
      },
      checkedRoleList: [],
      system: {
        title: '分配系统',
        visible: false,
        roleIds: [],
        userId: null
      }
    }
  },
  watch: {
    roleIds() {
      this.query = {}
      this.queryData()
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    // 查询数据
    async fetchData(query = { name: '' }) {
      const params = {
        current: this.page.current,
        size: this.page.size,
        ...query
      }
      const { data } = await roleSearch(params)
      this.page.total = data.roleIPage.total
      this.list = data.roleIPage.records
      this.checkedRoles()
    },

    checkedRoles() {
      this.$refs.dataTable.clearSelection()
      if (this.roleIds) {
        this.list.forEach(item => {
          if (this.roleIds.indexOf(item.id) !== -1) {
            this.$refs.dataTable.toggleRowSelection(item, true)
          }
        })
      }
    },

    saveRolesSystem(checkedRoleIds) {
      saveRoleSystem(checkedRoleIds, this.system.userId)
        .then(res => {
          this.$message.success('分配系统成功')
          this.system.visible = false
        })
        .catch(() => {
          this.$message.error('分配系统失败')
          this.system.visible = false
        })
    },

    // handleclose () {
    //   this.permission.menuIds = [];
    //   this.permission.roleId = null;
    // },

    handleUserRole() {
      const checkedRoleIds = []
      this.checkedRoleList.forEach(item => {
        checkedRoleIds.push(item.id)
      })
      this.$emit('saveUserRole', checkedRoleIds)
    },

    handleSelectionChange(val) {
      this.checkedRoleList = val
    },

    queryData(query) {
      this.$refs[query].validate(valid => {
        if (valid) {
          this.page.current = 1
          const query = {
            name: this.query.name
          }
          this.fetchData(query)
        } else {
          return false
        }
      })
    },

    reload() {
      this.query = {}
      this.fetchData()
    },

    remoteClose() {
      this.edit.form = {}
      this.edit.visible = false
      this.fetchData()
    },

    remotePermissionClose() {
      this.permission.visible = false
      this.permission.roleId = null
      this.permission.menuIds = []
      this.fetchData()
    },

    remoteSystemClose() {
      this.system.visible = false
      this.system.roleIds = []
      this.system.userId = null
      this.fetchData()
    },

    openAdd() {
      this.edit.visible = true
      this.edit.title = '新增'
    },

    handleEdit(id) {
      roleSearchOne(id).then(res => {
        this.edit.form = res.data.role
        this.edit.title = '编辑'
        this.edit.visible = true
      })
    },

    handlePremission(id) {
      this.permission.roleId = id
      roleMenu(id).then(res => {
        this.permission.menuIds = res.data.ids
        this.permission.visible = true
      })
    },

    handleSystem(id) {
      this.system.userId = id
      roleSearchSystem(id).then(res => {
        this.system.roleIds = res.data.ids
        this.system.visible = true
      })
    },

    handleDelete(id) {
      this.$confirm('确认删除这条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(id)
          .then(res => {
            this.$message.success('删除成功')
            this.fetchData()
          })
          .catch(() => {
            this.$message.error('删除失败')
          })
      })
    },
    saveRoleMenu(collIds) {
      const resp = collIds.map(item => {
        return {
          menuId: item.id ?? item.menuId,
          systemType: item.systemType
        }
      })
      menuRole(this.permission.roleId, resp).then(res => {
        this.$message.success('设置菜单成功')
        this.permission.visible = false
      })
    },
    handleSizeChange(val) {
      this.page.size = val
      this.fetchData()
    },

    handleCurrentChange(val) {
      this.page.current = val
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
