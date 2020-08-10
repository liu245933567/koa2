import * as jwt from 'jsonwebtoken';
import * as koaJwt from 'koa-jwt';
import { Context, Next } from 'koa';
import userModel from '@models/user';

const SECRET = 'shared-secret';

const isNoVerify = (url: string) => {
  const arr = ['loginRegister.json', 'homeInfo.json'];

  return arr.every((item) => url.indexOf(item) < 0);
};

/**
 * 标记登陆状态
 * @param ctx --
 * @param info 用户信息 手机号、密码
 * @param isOut 是否是登录
 */
export const sign = (
  ctx: Context,
  info: { phoneNo: string; password: string },
  isOut = false
) => {
  const token = jwt.sign(info, SECRET, { expiresIn: '2 days' });

  // ctx.set('Authorization', token);
  ctx.cookies.set('token', token, {
    domain: '.yanyuge.xyz', // 写cookie所在的域名
    path: '/', // 写cookie所在的路径
    maxAge: isOut ? 0 : 1000 * 60 * 60 * 24, // cookie有效时长
    expires: isOut ? new Date('2009-02-12') : new Date('2029-02-12'), // cookie失效时间
    httpOnly: true, // 是否只用于http请求中获取
    overwrite: true // 是否允许重写
  });
};

/** 从 cookie 中获取用户信息 */
export const getUserInfoFromCookie = (
  ctx: Context
): Promise<{ phoneNo: string; password: string } | null> => {
  const token = ctx.cookies.get('token');

  return new Promise((resolve) => {
    jwt.verify(token || '', SECRET, (err, decoded: any) => {
      if (err) {
        resolve(null);
      } else {
        resolve({
          phoneNo: decoded.phoneNo as string,
          password: decoded.password as string
        });
      }
    });
  });
};

/** 校验是否存在登陆状态 */
export const verify = async (ctx: Context, next: Next) => {
  if (isNoVerify(ctx.originalUrl)) {
    const token = ctx.cookies.get('token');
    let isVerifyed = true;

    if (token) {
      let phoneNo: string = '111',
        password: string = '111';

      jwt.verify(token, SECRET, (err, decoded: any) => {
        if (err) {
          isVerifyed = false;
        } else {
          phoneNo = decoded.phoneNo;
          password = decoded.password;
        }
      });
      if (isVerifyed) {
        const findResult = await userModel.findOne({ phoneNo, password });

        isVerifyed = Boolean(findResult);
      }
    } else {
      isVerifyed = false;
    }
    if (isVerifyed) {
      await next();
    } else {
      ctx.body = {
        isOk: false,
        code: 'REQUIER_LOGIN',
        message: '请先登录~'
      };
    }
  } else {
    await next();
  }
};

// 中间件对token进行验证
export const catchTokenVerify = async (ctx: Context, next: Next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: '请先登录~'
      };
    } else {
      throw err;
    }
  });
};

//路由权限控制 除了path里的路径不需要验证token 其他都要
export const koaJwtVerify = koaJwt({
  secret: SECRET
  // passthrough: true,
  // isRevoked: verify
}).unless({
  path: [/login.json$/, /^\/register/]
});

// export const verify = (ctx: Context, decodedToken: object, token: string) => {
//   console.log(ctx, decodedToken, token);
//   // return ret;
//   return new Promise((resolve:(value: boolean) => void) => {
//     const re = true;
//     setTimeout(() => {
//       resolve(re);
//     }, 1000);
//     // resolve(re);
//   });
// };
