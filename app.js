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
const log4js = require('log4js');
const errorHandler = require('./middlewares/errorHandler');
const app = new Koa()
const serve = require('koa-static')
// const { historyApiFallback } = require('koa2-connect-history-api-fallback')
app.use(serve(staticDir))
// app.use(historyApiFallback({ index: '/', whiteList: ['/api'] })) // 开启前后端混合接口模式，刷新不丢失页面

log4js.configure({
  appenders: { cheese: { type: 'file', filename: './logs/long.log' } },
  // categories: { default: { appenders: ['cheese'], level: 'trace' } } // error 对应下面的类型
  categories: { default: { appenders: ['cheese'], level: 'error' } } // error 对应下面的类型
});
const logger = log4js.getLogger('cheese');
// logger.trace('Entering cheese testing'); // 错误路径监听**配合前端很重要
// logger.debug('Got cheese.'); // 开发过程中的debug
// logger.info('Cheese is Comté.'); // 正常的提示信息
// logger.warn('Cheese is quite smelly.'); //警告
// logger.fatal('Cheese was breeding ground for listeria.'); // 系统会挂掉
// logger.error('Cheese is too ripe!'); // 小错误，不至于项目奔溃


// 后端渲染html模式
app.context.render = co.wrap(render({
  root: viewDir,
  autoescape: true,
  cache: process.env.NODE_ENV == "development" ? false : 'memory',
  ext: 'html',//渲染文件的后缀
  writeBody: false,
  varControls: ["[[", "]]"]
}))

//错误处理中间件
errorHandler.error(app,logger)
// 路由注册中心
require("./controllers/index")(app)

app.listen(port, () => {
  console.log(`服务启动成功：http://localhost:${port}`)
})