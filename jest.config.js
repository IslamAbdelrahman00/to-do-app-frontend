module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  automock: false,
  resetMocks: false,
  setupFiles: [
    './setupJest.js'
  ]
}
