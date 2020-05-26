import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import responseFormatter from './middlewares/response_formatter';
import loger from './middlewares/loger';
import {setHeader} from './middlewares/cors';
import cartoon from './routes/cartoon';
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

// module.exports = app;
export default app;
