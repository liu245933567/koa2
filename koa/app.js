const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

router
  .get('/', async (ctx) => {
    ctx.body = '首页';
  })
  .get('/news', async (ctx) => {
    ctx.body = '这是新闻业';
  })
  .post('/carton/cartonDetail.json', async (ctx) => {
    ctx.body = {
      name: 1223
    };
  })

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);