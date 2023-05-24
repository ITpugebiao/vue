module.exports = {
  jest: {
    collectCoverage: true,
    collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**'],
    preset: '@vue/cli-plugin-unit-jest'
  }
}
