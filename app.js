const moduleAlias = require('module-alias')
moduleAlias.addAliases({
  '@root': __dirname,
  '@controllers': __dirname + '/controllers',
  '@models': __dirname + '/models',
})

const Koa = require('koa')
const render = require('koa-swig')
const { port, viewDir, staticDir } = require('./config')
const co = require('co')
const app = new Koa()
const serve = require('koa-static')
const { historyApiFallback } = require('koa2-connect-history-api-fallback')
app.use(serve(staticDir))
app.use(historyApiFallback({ index: '/', whiteList: ['/api'] })) // 开启前后端混合接口模式，刷新不丢失页面

// 后端渲染html模式
app.context.render = co.wrap(render({
  root: viewDir,
  autoescape: true,
  cache: process.env.NODE_ENV == "development" ? false : 'memory',
  ext: 'html',//渲染文件的后缀
  writeBody: false,
  varControls: ["[[", "]]"]
  // local: locals,
  // filters: filters,
  // tags: tags,
  // extensions: extensions
}))

// 路由注册中心
require("./controllers/index")(app)

app.listen(port, () => {
  console.log(`服务启动成功：http://localhost:${port}`)
})