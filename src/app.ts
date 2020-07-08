import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
// import * as path from 'path';
import * as staticServer from 'koa-static';
import * as range from 'koa-range';
import config from '@config/index';
import responseFormatter from '@middlewares/responseFormatter';
import {
  // setHeader,
  cors
} from '@middlewares/cors';
import loger from '@middlewares/loger';
import { verify } from '@middlewares/auth';
import cartoon from '@routes/cartoon';
// import video from '@routes/video';
// import admin from '@routes/admin';

import user from '@routes/user';

const app = new Koa();
const router = new Router();

// app.use(setHeader);
app.use(cors);
app.use(bodyParser());
app.use(range);
app.use(staticServer(config.staticPath));
app.use(loger);
app.use(verify);

router.use('/cartoon', cartoon.routes(), cartoon.allowedMethods());
// router.use('/admin', admin.routes(), admin.allowedMethods());
// router.use('/video', video.routes(), video.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());

app.use(responseFormatter('^/'));

app.use(router.routes());

export default app.callback();
