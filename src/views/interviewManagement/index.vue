<template>
  <div class="app-container">
    <div class="app-container-top">
      <button-tab v-model="active" :options="tabsOptions" @click.native="changeTab" />
      <el-form :model="fuzzyData">
        <el-input v-model="fuzzyData.name" placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="fuzzySeach" />
        </el-input>
      </el-form>
    </div>
    <!-- 面试者表格  -->
    <el-table :data="list" border stripe max-height="500px">
      <el-table-column align="center" type="index" label="序号" width="60" />
      <el-table-column align="center" prop="applyName" label="名字" />
      <el-table-column align="center" prop="department" label="部门" />
      <el-table-column align="center" prop="applySex" label="性别">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.applySex == 1" type="success">男</el-tag>
          <el-tag v-if="scope.row.applySex == 0" type="danger">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="applyStunum" label="学号" />
      <el-table-column align="center" prop="applyEmail" label="邮箱" />
      <el-table-column align="center" prop="applyPhone" label="手机号" />
      <el-table-column align="center" width="200" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="interviewSchedule(scope.row.id)"> 面试进度 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      :current-page="page.current"
      :page-sizes="[5, 10]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      style="text-align: center; margin-top: 10px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    /> -->
    <!-- 分配面试官弹窗 -->
    <interviewer
      v-if="interviewerVisible"
      :interview-time="interviewTime"
      :active-value="activeValue"
      :active-name="activeName"
      :interviewer-visible="interviewerVisible"
      :interviewer-data="interviewerData"
      :interviewer-nam="interviewerNam"
      :handle-close="handleClose"
      :interviewee-id="intervieweeId"
      @step="step"
      @invoking="invoking"
    />
  </div>
</template>
<script>
import { SearchInterviewee, SearchIntervieweeSchedule, FuzzySearch } from '~/api/interview'
import interviewer from './interviewerVisible.vue'

// tab切换组件
import ButtonTab from '~/components/Tabs/ButtonTab.vue'

export default {
  name: 'User',
  components: {
    interviewer,
    ButtonTab
  },
  data() {
    return {
      list: [],
      // page: {
      //   current: 1,
      //   size: 5,
      //   total: 0
      // },
      interviewerData: [], // 面试步骤数据
      interviewerVisible: false, // 面试官弹窗
      activeName: 0,
      activeValue: '',
      interviewTime: '', // 面试时间
      interviewerNam: '',
      allocationVisible: false,
      intervieweeId: '', // 面试者id
      active: '0',
      // 面试成员情况
      tabsOptions: [
        { name: '0', label: '面试中' },
        { name: '1', label: '面试通过' },
        { name: '2', label: '面试不通过' }
      ],
      // 模糊
      fuzzyData: {
        name: ''
      }
    }
  },
  created() {
    this.getIntervieweeData()
  },
  methods: {
    // 分页查询所有面试者  -- 查询面试者
    async getIntervieweeData() {
      // 分页
      // const query = {
      //   current: this.page.current,
      //   size: this.page.size
      // }

      const { data } = await SearchInterviewee()
      const Pass = []
      const NoPass = []
      const Await = []
      data.list.map(item => {
        if (item.lastState === '2') {
          NoPass.push(item)
        } else if (item.lastState === '1') {
          Pass.push(item)
        } else if (item.lastState === '0') {
          Await.push(item)
        }
      })
      if (this.active === '2') {
        this.list = NoPass
      } else if (this.active === '1') {
        this.list = Pass
      } else if (this.active === '0') {
        this.list = Await
      }

      // this.page.total = data.applyMessagePage.total
    },
    // 切换tab栏
    changeTab() {
      this.getIntervieweeData()
    },
    // 根据用户id查询
    async interviewSchedule(id) {
      await SearchIntervieweeSchedule(id).then(res => {
        if (res.data.step.length === 0) {
          this.$message({
            message: '面试还未开始',
            type: 'warning'
          })
        } else {
          this.interviewerVisible = true
          this.interviewerData = res.data.step.sort((a, b) => {
            return a.passApply - b.passApply
          })
          this.activeName = this.interviewerData.length
          this.activeValue = this.interviewerData[this.interviewerData.length - 1].applyValue
          this.interviewTime = this.interviewerData[this.interviewerData.length - 1].interviewTime
          this.interviewerNam = this.interviewerData[this.interviewerData.length - 1].interviewerName
        }
      })
      this.intervieweeId = id
    },
    // 切换步骤条
    step(number) {
      this.activeName = number
      // 全部置为空
      this.DataClose()
      // 重新赋值
      this.deassign(number)
    },
    // 关闭弹框后清除
    DataClose() {
      this.activeValue = ''
      this.interviewTime = ''
      this.interviewerNam = ''
    },
    deassign(number) {
      this.activeValue = this.interviewerData[number - 1] ? this.interviewerData[number - 1].applyValue : ''
      this.interviewTime = this.interviewerData[number - 1] ? this.interviewerData[number - 1].interviewTime : ''
      this.interviewerNam = this.interviewerData[number - 1] ? this.interviewerData[number - 1].interviewerName : ''
    },
    // 清除面试
    handleClose() {
      this.interviewerVisible = false
      this.activeName = 0
      this.activeValue = ''
      this.interviewTime = ''
      this.interviewerNam = ''
      this.intervieweeId = ''
      this.interviewerData = []
    },
    // 重新调用
    invoking() {
      SearchIntervieweeSchedule(this.intervieweeId).then(res => {
        this.interviewerNam = res.data.step[res.data.step.length - 1].interviewerName
      })
    },
    // 模糊查询
    fuzzySeach() {
      FuzzySearch(this.fuzzyData).then((res) => {
        this.list = []
        res.data.applylists.map(item => {
          if (item.lastState === this.active) {
            this.list.push(item)
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container-top{
  display: flex;
  justify-content: space-between;
}

</style>
