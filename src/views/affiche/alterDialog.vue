<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      :fullscreen="true"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      center
    >
      <template slot="title"><p class="title">查看公告</p></template>
      <el-form ref="alterForm" :model="newAlterForms" label-width="80px" label-position="left">
        <el-form-item label="标题">
          <el-input v-model="newAlterForms.title" placeholder="请填写标题" class="input-width" />
        </el-form-item>
        <el-form-item label="发布人">
          <el-input v-model="newAlterForms.publisher" :disabled="true" placeholder="请填写发布人" class="input-width" />
        </el-form-item>
        <el-form-item label="所属部门">
          <el-select v-model="newAlterForms.department" placeholder="请选择部门" class="input-width">
            <el-option label="助理办" value="0" />
            <el-option label="人事部" value="1" />
            <el-option label="效率部" value="2" />
            <el-option label="宣传部" value="3" />
            <el-option label="资产部" value="4" />
          </el-select>
        </el-form-item>
        <!-- 富文本编辑器 -->
        <editor ref="editor" @changeHtml="changeHtml">
          <div v-html="newAlterForm.content" />
        </editor>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" style="margin-right: 100px" @click="updateBtn">修 改</el-button>
        <el-button type="danger" @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// 引入富文本组件
import editor from '../../components/Editor/index'
// 引入Api
import { updateBulletin } from '~/api/affiche'
// 引入深拷贝
import { deepCopy } from '../../utils/util'
export default {
  components: {
    editor
  },
  props: {
    visible: {
      // 弹窗窗口  默认不自动弹出
      type: Boolean,
      default: false
    },
    // 关闭对话框
    remoteClose: {
      type: Function,
      default: function() {}
    },
    // 根据id查询的公告数据
    alterForm: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },

  computed: {
    newAlterForm() {
      return deepCopy(this.alterForm)
    },
    newAlterForms() {
      return this.alterForm
    }
  },
  methods: {
    init() {
      this.$refs.editor.setHtml(this.myeditor)
    },
    save() {
      this.myeditor = this.$refs.editor.getHtml()
    },
    changeHtml(value) {
      this.newAlterForm.content = value
    },
    // 修改公告
    updateBtn() {
      updateBulletin(this.newAlterForm).then(res => {
        this.$message({
          type: 'success',
          message: '修改成功',
          duration: 1500
        })
        // 关闭对话框
        this.remoteClose()
      })
    },
    // 取消对话框
    handleClose() {
      this.remoteClose()
    }
  }
}
</script>

<style  scoped>
.input-width{
  width: 15%;
}
.title {
  font-size: 30px;
  font-weight: 300;
  text-shadow: 0 8px 5px #8896ab;
}
</style>
