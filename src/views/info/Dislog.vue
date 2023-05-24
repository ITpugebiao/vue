<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="500px"
    :before-close="remoteCloses"
    :close-on-click-modal="false"
    :destroy-on-close="true"
  >
    <!-- // label-position 向右对齐                   //表单校验图标 -->
    <el-form
      ref="user"
      :model="user"
      label-width="100px"
      label-position="right"
      style="width:400px"
      status-icon
    >
      <el-form-item
        label="姓名: "
      >
        <el-input
          v-model="user.name"
          :disabled="disflag"
        />
      </el-form-item>
      <el-form-item
        label="身份证号: "
      >
        <el-input
          v-model="user.nubmerInfo"
          maxlength="50"
          :disabled="disflag"
        />
      </el-form-item>
      <el-form-item
        label="手机号: "
      >
        <el-input
          v-model="user.mobile"
          maxlength="11"
          :disabled="disflag"
        />
      </el-form-item>
      <el-form-item
        label="邮箱: "
      >
        <el-input
          v-model="user.pugeEmail"
          maxlength="50"
          :disabled="disflag"
        />
      </el-form-item>
      <el-form-item
        label="生日: "
      >
        <el-input
          v-model="user.pugeBirthday"
          maxlength="50"
          :disabled="disflag"
        />
      </el-form-item>
      <el-form-item
        label="工号: "
      >
        <el-input
          v-model="user.pugeNumber"
          maxlength="50"
          :disabled="disflag"
        />
      </el-form-item>
      <el-form-item
        label="籍贯: "
      >
        <el-input
          v-model="user.nativeInfo"
          maxlength="50"
          :disabled="disflag"
        />
      </el-form-item>
      <el-form-item
        label="是否单亲: "
      >
        <el-radio-group v-model="user.yesnoInfo" :disabled="disflag">
          <el-radio
            :label="'1'"
            border
          >单亲</el-radio>
          <el-radio
            :label="'0'"
            border
          >双亲</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="家庭人数: "
      >
        <el-input
          v-model="user.familyNumber"
          maxlength="50"
          :disabled="disflag"
        />
      </el-form-item>
      <el-form-item
        label="家庭状况: "
      >
        <el-input
          v-model="user.familyMoneyInfo"
          maxlength="50"
          :disabled="disflag"
        />
      </el-form-item>
      <el-form-item
        label="是否离职: "
      >
        <el-radio-group v-model="user.yesnoQuit" :disabled="disflag">
          <el-radio
            :label="'0'"
            border
          >未离职</el-radio>
          <el-radio
            :label="'1'"
            border
          >已离职</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      // 弹窗的标题
      type: String,
      default: ''
    },
    visible: {
      // 弹窗窗口  默认不自动弹出
      type: Boolean,
      default: false
    },
    remoteCloses: {
      type: Function,
      default: function() {}
    }, // 用于关闭窗口
    userDatas: {
      // 提交表单数据
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      disflag: true
    }
  },
  computed: {
    user() {
      return this.userDatas
    }
  }
}
</script>

<style>

</style>
