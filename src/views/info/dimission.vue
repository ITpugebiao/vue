<template>
  <div class="app-container">
    <el-table
      ref="dataTable"
      :data="list"
      border
      stripe
      style="width: 100%"
      row-key="id"
    >
      <!-- reserve-selection 必须配合上面的row-key使用 在切换页码时候 可以保留前面选择的行 -->
      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="60"
      />
      <el-table-column
        align="center"
        prop="name"
        label="姓名"
      />
      <el-table-column
        align="center"
        prop="nativeInfo"
        label="籍贯"
      />
      <el-table-column
        align="center"
        prop="pugeBirthday"
        label="性别"
      />
      <el-table-column
        align="center"
        prop="pugeEmail"
        label="邮箱"
      />
      <el-table-column
        align="center"
        prop="mobile"
        label="手机号"
      />
      <el-table-column
        align="center"
        prop="pugeNumber"
        label="工号"
      />
      <el-table-column
        align="center"
        prop="yesnoQuit"
        label="是否离职"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.yesnoQuit == 0"
            type="success"
          >未离职</el-tag>
          <el-tag
            v-if="scope.row.yesnoQuit == 1"
            type="danger"
          >已离职</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="340"
      >
        <template slot-scope="scope">
          <!-- scope.row 代表想要获取对象里的哪一个值-->
          <el-button
            v-permission="'dimission:check'"
            type="primary"
            size="mini"
            @click="handleEdit(scope.row.id)"
          >
            查看详细信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Particular :visible="lovisible" :user-data="userData" :disflag-two="disflag_two" :disflag="disflag" @remoteClose="remoteClose" />
  </div>
</template>

<script>
import { searchQuit, putData } from '~/api/info'
import Particular from './particular.vue'
export default {
  components: {
    Particular
  },
  data() {
    return {
      list: [], // 列表数据
      query: {}, // 查询条件
      lovisible: false,
      disflag: false,
      disflag_two: true,
      userData: {}
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await searchQuit()
      this.list = data.peopleInfoList
    },
    handleEdit(id) {
      putData(id).then(res => {
        this.userData = res.data.peopleInfo
        this.lovisible = true
        this.disflag = true
        this.disflag_two = false
      })
    },
    remoteClose() {
      this.userData = {}
      this.disflag = false
      this.disflag_two = true
      this.lovisible = false
      this.fetchData()
    }
  }
}
</script>

<style>
</style>
