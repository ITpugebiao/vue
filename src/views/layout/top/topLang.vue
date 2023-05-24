<template>
  <el-dropdown
    trigger="click"
    @command="handleSetLanguage"
  >
    <i class="basic-icon basic-icon-zhongyingwen" />
    <el-dropdown-menu
      slot="dropdown"
      style="left: 0;"
    >
      <el-dropdown-item
        :disabled="language==='zh'"
        command="zh"
      >
        中文
      </el-dropdown-item>
      <el-dropdown-item
        :disabled="language==='en'"
        command="en"
      >
        English
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TopLang',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['language'])
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.commit('common/SET_LANGUAGE', lang)
    }
  }
}
</script>

<style lang="scss">
</style>
