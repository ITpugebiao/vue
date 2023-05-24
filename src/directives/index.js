import Vue from 'vue'
const requireDirective = require.context(
  '.',
  false,
  /_directive-[\w]+\.js/
)

requireDirective.keys().forEach((fileName) => {
  const directivesConfig = requireDirective(fileName)

  const directivesName = fileName
    .replace(/^\.\//, '')
    .replace(/\.\w+$/, '')
    .split('_directive-')
    .join('')

  Vue.directive(directivesName, directivesConfig.default || directivesConfig)
})
