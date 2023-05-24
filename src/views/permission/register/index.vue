<template>
  <div class="contaniner">
    <div class="center">
      <p>注册用户</p>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            type="text"
            autocomplete="off"
            placeholder="请输入用户名"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item prop="nickName">
          <el-input
            v-model="ruleForm.nickName"
            type="text"
            autocomplete="off"
            placeholder="请输入真实姓名"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="请输入密码"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="repPassword">
          <el-input
            v-model="ruleForm.repPassword"
            type="password"
            placeholder="确认密码"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <div class="reg-btn">
            <el-button
              :disabled="disabled"
              @click="submitForm('ruleForm')"
            >
              注册
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Checkout, Register } from '~/api/permission/register'
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入密码'))
      }
      return callback()
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        return callback(new Error('两次输入密码不一致!'))
      }
      return callback()
    }
    const validatePass3 = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入用户名'))
      } else if (!/^[^\u4e00-\u9fa5]+$/.test(value)) {
        return callback(new Error('用户名不能为中文'))
      }
      return callback()
    }
    return {
      ruleForm: {},
      rules: {
        username: [{ required: true, validator: validatePass3, trigger: 'blur' }],
        nickName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        repPassword: [{ validator: validatePass2, trigger: 'blur' }]
      },
      disabled: true
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.userNames(this.ruleForm.username);
          this.submitUser()
        } else {
          this.$message.error('信息格式错误')
          return false
        }
      })
    },
    handleChange(e) {
      Checkout(e)
        .then(res => {
          if (res.data.nameyesno) {
            this.$message.error('用户名已存在')
            this.disabled = true
          } else {
            this.disabled = false
          }
        })
        .catch(() => {
          this.$message.error('用户名已存在')
        })
    },
    submitUser() {
      Register(this.ruleForm)
        .then(() => {
          this.$message.success('注册成功')
          this.ruleForm = {}
          this.disabled = true
          setTimeout(() => {
            window.location.href = `${process.env.VUE_APP_AUTH_URL}?redirectURL=${process.env.VUE_APP_REGISTER}/#/welcome`
          }, 1000)
        })
        .catch(() => {
          this.$message.error('注册失败')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.contaniner {
  background-color: rgba(126, 145, 214, 0.5);
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-attachment: fixed;
}
.center {
  width: 70%;
  margin: auto;

  p {
    width: 100%;
    text-align: center;
    font-size: 25px;
    font-weight: 500;
    padding: 70px 0 30px 0;
    color: white;
  }
}
::v-deep .el-form {
  background: rgba(126, 145, 214, 0.6);
  margin-top: 20px;
  border-radius: 20px;
}
::v-deep .el-form-item__content {
  margin: 0 20px !important;
}
::v-deep .el-input__inner {
  background: rgba(126, 145, 214, 0.5);
  border: 0;
  // border-bottom: 1px solid white;
  border-radius: 20px;
  margin-top: 10px;
  color: white;
}
::v-deep .reg-btn {
  width: 60%;
  margin: auto;
  button {
    display: block;
    width: 100%;
    padding: 5px 0;
    border-radius: 20px;
    margin-bottom: 10px;
  }
}
::v-deep input::-webkit-input-placeholder {
  color: white !important;
}
</style>
