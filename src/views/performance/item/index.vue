<template>
  <div class="performance-item">
    <div class="performance-item-functional">
      <!-- 下拉框 -->
      <div>
        <el-select v-model="performanceFirstName" clearable placeholder="请选择" @change="performanceFirstListChange" @clear="performanceFirstnull">
          <el-option
            v-for="(item, index) in performanceFirstList"
            :key="index"
            :label="item.performanceName"
            :value="item.id"
          />
        </el-select>
        <el-select v-model="performanceSecondName" class="performance-item-select" clearable placeholder="请选择" @clear="performanceSecondnull('clear')" @change="performanceSecondChange">
          <el-option
            v-for="(itemSecond, index) in performanceSecondList"
            :key="index"
            :label="itemSecond.performanceName"
            :value="itemSecond.id"
          />
        </el-select>
      </div>
      <div class="performance-item-search">
        <el-input v-model="performanceInput" placeholder="请输入内容" class="performance-item-input">
          <el-button slot="append" icon="el-icon-search" @click="fuzzySearch()" />
        </el-input>
        <el-button class="performance-item-add" type="primary" @click="addperformance()">{{ append }}</el-button>
        <!-- 弹出框 -->
        <Popup :addperformance-form="addperformanceForm" :remote-close="remoteClose" :status="status" :grade="grade" :search-id="searchId" :compile-form="compileForm" :renewal="renewal" />
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :data="performanceThirdList"
      border
      style="width: 100%"
    >
      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="160"
      />
      <el-table-column
        prop="performanceName"
        :label="labels"
        align="center"
      />
      <el-table-column
        v-if="status === 3"
        prop="performanceScore"
        label="分值"
        align="center"
      />
      <el-table-column
        v-if="status === 3"
        prop="performanceLimit"
        label="申报上限"
        align="center"
      />
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="300"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="compilePerformance(scope.row)">编辑</el-button>
          <el-button type="primary" size="small" @click="deletePerformance(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { gainPerformanceItem, inquirePerformanceItem, deletePerformanceItem } from '~/api/performance/performanceItem'
import Popup from '~/views/performance/item/popup/index.vue'
export default {
  components: {
    Popup
  },
  data() {
    return {
      // 一级
      performanceFirstList: [],
      // 绑定的第一个下拉框id
      performanceFirstName: '',
      // 二级
      performanceSecondList: [],
      // 绑定的第二个下拉框id
      performanceSecondName: '',
      // 匹配绑定的第二个下拉框id的整个对象
      // performanceFirstListSecond: [],
      // 三级
      performanceThirdList: [],
      // 编辑表单
      compileForm: {},
      // 状态（判断几级）
      status: 0,
      // 模糊查询传递的id值
      searchId: '0',
      // 清空
      empty: '0',
      // 绑定label 动态显示
      labels: '一级分类',
      // 搜素框
      performanceInput: '',
      // 弹出框
      addperformanceForm: false,
      // 添加按钮的文字
      append: '添加一级分类',
      // 弹出框主题的动态文字
      grade: '添加一级分类'
    }
  },
  created() {
    this.__init()
  },
  methods: {
    /**
     * 初始化页面
     */
    __init() {
      this.getPerformanceItem()
    },
    /**
     * 获取绩效项
    */
    getPerformanceItem() {
      gainPerformanceItem(this.searchId).then(res => {
        // console.log('res', res.data)
        // 状态为1级
        this.status = 1
        // 第一级渲染
        this.performanceFirstList = res.data.performanceList
        // 第三级渲染
        this.performanceThirdList = res.data.performanceList
      })
    },
    /**
     * 第一个下拉框选中更改之后渲染数据
    */
    performanceFirstListChange(e) {
      if (!e) return
      gainPerformanceItem(e).then(res => {
        // 状态为2级
        this.status = 2
        this.labelValue()
        // 第二级渲染
        this.performanceSecondList = res.data.performanceList
        // 第三级渲染
        this.performanceThirdList = res.data.performanceList
        this.performanceSecondName = ''
        this.searchId = e
      })
    },
    /**
     * 第二个下拉框改变选中数据
    */
    performanceSecondChange(e) {
      if (!e) return
      console.log(0)
      this.status = 3
      this.labelValue()
      this.searchId = e
      // 寻找匹配第二个下拉框的第三级数据
      gainPerformanceItem(e).then(res => {
      // 状态为3级
        this.status = 3
        // 第三级渲染
        this.performanceThirdList = res.data.performanceList
      })
    },
    /**
     * 第一级清空
    */
    performanceFirstnull() {
      this.performanceSecondnull()
      this.searchId = '0'
      this.getPerformanceItem()
      this.status = 1
      this.performanceSecondName = ''
      this.performanceSecondList = []
      this.labelValue()
    },
    /**
     * 第二级清空
    */
    performanceSecondnull() {
      console.log(1)
      this.status = 2
      this.labelValue()
      this.performanceThirdList = this.performanceSecondList
    },
    /**
     * 删除
    */
    deletePerformance(deleteid) {
      deletePerformanceItem(deleteid.id)
        .then(() => {
          this.renewal(deleteid.parentId)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
    },
    /**
     * 模糊查询
    */
    fuzzySearch() {
      inquirePerformanceItem({ parentId: this.searchId, performanceName: this.performanceInput }).then(res => {
        this.performanceThirdList = res.data.performanceList
      })
    },
    /**
     * 添加
    */
    addperformance() {
      this.labelValue()
      this.compileForm = {}
      this.addperformanceForm = true
    },
    /**
     * 编辑
    */
    compilePerformance(compile) {
      this.grade = '编辑'
      // 渲染编辑里的数据
      this.compileForm = compile
      // 打开弹出框
      this.addperformanceForm = true
    },
    /**
     * 添加修改弹出框标题,添加按钮文字，表格标题
    */
    labelValue() {
      if (this.status === 1) {
        this.labels = '一级分类'
        this.grade = '添加一级分类'
        this.append = '添加一级分类'
      }
      if (this.status === 2) {
        this.labels = '二级分类'
        this.grade = '添加二级分类'
        this.append = '添加二级分类'
      }
      if (this.status === 3) {
        this.labels = '绩效名称'
        this.grade = '添加绩效项'
        this.append = '添加绩效项'
      }
    },
    /**
     * 弹出框关闭
    */
    remoteClose() {
      this.addperformanceForm = false
      this.compileForm = {}
    },
    // 更新数据
    renewal(parentId) {
      gainPerformanceItem(parentId).then(res => {
        console.log('res', res.data)
        if (this.status === 1) {
          this.performanceFirstList = res.data.performanceList
          this.performanceThirdList = res.data.performanceList
        } else if (this.status === 2) {
          // 第二级渲染
          this.performanceSecondList = res.data.performanceList
          // 第三级渲染
          this.performanceThirdList = res.data.performanceList
        } else if (this.status === 3) {
          this.performanceThirdList = res.data.performanceList
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.performance-item {
  .performance-item-functional {
    display: flex;
    justify-content: space-between;
  }
  .performance-item-select {
    margin-left: 20px;
  }
  .el-input {
    width: 400px;
  }
  .performance-item-input, .performance-item-add {
    margin-right: 50px;
  }
  .el-table {
    margin-top: 30px;
  }
}
</style>
