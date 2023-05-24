<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" size="mini">
      <el-form-item label="用户名:">
        <el-input v-model="query.username" />
      </el-form-item>
      <el-form-item label="手机号:">
        <el-input v-model="query.mobile" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="queryData">查询</el-button>
        <el-button icon="el-icon-refresh" type="primary" @click="reload">重置</el-button>
        <el-button
          v-permission="'user:add'"
          icon="el-icon-circle-plus-outline"
          type="primary"
          @click="openAdd"
        >新增</el-button>
        <el-button
          v-permission="'user:register'"
          icon="el-icon-circle-plus-outline"
          type="primary"
          @click="regVisible = true"
        >扫码注册</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" border stripe style="width: 100%">
      <el-table-column align="center" type="index" label="序号" width="60" />
      <el-table-column align="center" prop="username" label="用户名" />
      <el-table-column align="center" prop="nickName" label="昵称" />
      <el-table-column align="center" prop="pugeAvater" label="头像" width="120">
        <template slot-scope="scope">
          <img
            :src="scope.row.pugeAvater ? scope.row.pugeAvater : 'https://img0.baidu.com/it/u=1479178160,1916382043&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=505'"
            onerror="src='https://img0.baidu.com/it/u=1479178160,1916382043&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=505'"
            style="width: 80px; height: 80px"
          >
        </template>
      </el-table-column>
      <el-table-column align="center" prop="mobile" label="手机号" />
      <el-table-column align="center" prop="pugeBirthday" label="生日" />
      <el-table-column align="center" prop="pugeNumber" label="工号" />
      <el-table-column align="center" prop="pugeEmail" label="邮箱" />
      <el-table-column align="center" prop="isAccountNonExpired" label="账号过期">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isAccountNonExpired === 0" type="danger">过期</el-tag>
          <el-tag v-if="scope.row.isAccountNonExpired === 1" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isAccountNonLocked" label="账号锁定">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isAccountNonLocked === 0" type="danger">锁定</el-tag>
          <el-tag v-if="scope.row.isAccountNonLocked === 1" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isCredentialsNonExpired" label="密码过期">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isCredentialsNonExpired === 0" type="danger">过期</el-tag>
          <el-tag v-if="scope.row.isCredentialsNonExpired === 1" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isEnabled" label="是否可用">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isEnabled === 0" type="danger">已删除</el-tag>
          <el-tag v-if="scope.row.isEnabled === 1" type="success">可用</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="340">
        <template v-if="scope.row.isEnabled === 1" slot-scope="scope">
          <!-- scope.row 代表想要获取对象里的哪一个值-->
          <el-button v-if="scope.row.isAccountNonLocked !== 0" v-permission="'user:edit'" type="success" size="mini" @click="handleEdit(scope.row.id)">
            编辑
          </el-button>
          <el-button v-permission="'user:delete'" type="danger" size="mini" @click="handleDelete(scope.row.id)">
            删除
          </el-button>
          <el-button v-permission="'user:setrole'" type="primary" size="mini" @click="handleRole(scope.row.id)">
            设置角色
          </el-button>
          <el-button v-permission="'user:passwordedit'" type="primary" size="mini" @click="handlePwd(scope.row.id)">
            密码修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page.current"
      :page-sizes="[5, 10]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      style="text-align: center; margin-top: 10px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <edit
      :title="edit.title"
      :visible="edit.visible"
      :forms="edit.forms"
      :remote-close="remoteClose"
      :disabled="disflag"
      @userPassword="userPassword"
    />
    <el-dialog title="设置角色" :visible.sync="role.visible" :close-on-click-modal="false" width="65%">
      <Role v-if="role.visible" :role-ids="role.roleIds" @saveUserRole="saveUserRole" />
    </el-dialog>
    <!-- 修改密码 -->
    <Password title="修改密码" :user-id="pwd.userId" :visible="pwd.visible" :remote-close="remotePwdClose" />
    <Register :visible="regVisible" @close="handleClose" />
  </div>
</template>
<script>
import * as api from '~/api/permission/userRole'
import Edit from './edit'
import Role from '../role'
import Password from './password'
import Register from './register.vue'
import { Cookie, Key } from '~/utils/cookie'
export default {
  name: 'User',
  components: {
    Edit,
    Role,
    Password,
    Register
  },
  data() {
    return {
      list: [],
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      flag: false,
      query: {
        username: '',
        mobile: ''
      }, // 查询条件
      edit: {
        title: '',
        visible: false,
        forms: {
          password: '123456'
        }
      },
      role: {
        visible: false,
        roleIds: [],
        userId: null
      },
      pwd: {
        userId: null,
        visible: false
      },
      regVisible: false
    }
  },
  computed: {
    disflag() {
      return JSON.parse(Cookie.get(Key.userInfoKey)).username === 'ljw'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData(querys = { username: '', modile: '' }) {
      const query = {
        current: this.page.current,
        size: this.page.size
      }

      const { data } = await api.userSearch({ ...query, ...querys })
      this.list = data.userPages.records

      this.page.total = data.userPages.total
    },
    handleSizeChange(val) {
      this.page.size = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.page.current = val
      this.fetchData()
    },
    // 条件查询
    queryData() {
      this.page.current = 1
      const query = {
        username: this.query.username,
        mobile: this.query.mobile
      }
      this.fetchData(query)
    },
    // 重置
    reload() {
      this.query = {}
      this.fetchData()
    },
    handleEdit(id) {
      api.echoData(id).then(res => {
        if (res.code === 20000) {
          // 将查询的详情传递
          this.edit.visible = true
          this.edit.forms = res.data.user
          this.edit.title = '编辑'
        }
      })
    },
    // 删除
    handleDelete(id) {
      this.$confirm('确认删除这条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 发送删除请求
        api
          .deleteUser(id)
          .then(res => {
            this.$message({
              type: res.code === 20000 ? 'success' : 'error',
              message: res.message
            })
            // 刷新列表数据
            this.fetchData()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      })
    },
    // 设计角色
    handleRole(id) {
      //
      this.role.userId = id
      api.SearchRole(id).then(res => {
        this.role.roleIds = res.data.stringList
        this.role.visible = true
      })
    },
    handleClose(e) {
      this.regVisible = e
    },
    // 打开新增
    openAdd() {
      this.edit.visible = true
      this.edit.title = '新增--默认密码与用户名一致'
    },
    remoteClose() {
      this.edit.forms = {}
      this.edit.visible = false
      this.fetchData()
    },
    saveUserRole(checkedRoleIds) {
      api
        .setRole(this.role.userId, checkedRoleIds)
        .then(res => {
          this.$message.success('设置角色成功')
          this.role.visible = false
        })
        .catch(() => {
          this.$message.error('设置失败')
        })
    },
    userPassword(val) {
      this.edit.forms.password = val
    },
    // 关闭密码窗口
    remotePwdClose() {
      this.pwd.userId = null
      this.pwd.visible = false
      this.fetchData()
    },
    // 密码修改
    handlePwd(id) {
      // 要修改的用户id
      this.pwd.userId = id
      this.pwd.visible = true
    }
  }
}
</script>
