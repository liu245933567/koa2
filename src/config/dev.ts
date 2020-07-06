import { Base } from '@typings/config';

const devConf: Base = {
  env: 'development',
  port: 3000,
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'liu199699',
    database: 'runoob'
  },
  mongoDB: {
    host: '49.233.26.21:27017',
    username: 'admin',
    password: '123456',
    database: 'cartoon',
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  redis: {
    host: '127.0.0.1',
    port: 6397,
    auth_pass: '199699'
  },
  staticPath: 'F:special'
};

export default devConf;
