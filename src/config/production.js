const logConfig = require('./log4js.config');

// 开发环境的配置内容
module.exports = {
  //环境名称
  env: 'production',
  //服务端口号
  port: 3000,
  // 数据库配置
  dbConfig: {
    host: '127.0.0.1:27017',
    username: 'admin',
    password: '123456',
    database: 'cartoon',
    useNewUrlParser: true, useUnifiedTopology: true
  },
  redisUrl: '', //redis地址
  redisPort: '', //redis端口号
  logConfig
};
