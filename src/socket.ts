import * as socket from 'socket.io';
import { Server } from 'http';
// import Crawler from './crawlies/IimanhuaCrawler';
// import { formatDateToYYYYMMDDHHMMSS } from './utils/moment';

export default function mountSocket(server: Server) {
  const io = socket(server);
  // let canCraw = true;
  //监听socket连接

  io.on('connection', (client) => {
    client.on('message', async function(message) {
      console.log(message);
    });

    client.on('toCrawling', async function(message) {
      console.log(message);
      // if (canCraw) {
      //   const crawler = new Crawler((param) => {
      //     console.log(`${param.type} --- ${param.message}`);
      //     client.emit('CRAW_MESSAGE', {
      //       ...param,
      //       time: formatDateToYYYYMMDDHHMMSS(new Date())
      //     });
      //   });

      //   crawler.getListData();
      // }
    });

    //监听客户端断开连接
    client.on('disconnect', async function() {
      console.log('断开连接');
    });
  });
}
