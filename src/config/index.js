import developmentEnv from './development';
import testEnv from './test';
import productionEnv from './production';

//根据不同的NODE_ENV，输出不同的配置对象，默认输出development的配置对象
export default {
  development: developmentEnv,
  production: productionEnv,
  test: testEnv
}[process.env.NODE_ENV || 'development'];
