import logConfig from './log4js.config';

// 测试环境的配置内容
export default {
  env: 'test', //环境名称
  port: 3001, //服务端口号
  dbConfig: {
    host: '49.233.26.21:27017',
    username: 'admin',
    password: '123456',
    database: 'cartoon'
  },
  redisUrl: '', //redis地址
  redisPort: '', //redis端口号
  logConfig
};
