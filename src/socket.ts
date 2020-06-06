import * as socket from 'socket.io';
import { Server } from 'http';

export default function mountSocket(server: Server) {
  const io = socket(server);
  //监听socket连接

  io.on('connection', (client) => {
    setInterval(() =>{
        client.emit('news', { hello: 'world' });
    }, 1000);
    client.on('message', async function(message) {
      console.log(message);
    });

    client.on('myaa', async function(message) {
      console.log(message);
    });

    //监听客户端断开连接
    client.on('disconnect', async function() {
      console.log('断开连接');
    });
  });
}
