import {logError, logResponse} from '../utils/log';
import {Context, Next} from 'koa';

export default async (ctx:Context, next:Next) => {
  //响应开始时间
  const start = new Date().getTime();
  //响应间隔时间
  let ms:number;

  try {
    //开始进入到下一个中间件
    await next();
    ms = new Date().getTime() - start;
    //记录响应日志
    logResponse(ctx, ms);
  } catch (error) {
    ms = new Date().getTime() - start;
    //记录异常日志
    logError(ctx, error, ms);
  }
};
