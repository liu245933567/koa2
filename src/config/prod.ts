import { Base } from '@typings/config';

const prodConf: Base = {
  env: 'production',
  port: 3000,
  mysql: {
    host: '49.233.26.21',
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
    host: '49.233.26.21',
    port: 6379,
    password: '199699'
  },
  staticPath: 'F:special'
};

export default prodConf;
