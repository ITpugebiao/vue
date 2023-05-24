<template>
  <div class="error-page">
    <div class="error-page-content">
      <img
        :src="`${require('~/assets/svg/errorPage.svg')}`"
      >
      <div class="error-text">
        <div class="error">
          404
        </div>
        <div class="sorry">
          抱歉，你访问的页面不存在
        </div>
        <el-button
          type="primary"
          @click="backHome"
        >
          返回首页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    backHome() {
      document.location.href = '/'
    }
  }
}
</script>

<style lang='scss' scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #fff;
  .error-page-content {
    display: flex;
    img {
      width: 438px;
      height: 269px;
    }
    .error-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 80px;
      .error {
        font-size: 56px;
        font-weight: 500;
      }
      .sorry {
        font-size: 16px;
        margin-top: 8px;
      }
      ::v-deep .el-button {
        width: 98px;
        margin-top: 40px;
      }
    }
  }
}
</style>
