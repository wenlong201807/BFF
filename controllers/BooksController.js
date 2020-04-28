

const Books = require('@models/Book')

class BooksController {
  constructor() {

  }

  async actionIndex (ctx, next) {
    const books = new Books()
    const result = await books.getData()
    ctx.body = result

  }
}

module.exports = BooksController
