const logConfig = require('./log4js.config');

// 开发环境的配置内容
module.exports = {
  //环境名称
  env: 'development',
  //服务端口号
  port: 3000,
  // 数据库配置
  dbConfig: {
    host: 'mongodb://localhost:27017',
    user: 'root',
    password: '',
    database: 'cartoon',
  },
  redisUrl: '', //redis地址
  redisPort: '', //redis端口号
  logConfig,
};