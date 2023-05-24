<template>
  <div>
    <!-- 面试者进度步骤 -->
    <el-dialog title="面试进度" :visible.sync="interviewerVisible" width="40%" :close-on-click-modal="false" :before-close="handleClose">
      <el-steps :active="activeNames" align-center>
        <el-step
          v-for="(item, index) in stepData"
          :key="index"
          :title="item.title"
          :class="{ label: activeName === index + 1 }"
          :icon="item.icon"
          :status="item.nowStatue == 2 ? 'error' : ''"
          @click.native="next(index + 1)"
        />
      </el-steps>

      <div class="interViewFooter">
        <div>
          <span>面试官:</span>
          <div style="display: inline-block; margin-right: 10px"><el-input v-model="interviewerNams" disabled /></div>
          <el-button
            :disabled="StepNumber !== activeName || stepData[interviewerData.length - 1].nowStatue == 2 || stepData[5].nowStatue === '1' || value1 == null"
            type="primary"
            @click="chooseInterview"
          >选择面试官</el-button>
        </div>
        <!-- activeValue -->
        <div><span>面试评价:</span>
          <el-input
            v-model="activeValues"
            type="textarea"
            :rows="2"
            disabled
          /></div>
        <div>
          <span>面试时间:</span>
          <el-date-picker
            v-model="value1"
            :disabled="StepNumber != activeName || stepData[interviewerData.length - 1].nowStatue == 2 || stepData[5].nowStatue === '1'"
            type="datetime"
            placeholder="选择日期时间"
            :default-value="defaultTime"
            :picker-options="pickerOptions"
            @change="change"
          />
        </div>
        <div style="margin-top:20px;">
          <el-button v-for="item in pass" :key="item.status" :disabled="StepNumber !== activeName || stepData[interviewerData.length - 1].nowStatue == 2 || stepData[5].nowStatue === '1'" :type="item.type" @click="judgment(item.status)">{{ item.name }}</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 分配面试官弹框 -->
    <allocation
      v-if="allocationVisible"
      :allocation-visible="allocationVisible"
      :allocation-close="allocationClose"
      :allocation-data="allocationData"
      v-bind="$attrs"
      @allocatedName="allocatedName"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import { updateStep, SearchAllInterviewer, InterviewJudgment } from '~/api/interview.js'
import { toTime } from '../../utils/Time'
import allocation from './allocationVisible.vue'
export default {
  components: {
    allocation
  },
  props: {
    interviewerData: {
      type: Array,
      default: () => []
    },
    interviewerVisible: {
      type: Boolean,
      default: false
    },
    handleClose: {
      type: Function,
      default: function() {}
    },
    activeName: {
      type: Number,
      default: 0
    },
    activeValue: {
      type: String,
      default: ''
    },
    interviewTime: {
      type: String,
      default: ''
    },
    interviewerNam: {
      type: String,
      default: ''
    },
    activegmt: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      value1: this.interviewTime,
      stepData: [
        { title: '价值观面', icon: 'el-icon-s-custom' },
        { title: '业务评估', icon: 'el-icon-s-marketing' },
        { title: '导师面', icon: 'el-icon-user-solid' },
        { title: '部门面', icon: 'el-icon-s-grid' },
        { title: '部门交叉面', icon: 'el-icon-s-operation' },
        { title: '转正答辩', icon: 'el-icon-s-check' }
      ],
      activeNames: this.activeName,
      allocationVisible: false,
      allocationData: [],
      StepNumber: this.activeName,
      // 限制日期时间选择器
      pickerOptions: {
        selectableRange: (() => {
          const data = new Date()
          const hour = data.getHours()
          const minute = data.getMinutes()
          const second = data.getSeconds()
          return [`${hour}:${minute}:${second} - 23:59:59`]
        })(),
        disabledDate(time) {
          var date = new Date()
          date.setFullYear(date.getFullYear() + 2)
          date.setDate(date.getDate() - 1)
          return (time.getTime() < Date.now() - 8.64e7) || (time.getTime() > date.getTime())
        }
      },
      // 状态
      pass: [
        { status: '1', name: '通过', type: 'primary' },
        { status: '2', name: '不通过', type: 'danger' }
      ]
    }
  },
  computed: {
    interviewerNams() {
      return this.interviewerNam
    },
    activeValues() {
      return this.activeValue
    },
    // 日期时间选择器 => 默认的时间
    defaultTime() {
      return new Date()
    }
  },
  mounted() {
    console.log(this.value1)
  },
  created() {
    // 遍历步骤
    this.stepData.map((ress, indexs) => {
      this.interviewerData.map((res, index) => {
        if (indexs === index) {
          this.stepData[index] = {
            title: ress.title,
            icon: ress.icon,
            nowStatue: res.nowStatue
          }
        }
      })
    })
  },
  methods: {
    // 步骤切换
    async next(number) {
      await this.$emit('step', number)
      this.value1 = this.interviewTime
    },
    // 日期时间选择器变换调用
    change() {
      const setTime = this.interviewerData[this.activeName - 1]
      setTime.interviewTime = toTime(this.value1)
      updateStep(setTime).then(res => {
        if (res.code === 20000) {
          this.$message({
            message: '设置时间成功',
            type: 'success'
          })
        }
      })
    },
    // 传回面试官名
    async allocatedName(name) {
      const interviewName = this.interviewerData[this.activeName - 1]
      interviewName.interviewerName = name
      await updateStep(interviewName)
      await this.$emit('invoking')
    },

    // 选择面试官
    async chooseInterview() {
      await SearchAllInterviewer().then(res => {
        this.allocationData = res.data.userInterview
      })

      this.allocationVisible = true
    },
    // 通过不通过
    judgment(status) {
      const data = this.interviewerData[this.activeName - 1]
      InterviewJudgment(data.id, data.applyId, status).then(() => {
        this.$message.success('审核成功')
        this.handleClose()
      }).catch((error) => {
        this.$message.error(error)
      })
    },
    // 清除面试官
    allocationClose() {
      this.allocationVisible = false
      this.allocationData = []
    }
  }
}
</script>

<style lang="scss">
.el-step__icon {
	width: 50px !important;
	height: 50px !important;
}
.el-step.is-horizontal .el-step__line {
	top: 25px;
}

.label {
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 0 3px 0 rgba(0, 0, 0, 0.04);
	width: 220px !important;
	border-radius: 10px;
}

.interViewFooter {
	margin: 40px 0 10px 10px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
	padding: 10px 10px 10px 20px;
}
.interViewFooter > div {
	margin-bottom: 20px;
}
.interViewFooter div span {
	font-weight: 800;
	margin-right: 10px;
}
</style>
