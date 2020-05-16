const logConfig = require('./log4js.config');

// 测试环境的配置内容
module.exports = {
  env: 'test', //环境名称
  port: 3001, //服务端口号
  dbConfig: {
    host: '49.233.26.21:27017',
    username: 'admin',
    password: '123456',
    database: 'cartoon'
  },
  redis_url: '', //redis地址
  redis_port: '', //redis端口号
  logConfig
};
