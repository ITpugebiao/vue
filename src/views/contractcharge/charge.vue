<template>
  <div class="app-container">
    <el-table
      :data="chargeList"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column
        align="center"
        prop="orderNo"
        label="订单号"
      />
      <el-table-column
        align="center"
        prop="payDes"
        label="订单名"
      />
      <el-table-column
        align="center"
        prop="userName"
        label="姓名"
      />
      <el-table-column
        align="center"
        prop="price"
        label="金额"
      />
      <el-table-column
        align="center"
        prop="status"
        label="支付状态"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.status ==='0'"
            type="danger"
          >未支付</el-tag>
          <el-tag
            v-if="scope.row.status==='1'"
            type="success"
          >已支付</el-tag>
          <el-tag
            v-if="scope.row.status==='2'"
            type="success"
          >待支付</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { trackOrder } from '~/api/indent'
export default {
  data() {
    return {
      chargeList: []
    }
  },
  created() {
    this.Chage()
  },
  methods: {
    Chage() {
      trackOrder().then(res => {
        this.chargeList = res.data.orderList
      })
    }
  }
}
</script>

<style>
</style>
