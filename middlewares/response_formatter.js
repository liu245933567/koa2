/**
 * 在app.use(router)之前调用
 */
var response_formatter = (ctx) => {
  //如果有返回数据，将返回数据添加到data中
  if (ctx.body) {
    ctx.body = {
      code: 0,
      message: 'success',
      data: ctx.body
    }
  } else {
    ctx.body = {
      code: 0,
      message: 'success'
    }
  }
}

var url_filter = function (pattern) {

  return async function (ctx, next) {
    var reg = new RegExp(pattern);
    //先去执行路由
    await next();
    //通过正则的url进行格式化处理
    if (reg.test(ctx.originalUrl)) {
      response_formatter(ctx);
    }
  }
}
module.exports = url_filter;
