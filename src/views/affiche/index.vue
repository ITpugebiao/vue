<template>
  <div class="app-container">
    <el-form ref="afficheForm" :model="afficheForm" :inline="true" label-width="80px" style="margin-left: -20px">
      <el-form-item label="发布人">
        <el-input v-model.trim="afficheForm.publisher" clearable placeholder="请输入发布人" @clear="ClearInput" />
      </el-form-item>
      <el-form-item label="所属部门">
        <el-select v-model.trim="afficheForm.department" clearable placeholder="请输入所属部门" @clear="ClearInput">
          <el-option label="助理办" value="0" />
          <el-option label="人事部" value="1" />
          <el-option label="效率部" value="2" />
          <el-option label="宣传部" value="3" />
          <el-option label="资产部" value="4" />
        </el-select>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input v-model="afficheForm.content" clearable placeholder="请输入关键字" @clear="ClearInput" />
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitSearch(1)">查询</el-button>
        <el-button type="primary" @click="AfficheDialog">发布公告</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="afficheList" border style="width: 100%">
      <el-table-column align="center" type="index" label="序号" width="50" />
      <el-table-column prop="title" label="标题" width="260" align="center" />
      <el-table-column prop="publisher" label="发布人" width="150" align="center" />
      <el-table-column prop="department" label="所属部门" width="150" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.department == 0" type="warning">助理办</el-tag>
          <el-tag v-if="scope.row.department == 1">人事部</el-tag>
          <el-tag v-if="scope.row.department == 2" type="success">效率部</el-tag>
          <el-tag v-if="scope.row.department == 3" type="danger">宣传部</el-tag>
          <el-tag v-if="scope.row.department == 4" type="info">资产部</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="公告内容" align="center">
        <template slot-scope="scope">
          <p>{{ richTextFormat(scope.row.content) }}</p>
        </template>
      </el-table-column>
      <el-table-column align="center" width="200" label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="alterAffiche(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteAff(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="current"
      :page-size="size"
      layout="total, prev, pager, next, jumper"
      :total="total"
      style="text-align: center; margin-top: 10px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 发布公告对话框 -->
    <AfficheDialog v-if="affVisible" :visible="affVisible" :remote-close="remoteClose" />
    <!-- 修改公告对话框 -->
    <AlterDialog v-if="alterVisible" :visible="alterVisible" :remote-close="remoteClose" :alter-form="alterForm" />
  </div>
</template>

<script>
// 添加公告对话框
import AfficheDialog from './affDialog.vue'
// 修改对话框
import AlterDialog from './alterDialog.vue'
// 引入 Api
import { deleteBulletin, lookBulletin, selectById } from '~/api/affiche'
export default {
  components: {
    AfficheDialog,
    AlterDialog
  },
  data() {
    return {
      // 搜索公告表单信息
      afficheForm: {
        publisher: '',
        department: '',
        content: ''
      },
      // 发布公告对话框
      affVisible: false,
      // 修改公告对话框
      alterVisible: false,
      // 所有公告信息
      afficheList: [],
      // 当前页码
      current: 1,
      // 每页展示数据数目
      size: 8,
      // 总共数据数目
      total: 0,
      alterForm: {}
    }
  },
  created() {
    this.referAffiche()
  },
  methods: {
    // 正则过滤富文本
    richTextFormat(value) {
      value = value.replace(/<\/?.+?>/g, '')
      value = value.replace(/\s+/g, '')
      value = value.replace(/<br\/>/g, '\n').replace(/<br\/>/g, '\n').replace(/\s/g, '\n').replace(/[ ]|[&nbsp;]/g, '')
      if (value.length > 30) {
        return value.slice(0, 30) + '...'
      }
      return value
    },
    // 清空input输入框回调
    ClearInput() {
      this.submitSearch()
    },
    // 查询所有公告
    referAffiche() {
      lookBulletin({ size: this.size, current: this.current }).then(res => {
        this.afficheList = res.data.bulletinIPage.records
        this.total = res.data.bulletinIPage.total
      })
    },
    // 搜索公告  分页查询
    submitSearch(x) {
      lookBulletin({
        size: this.size,
        current: x === 1 ? 1 : this.current,
        publisher: this.afficheForm.publisher,
        department: this.afficheForm.department,
        content: this.afficheForm.content
      }).then(res => {
        this.afficheList = res.data.bulletinIPage.records
        this.total = res.data.bulletinIPage.total
      })
    },
    // 监听当前页数
    handleCurrentChange(current) {
      this.current = current
      this.submitSearch()
    },
    // 监听每页条数变化
    handleSizeChange(size, current) {
      this.size = size
      this.current = current
      this.referAffiche()
    },
    // 打开发布公告对话框
    AfficheDialog() {
      this.affVisible = true
    },
    // 打开更新公告对话框
    alterAffiche(id) {
      this.alterVisible = true
      selectById(id).then(res => {
        this.alterForm = res.data.bulletin
        console.log(this.alterForm)
      })
    },
    // 关闭对话框
    remoteClose() {
      this.affVisible = false
      this.alterVisible = false
      this.referAffiche()
    },
    // 删除公告
    deleteAff(id) {
      this.$confirm('确认删除该公告吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBulletin(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功',
            duration: 1500
          })
          this.referAffiche()
        })
      })
    }
  }
}
</script>
<style scoped>
.textblock {
  width: 530px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
