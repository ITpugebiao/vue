<template>
  <div>
    <el-dialog title="添加轮播图" :visible.sync="controllingVisible" width="30%" :before-close="controllValidate" :close-on-click-modal="false">
      <el-form
        ref="controllingDatas"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        status-icon
        :model="controllingDatas"
        :rules="rules"
      >
        <el-form-item label="励志语:" prop="sentence">
          <!--  eslint-disable-next-line -->
				<el-input v-model="controllingDatas.sentence"></el-input>
        </el-form-item>
        <el-form-item label="上传:" prop="pictureUrl">
          <UploadCropper :image-url="controllingDatas.pictureUrl" :extend="extend" :class-name="className" @func="controlling" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="controllValidate">取 消</el-button>
        <el-button type="primary" @click="addControll">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { AddCarousel } from '../../api/carousel'
import UploadCropper from '../../components/UploadCropper'
export default {
  name: 'PugePersonnelMattersSystemControllingvisible',
  components: {
    UploadCropper
  },
  props: {
    controllingVisible: {
      type: Boolean,
      default: false
    },
    controllingData: {
      type: Object,
      default: () => {}
    },
    controllingHolse: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      extend: '.jpg,.png,jpeg', // 上传图片格式
      className: 'avatar-uploader', // 上传组件样式
      rules: {
        sentence: [
          { required: true, message: '请输入励志语', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在6到30个字符', trigger: 'blur' }
        ],
        pictureUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    controllingDatas() {
      return this.controllingData
    }
  },

  mounted() {},

  methods: {
    //   添加轮播图
    addControll() {
      // 校验
      this.$refs.controllingDatas.validate((valid) => {
        if (valid) {
          AddCarousel(this.controllingData).then(res => {
            if (res.code === 20000) {
              this.$message({
                type: 'success',
                message: `轮播添加成功`,
                duration: 1500
              })
              this.controllValidate()
            }
          })
        }
      })
    },
    // 上传图片地址
    controlling(item) {
      this.controllingDatas.pictureUrl = item
    },

    // 清除校验
    controllValidate() {
      this.controllingHolse()
      this.$refs.controllingDatas.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped></style>
