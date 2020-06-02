import * as jwt from 'jsonwebtoken';
import { Context } from 'koa';

const SECRET = 'shared-secret';

export const sign = (ctx: Context, info: any) => {
  const token = jwt.sign(info, SECRET, { expiresIn: '1h' });

  ctx.set('Authorization', token);
  ctx.cookies.set('token', token, {
    domain: '.yanyuge.xyz', // 写cookie所在的域名
    path: '/', // 写cookie所在的路径
    maxAge: 1000 * 60 * 60 * 24, // cookie有效时长
    expires: new Date('2029-2-12'), // cookie失效时间
    httpOnly: true, // 是否只用于http请求中获取
    overwrite: true // 是否允许重写
  });
};

export const verify = (ctx: Context, decodedToken: object, token: string) => {

  console.log(ctx, decodedToken, token);
  // return ret;


  return new Promise((resolve:(value: boolean) => void) => {
    const re = true;

    setTimeout(() => {
      resolve(re);
    }, 1000);

    // resolve(re);
  });
};
