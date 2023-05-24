<template>
  <div class="app-container">
    <el-table
      :data="list"
      border
      stripe
      style="width: 100%"
    >
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
        prop="pugeEmail"
        label="头像"
      >
        <template slot-scope="scope">
          <img
            :src="scope.row.photo ? scope.row.photo:'https://img0.baidu.com/it/u=1479178160,1916382043&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=505'"
            style="width:80px;height: 80px"
          >
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="nativeInfo"
        label="籍贯"
      />
      <el-table-column
        align="center"
        prop="mobile"
        label="手机号"
      />
      <el-table-column
        align="center"
        prop="pugeBirthday"
        label="生日"
      />
      <el-table-column
        align="center"
        prop="pugeNumber"
        label="工号"
      />
      <el-table-column
        align="center"
        prop="pugeEmail"
        label="邮箱"
      />
      <el-table-column
        align="center"
        label="操作"
        width="340"
      >
        <template slot-scope="scope">
          <!-- scope.row 代表想要获取对象里的哪一个值-->
          <el-button
            type="primary"
            size="mini"
            :disabled="scope.row.yesnoQuit == '0'?false:true"
            @click="DisCt(scope.row.userId)"
          >
            分配合同
          </el-button>
          <el-button
            type="success"
            size="mini"
            @click="handleEdits(scope.row.id)"
          >
            查看
          </el-button>
          <el-button
            v-permission="'person:edit'"
            size="mini"
            :disabled="scope.row.yesnoQuit == '0'?false:true"
            @click="handleEdit(scope.row.id)"
          >
            编辑
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
      style="text-align: center;margin-top:10px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <Particular
      :visible="partVisible"
      :user-data="userData"
      :disflag="disflag"
      @remoteClose="remoteClose"
    />
    <DisDiloag
      :visible="disVisible"
      :info-ids="ids"
      :user-id="DisData.id"
      :title="DisData.title"
      :remote-close="resClose"
      @conIds="acceptConIds"
    />
    <Dislog :visible="Visible" :user-datas="userDatas" :remote-closes="remoteCloses" />
  </div>
</template>

<script>
// import {
//   Cookie,
//   Key
// } from '~/utils/cookie'
import { searchData, putData, SeeContract, Distribution } from '~/api/info'
import Particular from './particular.vue'
import DisDiloag from './DisDiloag.vue'
import Dislog from './Dislog.vue'
export default {
  components: {
    Particular,
    DisDiloag,
    Dislog
  },
  data() {
    return {
      list: [],
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      userData: {},
      userDatas: {},
      partVisible: false,
      disVisible: false,
      DisData: {},
      disflag: false,
      ids: [],
      Visible: false
    }
  },
  computed: {
    // disflag_two() {
    //   return JSON.parse(Cookie.get(Key.userInfoKey)).username !== 'ljw'
    // }
  },
  mounted() {
    this.SearchUser()
  },
  methods: {
    handleEdit(id) {
      putData(id).then(res => {
        this.userData = res.data.peopleInfo
        this.partVisible = true
      })
    },
    async SearchUser(querys = { username: '', pugeSex: '' }) {
      const query = {
        current: this.page.current,
        size: this.page.size
      }
      const { data } = await searchData({ ...query, ...querys })

      this.list = data.peopleInfoIPage.records

      this.page.total = data.peopleInfoIPage.total
    },
    remoteClose() {
      this.userData = {}
      this.partVisible = false
      this.SearchUser()
    },
    resClose() {
      this.disVisible = false
      this.ids = []
    },
    remoteCloses() {
      this.Visible = false
      this.userDatas = {}
      this.SearchUser()
    },
    DisCt(userId) {
      this.getIds(userId)
    },
    // SeeContract
    getIds(userId) {
      this.DisData.id = userId
      SeeContract(userId).then(res => {
        this.ids = res.data.contractPersonalVos
        this.disVisible = true
        this.DisData.title = '分配合同'
      })
    },
    acceptConIds(val) {
      let list = []
      list = val.map(item => {
        return {
          contractId: item.id,
          contractName: item.contractName
        }
      })
      Distribution(this.DisData.id, list)
        .then(() => {
          this.$message.success('分配合同成功')
        })
        .catch(() => {
          this.$message.error('分配合同失败')
        })
      this.resClose()
    },
    handleSizeChange(val) {
      this.page.size = val
      this.SearchUser()
    },
    handleCurrentChange(val) {
      this.page.current = val
      this.SearchUser()
    },
    handleEdits(id) {
      putData(id).then(res => {
        this.userDatas = res.data.peopleInfo
        this.Visible = true
      })
    }
  }
}
</script>

<style>
</style>
