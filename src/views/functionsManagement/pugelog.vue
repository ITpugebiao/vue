<template>
  <div class="box">
    <el-button type="primary" class="add-log" @click="releaselog()">发布日志</el-button>
    <!-- 弹窗 -->
    <el-dialog title="发布日志" :visible.sync="dialogFormVisible" :before-close="handleClose" :close-on-click-modal="false" width="750px">
      <el-form ref="pojo" :model="pojo" :rules="rules">
        <el-form-item prop="userName" label="发布人:" label-position="left" :label-width="formLabelWidth">
          <el-input v-model="pojo.userName" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="logTitle" label="发布标题:" label-position="left" :label-width="formLabelWidth">
          <el-input v-model="pojo.logTitle" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="logBody" label="发布内容:" label-position="left" :label-width="formLabelWidth">
          <el-input v-model="pojo.logBody" type="textarea" autocomplete="off" />
        </el-form-item>
        <!--富文本暂弃用
         <el-form-item>
          <editor v-if="dialogFormVisible" ref="editor" :txt="text1.logBody" @changeHtml="changeHtml" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitdata(pojo.id)">{{ text }}</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗出标题和内容  -->
    <el-dialog
      v-if="dialogVisible"
      :title="pojo.logTitle"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div v-html="pojo.logBody" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 时间轴 -->
    <div class="block">
      <el-timeline :model="list">
        <el-timeline-item
          v-for="(item, id) in list"
          :key="id"
          class="btn"
          :timestamp="item.gmtCreate"
          placement="top"
          style="width: 85%; margin: auto"
          color="#5a9cf7"
        >
          <el-card @click.native="Popup(item)">
            <div class="card-flex">
              <div>
                <h2>{{ item.logTitle }}</h2>
                <!-- <p style="font-size: 16px" v-html="item.logBody"></p> -->
                <p style="color: #85888e; margin: 15px 0 0 0">{{ item.userName }} 提交时间 {{ item.gmtModified }}</p>
              </div>
              <div class="card-flex" style="margin-left: 20px">
                <el-button type="primary" size="medium" class="modify" @click.stop="amend(item.id)">修 改</el-button>
                <el-button
                  type="danger"
                  size="medium"
                  class="delete"
                  @click.stop="handleDelete(item.id)"
                >删 除</el-button>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <!-- 分页功能  -->
    <div class="paging">
      <el-pagination
        :current-page="current"
        :page-sizes="[5, 10, 15, 20]"
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
import { addlog, removelog, modifylog, paginglog, querylog } from '~/api/log'
// 引入富文本编辑组件
// import editor from '../../components/Editor/index.vue'
import { deepCopy } from '../../utils/util'

export default {
  // components: {
  //   editor
  // },
  data() {
    return {
      // myeditor: '',
      list: [],
      // 分页相关
      // 当前页面
      current: 1,
      // 每页条数更改
      size: 5,
      total: 0,
      records: '',
      // 控制弹窗
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogVisible: false,
      // 数据
      pojo: {
        logBody: '',
        logTitle: '',
        userName: ''
      },
      text: '',
      text1: {},
      // 校验规则
      rules: {
        userName: [{ required: true, message: '发布人不能为空', trigger: 'blur' }],
        logTitle: [{ required: true, message: '发布标题不能为空', trigger: 'blur' }],
        logBody: [{ required: true, message: '发布内容不能为空', trigger: 'blur' }]
      },
      formLabelWidth: '100px',
      flag: false
    }
  },
  computed: {
    activeValues() {
      return this.logBody
    }
    // 获取用户id
    // userId() {
    //   return JSON.parse(Cookie.get(Key.userInfoKey)).uid
    // }
  },
  created() {
    this.featchData()
  },
  methods: {
    handleClose() {
      this.$refs['pojo'].resetFields()
      this.dialogFormVisible = false
      this.pojo = {}
    },
    // 富文本编辑
    // init() {
    //   this.$refs.editor.setHtml(this.myeditor)
    // },
    // save() {
    //   this.myeditor = this.$refs.editor.getHtml()
    //   console.log(this.myeditor)
    // },
    // changeHtml(data) {
    //   console.log(data)
    //   this.pojo.logBody = data
    //   console.log('=>', this.pojo)
    // },
    /**
     * 使用异步,切换编辑还是添加
     */
    async submitdata(id) {
      /**
       * 根据id修改
       */
      if (id) {
        // 修改
        await this.Modify(id)
      } else {
        await this.submitlog()
      }
    },
    // 分页功能
    featchData() {
      paginglog({ current: this.current, size: this.size }).then(response => {
        const data = response.data.logIPage
        //  总条数
        this.total = data.total
        this.list = data.records
        // console.log(data);
      })
    },
    /**
     * 分页组件,当每页条数改变后，调用
     * */
    handleSizeChange(val) {
      this.size = val
      // console.log(`每页 ${val} 条`);
      this.featchData()
    },
    /**
     * 当前页码改变后调用
     */
    handleCurrentChange(val) {
      this.current = val
      // console.log(`当前页: ${val}`);
      this.featchData()
    },
    // 点击按钮添加日志
    releaselog() {
      this.dialogFormVisible = true
      this.text = '提 交'
      this.pojo = {}
      this.text1 = { }
    },
    // 提交日志
    submitlog() {
      this.$refs['pojo'].validate(valid => {
        if (valid && this.pojo.logBody) {
          addlog(this.pojo).then(response => {
            if (response.code === 20000) {
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.handleClose()
              this.featchData()
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

    // 删除数据
    handleDelete(id) {
      this.$confirm('确认删除这条记录吗？', '提示', {
        confirmButtonText: '确认',
        concelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          console.log('id', id)
          removelog(id).then(response => {
            this.data = response.data
            this.featchData()
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
      this.featchData()
    },
    // 根据id查询日志信息
    amend(id) {
      this.text1 = deepCopy(this.pojo)
      this.dialogFormVisible = true
      this.text = '修 改'
      // 根据id查询日志信息
      querylog(id).then(response => {
        this.pojo = response.data.log
        this.text1 = deepCopy(this.pojo)
      })
    },
    // 修改日志
    Modify() {
      this.$refs['pojo'].validate(valid => {
        if (valid) {
          modifylog(this.pojo).then(response => {
            // const resp = response.data.log
            // console.log(resp);
            if (response.code === 20000) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.featchData()
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
    Popup(item) {
      // console.log(item);
      this.dialogVisible = true
      this.pojo.logBody = item.logBody
      this.pojo.logTitle = item.logTitle
    },
    resetForm(pojo) {
      this.$refs[pojo].resetFields()
    }
  }

}
</script>
<style lang="scss" scoped>
.box {
  position: relative;
  .add-log {
    float: right;
    margin: 0 60px 0 100px;
  }
  .block {
    margin: 50px 0;
    .card-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }
  }
  .paging {
    position: absolute;
    left: 50%;
    margin-left: -15%;
    .el-pagination {
      margin-bottom: 50px;
    }
  }
}
</style>
