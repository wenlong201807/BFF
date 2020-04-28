

class IndexController {
  constructor() {

  }

  async actionIndex (ctx, next) {
    // vue spa + mpa 混用阶段
    // ctx.body = await ctx.render('index-vue')
    ctx.body = await ctx.render('index', {
      data: '京程一灯🏮前端精英小分队'
      // data  // 一个数据没有正常返回，就会挂掉 // 需要错误处理机制
    })
  }
}

module.exports = IndexController