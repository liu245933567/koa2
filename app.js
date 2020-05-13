const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const app = new Koa();
const api = require('./routes/api');
const db = require('./mongoDB');
const router = new Router();
const response_formatter = require('./middlewares/response_formatter');
//log工具
const logUtil = require('./utils/log_util');

app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/') {
      return "";
    }
    return '';
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
}));

// logger
app.use(async (ctx, next) => {
  //响应开始时间
  const start = new Date();
  //响应间隔时间
  var ms;
  try {
    //开始进入到下一个中间件
    await next();
    ms = new Date() - start;
    //记录响应日志
    logUtil.logResponse(ctx, ms);
  } catch (error) {
    ms = new Date() - start;
    //记录异常日志
    logUtil.logError(ctx, error, ms);
  }
});

router.use('/api', api.routes(), api.allowedMethods());
app.use(response_formatter('^/api'));


// 动漫列表
router.post('/cartoon/cartoonList.json', async (ctx) => {
  const cartoonList = await db.find(`cartoon_list`, {});
  ctx.response.body = {
    status: 200,
    isOk: true,
    msg: '',
    cartoonList: cartoonList || []
  };
})

// 章节列表
router.post('/cartoon/cartoonDetail.json', async (ctx) => {
  const sectioList = await db.find(`cartoon_woshidashenxian_section_list`, {});
  ctx.response.body = {
    status: 200,
    isOk: true,
    msg: '',
    sectioList: sectioList || []
  };
})

// 章节详情
router.post('/cartoon/sectionDtail.json', async (ctx) => {
  ctx.response.body = {
    status: 200,
    isOk: true,
    msg: '',
    sectios: []
  };
})


app.use(router.routes())
app.use(router.allowedMethods());

module.exports = app;