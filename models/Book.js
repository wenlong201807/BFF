/**
 * @fileoverview 实现Book数据模型
 * @author wenlongzhu@1573511441@qq.com
*/

class Books {
  /**
   * Books的类，获取后台有关图书的相关数据类
   * @class
  */
  /**
   * @constructor
   * @param {object} app koa2的执行上下文
  */
  constructor(app) {
    this.app = app
  }

  /**
   * 获取后台全部图书列表的接口
   * @param {*} options 配置项
   * @example
   * return new Promise
   * getData(options)
  */
  getData (options) {
    return Promise.resolve({
      result: "数据请求成功66",
      status:200
    })
    // return Promise.resolve("数据请求成功66")
  }
}

module.exports = Books