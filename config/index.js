const { join } = require('path')
const { extend } = require('loadsh')
let config = {
  "viewDir": join(__dirname, '..', 'views'),
  "staticDir": join(__dirname, '..', 'assets'),
}

if (process.env.NODE_ENV === "development") {
  const localConfig = {
    port: 8081
  }
  config = extend(config, localConfig)
}
if (process.env.NODE_ENV === "production") {
  const prodConfig = {
    port: 80
  }
  config = extend(config, prodConfig)
}

module.exports = config