const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const responseFormatter = require('./middlewares/response_formatter');
const loger = require('./middlewares/loger');
const {setHeader} = require('./middlewares/cors');
const cartoon = require('./routes/cartoon');
const app = new Koa();
const router = new Router();


app.use(setHeader);
app.use(bodyParser());
app.use(logger());
app.use(loger);
router.use('/cartoon', cartoon.routes(), cartoon.allowedMethods());

app.use(responseFormatter('^/cartoon'));
app.use(router.routes(), router.allowedMethods());
app.on('error', function(err, ctx) {
  logger.error('server error', err, ctx);
});

module.exports = app;
