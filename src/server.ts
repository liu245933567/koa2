// import 'module-alias/register';
import * as fs from 'fs';
import * as http from 'http';
import mountSocket from '@src/socket';
import logConfig from '@config/log4js.config';
import conf from '@config/index';
import app from '@src/app';
import connectDB from '@src/mongo';
import '@models/section';
import '@models/cartoon';

connectDB()
  .then(() => {
    //如果原来是用app.listen(3000);来启动服务，现在要改成用http来启动server
    const server = http.createServer(app);

    //挂载socket
    mountSocket(server);

    server.listen(conf.port, () => {
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
      console.log('服务启动成功');
    });
  })
  .catch(() => {
    console.log('数据库连接失败');
  });
