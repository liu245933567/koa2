const Koa = require('koa')
// const { join } = require('path')
const Woshidashenxian = require('./woshidashenxian');
const woshidashenxian = new Woshidashenxian();

const app = new Koa()
app.use(async (ctx, next) => {
  const sectionsList = await woshidashenxian.getSectionsList();
  ctx.body = JSON.stringify({sectionsList})
})

app.listen(3000)