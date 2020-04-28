const Koa = require("koa");
const app = new Koa;

app.use(async (ctx, next) => {
  console.log('1');
  await next(); // 调用下一个middleware
  // return next(); // 如果使用了return ，那么当前use中return后面的代码就不再执行
  console.log('5')
});
app.use(async (ctx, next) => {
  console.log('2');
  // await next(); // 调用下一个middleware
  return next(); // 如果使用了return ，那么当前use中return后面的代码就不再执行
  console.log('4');
});
app.use(async (ctx, next) => {
  console.log('3');
});

app.listen(3000)
console.log("http://localhost:3000 666")