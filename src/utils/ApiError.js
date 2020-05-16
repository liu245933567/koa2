// const ApiErrorNames = require('./ApiErrorNames');

// /**
//  * API错误名称
//  */
// var ApiErrorNames = {};

// ApiErrorNames.UNKNOW_ERROR = "unknowError";
// ApiErrorNames.USER_NOT_EXIST = "userNotExist";
// ApiErrorNames.PARAM_MISS = "paramAerMissing";
// ApiErrorNames.PARAM_ERROR = "paramIsError";

// /**
//  * API错误名称对应的错误信息
//  */
// const error_map = new Map();

// error_map.set(ApiErrorNames.UNKNOW_ERROR, { code: -1, message: '未知错误' });
// error_map.set(ApiErrorNames.USER_NOT_EXIST, { code: 101, message: '用户不存在' });
// error_map.set(ApiErrorNames.PARAM_MISS, { code: 500, message: '参数缺失' });
// error_map.set(ApiErrorNames.PARAM_ERROR, { code: 500, message: '参数错误' });

// //根据错误名称获取错误信息
// ApiErrorNames.getErrorInfo = (error_name) => {

//   var error_info;

//   if (error_name) {
//     error_info = error_map.get(error_name);
//   }

//   //如果没有对应的错误信息，默认'未知错误'
//   if (!error_info) {
//     error_name = UNKNOW_ERROR;
//     error_info = error_map.get(error_name);
//   }
//   return error_info;
// }

/**
 * 自定义Api异常
 */
class ApiError extends Error {
  //构造方法
  constructor(errorName) {
    super();
    const errorMap = {
      'UNKNOW_ERROR': { code: -1, message: '未知错误' },
      'USER_NOT_EXIST': { code: 101, message: '用户不存在' },
      'PARAM_MISS': { code: 500, message: '参数缺失' },
      'PARAM_ERROR': { code: 500, message: '参数错误' }
    };
    const errorInfo = errorMap[errorName] || errorMap.UNKNOW_ERROR;

    this.name = errorName;
    this.code = errorInfo.code;
    this.message = errorInfo.message;
  }
}

module.exports = ApiError;
