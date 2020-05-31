import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as fs from 'fs';
import responseFormatter from './middlewares/responseFormatter';
import { setHeader } from './middlewares/cors';
import loger from './middlewares/loger';
import cartoon from './routes/cartoon';
import logConfig from './config/log4js.config';

const app = new Koa();
const router = new Router();

app.use(setHeader);
app.use(bodyParser());
app.use(loger);
router.use('/cartoon', cartoon.routes(), cartoon.allowedMethods());
app.use(responseFormatter('^/cartoon'));
app.use(router.routes());

app.listen(8080, () => {
  if (logConfig.baseLogPath) {
    const confirmPath = (pathStr:string) => {
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
