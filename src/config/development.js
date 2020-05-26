import logConfig from './log4js.config';

// 开发环境的配置内容
export default {
  //环境名称
  env: 'development',
  //服务端口号
  port: 3000,
  // 数据库配置
  dbConfig: {
    host: '49.233.26.21:27017',
    username: 'admin',
    password: '123456',
    database: 'cartoon',
    useNewUrlParser: true, useUnifiedTopology: true
  },
  redisUrl: '', //redis地址
  redisPort: '', //redis端口号
  logConfig
};
