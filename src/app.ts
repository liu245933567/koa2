import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as koaBody from 'koa-body';
import * as path from 'path';
import * as staticServer from 'koa-static';
import * as range from 'koa-range';
import config from '@config/index';
import responseFormatter from '@middlewares/responseFormatter';
import {
  // setHeader,
  cors
} from '@middlewares/cors';
import loger from '@middlewares/loger';
// import { verify } from '@middlewares/auth';
import cartoon from '@routes/cartoon';
// import video from '@routes/video';
// import admin from '@routes/admin';

import user from '@routes/user';

const app = new Koa();
const router = new Router();

// app.use(setHeader);
app.use(cors);
app.use(bodyParser());
app.use(
  koaBody({
    multipart: true, // 支持文件上传
    encoding: 'gzip',
    formidable: {
      uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
      onFileBegin: (name, file) => {
        // 文件上传前的设置
        console.log(`name: ${name}`);
        console.log(file);
      }
    }
  })
);
app.use(range);
app.use(staticServer(config.staticPath));
app.use(loger);
// app.use(verify);

router.use('/cartoon', cartoon.routes(), cartoon.allowedMethods());
// router.use('/admin', admin.routes(), admin.allowedMethods());
// router.use('/video', video.routes(), video.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());

app.use(responseFormatter('^/'));

app.use(router.routes());

export default app.callback();
