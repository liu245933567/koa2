import * as redis from 'redis';
// import config from '@config/index';

// 端口、IP、密码
const client = redis.createClient();

// client.auth(config.redis.auth_pass, (s) => {
//   console.log(s);
// });
// set 插入

// client.set('stringKey', 'stringValue');
// client.set('stringKey', 'stringValue', 'EX', 10); // 可设置过期时间（单位：秒）
// // get 获取
// client.get('stringKey', (err, value) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(value);
// });
// // del 删除
// client.del('stringKey');

/**
 * 存储 redis 数据
 * @param key 键名
 * @param value 键值
 * @param expire 过期时间
 */
export function redisSet(
  key: string,
  value: any,
  expire: number = 1 * 24 * 60 * 24
) {
  return new Promise((resolve) => {
    const resValue = typeof value === 'string' ? value : JSON.stringify(value);

    client.set(key, resValue, 'EX', expire, (err, reply) => {
      if (reply === 'OK') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

/**
 * 获取 redis 数据
 * @param key 键名
 */
export function redisGet(key: string): Promise<any | string | null> {
  return new Promise((resolve) => {
    client.get(key, (err, value) => {
      if (err) {
        resolve(null);
      } else {
        let resValue;

        if (value) {
          try {
            resValue = JSON.parse(value);
          } catch {
            resValue = value;
          }
        }
        resolve(resValue);
      }
    });
  });
}
