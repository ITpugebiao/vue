<template>
  <div>
    <el-dialog
      :visible.sync="box"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-radio-group
        v-model="text"
        class="list"
      >
        <div v-for="(item,index) in list" :key="index">
          <el-radio :label="item.value">{{ item.name }}</el-radio>
        </div>
      </el-radio-group>
    </el-dialog>

    <span>
      <i
        class="basic-icon basic-icon-yifupifu"
        @click="open"
      />
    </span>
  </div>
</template>

<script>
import { setTheme } from '~/utils/util'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      box: false,
      text: '',
      list: [
        {
          name: '默认主题',
          value: 'default'
        },
        {
          name: '好看主题',
          value: 'theme-hk'
        },
        {
          name: '炫酷主题',
          value: 'theme-xk'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['themeName'])
  },
  watch: {
    text: {
      handler(val) {
        this.$store.commit('common/SET_THEME_NAME', val)
        setTheme(val)
      }
    }
  },
  mounted() {
    this.text = this.themeName
    if (!this.text) {
      this.text = ''
    }
  },

  methods: {
    open() {
      this.box = true
    }
  }

}
</script>

<style scoped>
.list {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
</style>
