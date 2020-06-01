import * as log4js from 'log4js';
import {Context, Request} from 'koa';
import logConfig from '../config/log4js.config';

//加载配置文件
log4js.configure(logConfig);

//格式化请求日志
const formatReqLog = (req:Request, resTime:number) => {
  let logText = '';
  const method = req.method;
  //访问方法

  // logText += 'request method: ' + method + '\n';
  // //请求原始地址
  // logText += 'request originalUrl:  ' + req.originalUrl + '\n';
  // //客户端ip
  // logText += 'request client ip:  ' + req.ip + '\n';
  // //开始时间
  // // var startTime;
  // //请求参数
  // if (method === 'GET') {
  //   logText += 'request query:  ' + JSON.stringify(req.query) + '\n';
  //   // startTime = req.query.requestStartTime;
  // } else {
  //   logText += 'request body: ' + '\n' + JSON.stringify(req.body) + '\n';
  //   // startTime = req.body.requestStartTime;
  // }
  //服务器响应时间
  // logText += 'response time: ' + resTime + '\n';
  const requestText = method === 'GET' ?
    `request query:  ${JSON.stringify(req.query)}` :
    `request body: ${JSON.stringify(req.body)}`;

  logText = `request method: ${method}
  request originalUrl:  ${req.originalUrl}
  request client ip:  ${req.ip}
  ${requestText}
  response time: ${resTime}`;

  return logText;
};

//格式化响应日志
const formatRes = (ctx: Context, resTime: number) => `
*************** response log start ***************
  ${formatReqLog(ctx.request, resTime)}
  response status: ${ctx.status}
  response body: ${JSON.stringify(ctx.body)}
*************** response log end ***************`;

//格式化错误日志
const formatError = (ctx:Context, err: Error, resTime: number):string => `
*************** error log start ***************
  ${formatReqLog(ctx.request, resTime)}
  err name: ${err.name}
  err message: ${err.message}
  err stack: ${err.stack}
*************** error log end ***************
`;

//封装错误日志
function logResponse(ctx:Context, resTime:number) {
  if (ctx) {
    const resLogger = log4js.getLogger('resLogger');

    resLogger.info(formatRes(ctx, resTime));
  }
}
//封装响应日志
function logError(ctx:Context, error:Error, resTime: number) {
  if (ctx && error) {
    const errorLogger = log4js.getLogger('errorLogger');

    errorLogger.error(formatError(ctx, error, resTime));
  }
}
const othlogger = log4js.getLogger('resLogger');

const errlogger = log4js.getLogger('errorLogger');

// 普通日志
function logOrdinary(text:string) {
  const resLogger = log4js.getLogger('resLogger');

  resLogger.info(text);
}
// 普通错误日志
function logOrdinaryErrror(errText:string) {
  const errorLogger = log4js.getLogger('errorLogger');

  errorLogger.error(errText);
}
export {
  logResponse,
  logError,
  othlogger,
  errlogger,
  logOrdinary,
  logOrdinaryErrror
};
