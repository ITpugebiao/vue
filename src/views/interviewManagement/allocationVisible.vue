<template>
  <div>
    <el-dialog title="详细信息" :visible.sync="allocationVisible" :before-close="pickClose" :close-on-click-modal="false" width="40%">
      <div>
        <!-- 下拉框分配面试官 -->
        <el-select v-model="value" filterable placeholder="请选择" @change="pick">
          <el-option v-for="item in allocationDatas" :key="item.id" :label="item.username" :value="item.id" />
        </el-select>
        <el-table ref="singleTable" :data="allocationDatas" highlight-current-row style="width: 100%">
          <el-table-column align="center" label="序号" type="index" width="50" />
          <el-table-column align="center" property="username" label="姓名" width="120" />
          <el-table-column align="center" property="pugeLevel" label="级别" width="120" />
          <el-table-column align="center" property="pugeEmail" label="邮箱" width="120" />
          <el-table-column align="center" label="头像">
            <template slot-scope="scope">
              <img :src="scope.row.pugeAvater" width="50px" height="50px">
            </template>
          </el-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="pickClose">取 消</el-button>
        <el-button type="primary" @click="already">分配</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { AllotInterviewee, SearchIntervieweeId } from '~/api/interview'
export default {
  name: 'PugePersonnelMattersSystemAllocationvisible',
  props: {
    allocationData: {
      type: Array,
      default: () => []
    },
    allocationVisible: {
      type: Boolean,
      default: false
    },
    intervieweeId: {
      type: String,
      default: ''
    },
    allocationClose: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      // 根据面试者id分配面试官
      intervieweeData: {
        applyId: this.intervieweeId,
        interviewerName: '',
        interviewerId: ''
      },
      value: ''
    }
  },
  computed: {
    allocationDatas() {
      return this.allocationData
    }
  },

  mounted() {
    this.PullAllocationId(this.intervieweeId)
  },

  methods: {
    PullAllocationId(id) {
      SearchIntervieweeId(id).then(res => {
        this.value = res.data.interviewerid
      })
    },
    // 下拉选择器发生变化后调用
    pick(ids) {
      const data = this.allocationDatas.find(res => {
        return res.id === ids
      })
      this.intervieweeData = {
        applyId: this.intervieweeId,
        interviewerName: data.username,
        interviewerId: data.id
      }
    },
    // 分配面试官
    async already() {
      if (this.intervieweeData.interviewerName === '' || this.intervieweeData.id === '') {
        const data = this.allocationDatas.find(res => {
          return res.id === this.value
        })
        this.intervieweeData = {
          applyId: this.intervieweeId,
          interviewerName: data.username,
          interviewerId: data.id
        }
      }
      await AllotInterviewee(this.intervieweeData).then(res => {
        if (res.code === 20000) {
          this.$message({
            message: '分配成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '分配失败',
            type: 'error'
          })
        }
      })
      // 把分配的面试官名传回去
      await this.$emit('allocatedName', this.intervieweeData.interviewerName)
      // 关闭并清除数据
      this.pickClose()
    },
    // 清除
    pickClose() {
      this.allocationClose()
      this.intervieweeData.interviewerId = {
        applyId: '',
        interviewerName: '',
        interviewerId: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
