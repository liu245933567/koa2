const cors = require('koa2-cors');

module.exports = {
  cors: cors({
    origin: function (ctx) {
      if (ctx.url === '/') {
        return "";
      }
      return '';
    },
    allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']
  }),
  async setHeader (ctx, next) {
    if (ctx.method == "OPTIONS") {
      ctx.set("Access-Control-Allow-Origin", "*");
      ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
      ctx.set("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    }
    await next();
  }
}