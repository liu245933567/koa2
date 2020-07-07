import * as redis from 'redis';
import config from '@config/index';

// 端口、IP、密码
const client = redis.createClient(config.redis);
// const client = redis.createClient({
//   host: '49.233.26.21',
//   port: 6379,
//   password: '199699'
// });

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
