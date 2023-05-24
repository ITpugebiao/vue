<template>
  <el-color-picker
    v-model="themeVal"
    size="mini"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<script>
import color from '~/mixins/color'
export default {
  name: 'TopColor',
  mixins: [color()],
  data() {
    return {
      chalk: ''
    }
  }
}
</script>
