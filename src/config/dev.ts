const devConf = {
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
  }
};

export default devConf;
