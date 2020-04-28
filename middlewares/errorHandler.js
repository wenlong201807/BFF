const errorHandler = {
  error (app, logger) {

    // 处理500的
    app.use(async (ctx, next) => {
      try {
        await next()
      } catch (error) {
        logger.error(error)
        ctx.status = ctx.status || 500
        ctx.body = '500请求啦。。。/(ㄒoㄒ)/~~'
      }
      
      
      
    })


    // 处理404的
    app.use(async (ctx, next) => {
      await next()
      if (404 !== ctx.status) {
        return
      }
      ctx.status = 200
      /**
       * 如果网站经常出现404 ，500之类的错误，会影响百度搜索引擎搜录
       * 当然也会降低网站系统的性能
      */
      //  ctx.status = 404 // 默认是这个的，符合网络通讯机制，但是可以认为修改
      ctx.body = `<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>`
    })
  }
}

module.exports = errorHandler