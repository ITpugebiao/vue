<template>
  <div class="app-container">
    <el-form ref="fineForm" :inline="true" :model="fineForm" label-width="100px" size="small">
      <el-form-item>
        <el-input v-model="fineForm.publisherName" clearable placeholder="请输入发布人姓名" @clear="inputClear" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="fineForm.penalizeName" clearable placeholder="请输入处罚人姓名" @clear="inputClear" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="fineForm.state" clearable placeholder="请选择支付状态" @clear="inputClear">
          <el-option label="提交未支付" value="0" />
          <el-option label="提交已支付" value="1" />
          <el-option label="提交支付中" value="2" />
          <el-option label="创建未提交" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-col>
          <el-date-picker
            v-model="fineForm.gmtCreate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
            clearable
            @change="inputClear"
          />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitSearch(fineForm)">查询</el-button>
        <el-button type="primary" @click="addFine">添加罚款项</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="fineList" border style="width: 100%">
      <el-table-column align="center" type="index" label="序号" width="70" />
      <el-table-column align="center" prop="publisherName" label="发布人姓名" width="160" />
      <el-table-column align="center" prop="fineDepartment" label="出据部门" width="160">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.fineDepartment == 0" type="warning">助理办</el-tag>
          <el-tag v-if="scope.row.fineDepartment == 1" type="success">效率部</el-tag>
          <el-tag v-if="scope.row.fineDepartment == 2">人事部</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="penalizeName" label="处罚人姓名" width="160" />
      <el-table-column align="center" prop="finePrize" label="处罚金额" width="120" />
      <el-table-column align="center" prop="gmtModified" label="创建时间" width="210">
        <!-- 实现时间的自定义渲染 -->
        <template slot-scope="scope">
          {{ dataFormat(scope.row.gmtCreate ) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="state" label="支付状态" width="200">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state == 0" type="danger">提交未支付</el-tag>
          <el-tag v-if="scope.row.state == 1" type="success">提交已支付</el-tag>
          <el-tag v-if="scope.row.state == 2">提交支付中</el-tag>
          <el-tag v-if="scope.row.state == 3" type="info">创建未提交</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state == 3" type="primary" size="small" @click="PublishFine(scope.row)">发布罚款</el-button>
          <el-button type="success" size="small" @click="EditFine(scope.row.id)">{{ scope.row.state == '3' ? '修改' : '查看' }}</el-button>
          <el-button v-if="scope.row.state == 3" type="danger" size="small" @click="deleteFine(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="current"
      :page-size="size"
      layout="total, prev, pager, next, jumper"
      :total="total"
      style="text-align: center; margin-top: 10px"
      :hide-on-single-page="true"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <!-- 添加对话框 -->
    <FineDialog :visible="fineVisible" :remote-close="remoteClose" />
    <!--  -->
    <AlterDialog :visible="alterVisible" :remote-close="remoteClose" :fine-data="fineData" />
  </div>
</template>
<script>
// 添加罚款项对话框
import FineDialog from './fineDialog.vue'
// 修改罚款项对话框
import AlterDialog from './alterDialog.vue'
// 引入Api
import { lookFine, deleteFine, selectById, releaseFine, syncFineStatus } from '~/api/fine'
export default {
  components: {
    FineDialog,
    AlterDialog
  },
  data() {
    return {
      // 所有罚款项目
      fineList: [],
      // 回显罚款项目
      fineData: { ids: '' },
      // 当前页码
      current: 1,
      // 每页展示数据数目
      size: 10,
      // 总共数据数目
      total: 0,
      // 搜索罚款项表单
      fineForm: {
        desName: '', // 罚款说明
        fineId: '', // 罚款单id
        finePrice: '', // 罚款金额
        orderId: '', // 订单id
        userId: '', // 处罚人用户id
        gmtCreate: '' // 创建时间
      },
      // 添加罚款对话框
      fineVisible: false,
      alterVisible: false,
      status: 0
    }
  },
  created() {
    this.getAllFine()
    this.syncFineStatus()
  },
  methods: {
    // 分割出来年月日
    dataFormat(val) {
      if (val) {
        const time = val.split(' ')[0].toString().split('-')[0] + '-' + val.split(' ')[0].toString().split('-')[1] + '-' + val.split(' ')[0].toString().split('-')[2]
        return time
      }
    },
    // input输入框清空的回调
    inputClear() {
      if (this.fineForm.publisherName === '' || this.fineForm.penalizeName === '' || this.fineForm.state === '' || this.fineForm.gmtCreate === null) {
        this.submitSearch(this.fineForm)
      }
    },
    // 获取所有的罚款项
    getAllFine() {
      lookFine({ size: this.size, current: this.current }).then(res => {
        const _data = res.data.fineIPage
        this.fineList = _data.records
        this.total = _data.total
      })
    },
    // 同步订单状态
    syncFineStatus() {
      syncFineStatus().then()
    },
    // 打开添加罚款项对话框
    addFine() {
      this.fineVisible = true
    },
    // 关闭对话框
    remoteClose() {
      this.fineVisible = false
      this.alterVisible = false
      this.getAllFine()
    },
    // 监听当前页数
    handleCurrentChange(value) {
      this.current = value
      if (!this.status) {
        this.getAllFine()
      } else {
        this.submitSearch(this.fineForm)
      }
    },
    // 监听每页条数变化
    handleSizeChange(size) {
      this.size = size
      this.getAllFine()
    },
    // 根据Id查询罚款项
    EditFine(id) {
      selectById(id).then(res => {
        this.fineData = res.data.fine
        this.alterVisible = true
      })
    },
    // 发布罚款项
    PublishFine(row) {
      this.fineForm.desName = row.fineReason
      this.fineForm.fineId = row.id
      this.fineForm.finePrice = row.finePrize
      this.fineForm.orderId = row.orderId
      this.fineForm.userId = row.penalizeId
      this.$confirm('确认发布该罚款项吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        releaseFine(this.fineForm).then(res => {
          this.$message({
            type: 'success',
            message: '发布成功',
            duration: 1500
          })
          this.getAllFine()
        })
      })
    },
    // 搜索罚款项
    submitSearch(fineForm) {
      lookFine({ size: this.size, current: this.current,
        publisherName: fineForm.publisherName,
        penalizeName: fineForm.penalizeName,
        state: fineForm.state,
        start: fineForm.gmtCreate
      }).then(res => {
        this.status = 1
        const _data = res.data.fineIPage
        this.fineList = _data.records
        this.total = _data.total
      })
    },
    // 删除罚款项
    deleteFine(id) {
      this.$confirm('确认删除该罚款项吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFine(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功',
            duration: 1500
          })
          this.getAllFine()
        })
      })
    }
  }
}
</script>
<style  scoped>
</style>
