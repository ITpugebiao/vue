const myPlugins = []
if (process.env.NODE_ENV === 'production') {
  myPlugins.push('transform-remove-console')
}
module.exports = {
  plugins: [...myPlugins],
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
