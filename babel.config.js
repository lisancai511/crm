module.exports = {
  plugins: ['@babel/plugin-proposal-optional-chaining'],
  presets: [
    ['@vue/babel-preset-jsx', {
      injectH: false
    }],
    '@vue/cli-plugin-babel/preset'
  ]
}
