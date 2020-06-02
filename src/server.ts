import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as koaJwt from 'koa-jwt';
import * as fs from 'fs';
import responseFormatter from './middlewares/responseFormatter';
import { setHeader } from './middlewares/cors';
import loger from './middlewares/loger';
import {verify} from './middlewares/auth';
import cartoon from './routes/cartoon';
import user from './routes/user';
import logConfig from './config/log4js.config';
import conf from './config';

const app = new Koa();
const router = new Router();
const SECRET = 'shared-secret';

app.use(setHeader);
app.use(bodyParser());
app.use(loger);

//路由权限控制 除了path里的路径不需要验证token 其他都要
app.use(
  koaJwt({
    secret: SECRET,
    // passthrough: true,
    isRevoked: verify
  }).unless({
    path: [/login.json$/, /^\/register/]
  })
);
// 中间件对token进行验证
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: '请先登录~'
      };
    } else {
      throw err;
    }
  });
});


router.use('/cartoon', cartoon.routes(), cartoon.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());


app.use(responseFormatter('^/cartoon'));
app.use(router.routes());

app.listen(conf.port, () => {
  if (logConfig.baseLogPath) {
    const confirmPath = (pathStr: string) => {
      // eslint-disable-next-line no-sync
      if (!fs.existsSync(pathStr)) {
        // eslint-disable-next-line no-sync
        fs.mkdirSync(pathStr);
        console.log('createPath: ' + pathStr);
      }
    };

    confirmPath(logConfig.baseLogPath);
    confirmPath(logConfig.appenders.errorLogger.path);
    confirmPath(logConfig.appenders.resLogger.path);
  }
});

console.log('服务启动成功');
