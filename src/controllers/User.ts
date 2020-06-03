import { Context } from 'koa';
import * as jwt from 'jsonwebtoken';
const SECRET = 'shared-secret';
// 用户登录

export const login = async (ctx: Context) => {
  const user = {
    phoneNo: 17862514397,
    password: '199699'
  };

  const token = jwt.sign(user, SECRET, { expiresIn: '1h' });

  ctx.cookies.set('token', token, {
    domain: '.yanyuge.xyz', // 写cookie所在的域名
    path: '/', // 写cookie所在的路径
    maxAge: 1000 * 60 * 60 * 24, // cookie有效时长
    expires: new Date('2029-2-12'), // cookie失效时间
    httpOnly: true, // 是否只用于http请求中获取
    overwrite: true // 是否允许重写
  });
  ctx.body = {
    token
  };
};
