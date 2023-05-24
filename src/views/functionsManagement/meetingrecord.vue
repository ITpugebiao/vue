<template>
  <div class="box">
    <!-- 根据关键字查询 -->
    <div class="block">
      <div class="left">
        <el-input v-model="meetingTime" placeholder="搜索会议时间" clearable prefix-icon="el-icon-search" style="width: 250px; margin:0 12px;" @clear="ClearInput">
          <el-button slot="append" icon="el-icon-search" @click="search(1)" />
        </el-input>
        <el-input v-model="title" placeholder="搜索会议主题" clearable prefix-icon="el-icon-search" style="width: 250px; margin:0 12px;" @clear="ClearInput">
          <el-button slot="append" icon="el-icon-search" @click="search(1)" />
        </el-input>
        <el-input v-model="speakerName" placeholder="搜索主讲人" clearable prefix-icon="el-icon-search" style="width: 250px; margin:0 12px;" @clear="ClearInput">
          <el-button slot="append" icon="el-icon-search" @click="search(1)" />
        </el-input>
        <el-button class="btn" type="success" style="margin:0 15px;" @click="refresh()">重 置</el-button>
      </div>
      <!-- 添加例会按钮-->
      <div class="right">
        <el-button class="btn" type="primary" @click="openmeet()">添加例会</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table :data="resp" style="width: 100%" border>
      <el-table-column prop="meetingTime" align="center" label="会议时间" style="width: 15%">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.meetingTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" align="center" label="会议主题" style="width: 15%" />
      <el-table-column prop="speakerName" align="center" label="主讲人" style="width: 15%" />
      <el-table-column prop="address" align="center" label="会议地点" style="width: 15%" />
      <el-table-column prop="participants" align="center" label="参会人员" style="width: 15%" />
      <el-table-column prop="noteTaker" align="center" label="记录人" style="width: 15%" />
      <el-table-column label="操 作" align="center">
        <template slot-scope="scope">
          <el-button size="small" @click="changemeeting(scope.row)">编 辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 会议弹窗 -->
    <el-dialog title="会议详情" :visible.sync="dialogFormVisible" :before-close="handleClose" :close-on-click-modal="false" width="500px">
      <el-form ref="pojo" :model="pojo" :rules="rules">
        <el-form-item label="会议地点:" prop="address" :label-width="formLabelWidth">
          <el-input v-model="pojo.address" autocomplete="off" />
        </el-form-item>
        <el-form-item label="会议主题:" prop="title" :label-width="formLabelWidth">
          <el-input v-model="pojo.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="起止时间:" prop="meetingTime" :label-width="formLabelWidth">
          <el-input v-model="pojo.meetingTime" placeholder="xx月xx日8:00-10:00" autocomplete="off" />
        </el-form-item>
        <el-form-item label="主讲人:" prop="speakerName" :label-width="formLabelWidth">
          <el-input v-model="pojo.speakerName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="记录人:" prop="noteTaker" :label-width="formLabelWidth">
          <el-input v-model="pojo.noteTaker" autocomplete="off" />
        </el-form-item>
        <el-form-item label="参会人员:" prop="participants" :label-width="formLabelWidth">
          <el-input v-model="pojo.participants" autocomplete="off" />
        </el-form-item>
        <el-form-item label="缺席人员:" prop="absent" :label-width="formLabelWidth">
          <el-input v-model="pojo.absent" autocomplete="off" />
        </el-form-item>
        <el-form-item label="会议内容:" prop="content" :label-width="formLabelWidth">
          <el-input v-model="pojo.content" placeholder="请输入内容" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitdata(pojo.id)">{{ text }}</el-button>
      </div>
    </el-dialog>
    <div class="paging">
      <el-pagination
        :current-page="current"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
// 引入例会接口
import { addmeeting, removemeeting, modifymeeting, querymeeting } from '~/api/meetingrecord'
// 引入时间处理函数
import '~/utils/util.js'
export default {
  data() {
    return {
      resp: [],
      keywords: '',
      meetingTime: '',
      title: '',
      speakerName: '',
      pojo: {
        meetingTime: '',
        address: '',
        title: '',
        speakerName: '',
        noteTaker: '',
        participants: '',
        absent: '',
        content: ''
      },
      // 校验规则
      rules: {
        address: [{ required: true, message: '会议地点不能为空', change: 'blur' }],
        title: [{ required: true, message: '会议主题不能为空', change: 'blur' }],
        meetingTime: [{ required: true, message: '会议时间不能为空', trigger: 'blur' }],
        speakerName: [{ required: true, message: '主讲人不能为空', trigger: 'blur' }],
        noteTaker: [{ required: true, message: '记录人不能为空', trigger: 'blur' }],
        participants: [{ required: true, message: '参会人员不能为空', trigger: 'blur' }],
        absent: [{ required: true, message: '缺席人员不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '会议内容不能为空', trigger: 'blur' }]
      },
      input: '',
      value1: '',
      value2: '',
      // 时间选择器
      time: '',
      // 弹窗
      dialogFormVisible: false,
      formLabelWidth: '100px',
      text: '',
      // 分页相关
      // 每一个页面
      current: 1,
      // 每页条数
      size: 10,
      // 总数
      total: 0
    }
  },
  created() {
    this.search()
  },
  methods: {
    handleClose() {
      this.$refs['pojo'].resetFields()
      this.dialogFormVisible = false
      this.pojo = {}
    },
    /**
     * 使用异步,切换编辑还是添加
     */
    async submitdata(id) {
      /**
       * 根据id修改
       */
      if (id) {
        await this.handleEdit(id)
      } else {
        await this.addmeet()
      }
    },
    // 分页查询例会
    // featchData() {
    //   querymeeting({
    //     current: this.current,
    //     size: this.size
    //   }).then(response => {
    //     const data = response.data.meetingIPage
    //     //  总条数
    //     this.total = data.total
    //     this.resp = data.records
    //   })
    // },
    /**
     * 分页组件,当每页条数改变后，调用
     * */
    handleSizeChange(val) {
      this.size = val
      // console.log(`每页 ${val} 条`);
      this.search()
    },
    /**
     * 当前页码改变后调用
     */
    handleCurrentChange(val) {
      this.current = val
      // console.log(`当前页: ${val}`);
      this.search()
    },
    // 例会弹窗
    openmeet() {
      this.dialogFormVisible = true
      this.text = '添 加'
    },
    // 添加例会
    addmeet() {
      this.$refs['pojo'].validate(valid => {
        if (valid) {
          addmeeting(this.pojo).then(response => {
            this.resp = response.data.meetingIPage
            if (response.code === 20000) {
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.handleClose()
              this.search()
            } else {
              this.$message({
                message: '提交失败',
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    // 删除例会
    handleDelete(id) {
      this.$confirm('确认删除这条记录吗？', '提示', {
        confirmButtonText: '确认',
        concelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          console.log('id', id)
          removemeeting(id).then(response => {
            this.resp = response.data.meetingIPage
            this.search()
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          // 取消
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 修改例会内容
    changemeeting(content) {
      this.dialogFormVisible = true
      this.text = '修 改'
      modifymeeting(content).then(response => {
        //  回显数据
        this.pojo = { ...content }
      })
    },
    // 修改例会校验
    handleEdit(id) {
      this.$refs['pojo'].validate(valid => {
        if (valid) {
          modifymeeting(this.pojo).then(response => {
            // this.resp = response.data.meetingIPage;
            // console.log(this.resp);
            if (response.code === 20000) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.missionClose()
              this.search()
            } else {
              this.$message({
                message: '提交失败',
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
      this.dialogFormVisible = false
    },
    // // 模糊查询
    // searchtitle(title) {
    //   querymeeting({
    //     title: this.title,
    //     current: this.current,
    //     size: this.size
    //   }).then(response => {

    //   })
    // },
    // searchmeetingTime(meetingTime) {
    //   querymeeting({
    //     meetingTime: this.meetingTime,
    //     current: this.current,
    //     size: this.size
    //   }).then(response => {
    //   })
    // },
    // searchspeakerName(speakerName) {
    //   querymeeting({
    //     speakerName: this.speakerName,
    //     current: this.current,
    //     size: this.size
    //   }).then(response => {
    //     this.resp = response.data.iPage.records
    //   })
    // },

    // 查询
    search(x) {
      querymeeting({
        speakerName: this.speakerName,
        meetingTime: this.meetingTime,
        title: this.title,
        current: x === 1 ? 1 : this.current,
        size: this.size
      }).then(response => {
        this.resp = response.data.iPage.records
        this.current = response.data.iPage.current
        this.total = response.data.iPage.total
      })
    },
    ClearInput() {
      this.search(1)
    },

    refresh() {
      this.meetingTime = ''
      this.title = ''
      this.speakerName = ''
      this.search()
    },
    // 清除校验
    missionClose() {
      this.$refs['pojo'].resetFields()
      this.pojo = {}
    }
  }
}
</script>
<style lang="scss" scoped>
 .box {
	position: relative;
	.paging {
		position: absolute;
		left: 50%;
		margin-left: -15%;
		.el-pagination {
			margin: 50px 0;
		}
	}
}
.block {
  display: flex;
  justify-content: space-between;
  margin:30px 0;
  .left {
    margin-left: 50px;
  }
  .right {
    margin-right: 50px;
  }
}
.btn {
  float: right;
  margin: 0 50px 20px 0;
}
</style>
