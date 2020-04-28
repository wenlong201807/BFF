const router = require('koa-simple-router')
const BooksController = require('@controllers/BooksController')
const booksController = new BooksController()
const IndexController = require('@controllers/IndexController')
const indexController = new IndexController()
const ApiController = require('@controllers/ApiController')
const apiController = new ApiController()
module.exports = app => {
  app.use(router(_ => {
    _.get('/', indexController.actionIndex) // 跟路由渲染页面的
    // _.get('/books/list', booksController.actionIndex)
    _.get('/api/list', apiController.actionIndex) // 专门负责数据的
  }))
}