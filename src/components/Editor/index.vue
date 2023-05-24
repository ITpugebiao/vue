<template>
  <div class="home">
    <div id="demo1">
      <slot />
    </div>
  </div>
</template>

<script>
// 引入 wangEditor
import WangEditor from 'wangeditor'
// import { searchQuit } from '~/api/oss'
export default {
  data() {
    return {
      editor: null,
      editorData: ''
    }
  },
  mounted() {
    const editor = this.singleEditor()
    console.log(editor)
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = newHtml => {
      // console.log(newHtml)
      this.editorData = newHtml
      this.$emit('changeHtml', this.editorData)
    }
    // 创建编辑器
    editor.create()
    this.editor = editor
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  },
  methods: {
    singleEditor() {
      let editor = null
      if (editor) {
        return editor
      }
      editor = new WangEditor(`#demo1`)
      return editor
    }
  }
}
</script>

<style lang="scss">

</style>

