const developmentEnv = require('./development');
const testEnv = require('./test');
const productionEnv = require('./production');

//根据不同的NODE_ENV，输出不同的配置对象，默认输出development的配置对象
module.exports = {
  development: developmentEnv,
  production: productionEnv,
  test: testEnv
}[process.env.NODE_ENV || 'development'];
