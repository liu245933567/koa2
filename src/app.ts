import * as Koa from 'koa';
// import * as bodyParser from 'koa-bodyparser';
import * as staticServer from 'koa-static';
import * as range from 'koa-range';
import config from '@config/index';
import responseFormatter from '@middlewares/responseFormatter';
import { setHeader } from '@middlewares/cors';
import loger from '@middlewares/loger';
import { verify } from '@middlewares/auth';
import koaBody from '@middlewares/koaBody';
import routes from '@routes/index';

const app = new Koa();

app.use(setHeader);
// app.use(bodyParser());
app.use(range);
app.use(staticServer(config.staticPath));
app.use(loger);
app.use(verify);

app.use(responseFormatter('^/'));
app.use(koaBody);
app.use(routes);

export default app.callback();
