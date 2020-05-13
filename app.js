const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const api = require('./routes/user');
const db = require('./mongoDB');
const response_formatter = require('./middlewares/response_formatter');
const loger = require('./middlewares/loger');
const {cors, setHeader} = require('./middlewares/cors');
const cartoon = require('./routes/cartoon');
const app = new Koa();
const router = new Router();

app.use(cors);
app.use(setHeader);
app.use(bodyParser());
app.use(logger());
app.use(loger);

router.use('/cartoon', cartoon.routes(), cartoon.allowedMethods());

app.use(response_formatter('^/cartoon'));
app.use(router.routes(), router.allowedMethods())
app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});

module.exports = app;