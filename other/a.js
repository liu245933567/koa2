const Koa = require('koa'); //引入koa
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')()
const cors = require('koa2-cors');
const routerList = require('./router')
const app = new Koa(); //new 一个koa事例
app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/') {
      return ""; // 允许来自所有域名请求
    }
    return ''; // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']
}))
app.use(async (ctx, next) => {
  if (ctx.method == "OPTIONS") {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
    ctx.set("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  }
  await next();
})
app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}))
routerList.forEach(e => {
  router.get(e.url, e.controller)
})
app.use(router.routes()).use(router.allowedMethods());
app.listen(3001, () => { //监听端口
  console.log("success port on 3001") //成功后打印这句话
})

// console.log('\033[43;30m 开始获取 \033[0m 我是大神仙章节列表')
// console.log('\033[42;30m 开始获取 \033[0;32m 我是大神仙章节列表获取成功\033[0m')
// console.log('\033[41;30m 失败 \033[0;31m 我是大神仙章节列表获取失败\033[0m')
