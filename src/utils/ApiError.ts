type ErrorName =
  | 'UNKNOW_ERROR'
  | 'USER_NOT_EXIST'
  | 'PARAM_MISS'
  | 'USER_NOT_EXIST'
  | 'PARAM_ERROR';

/**
 * 自定义Api异常
 */
export default class ApiError extends Error {
  code: number;
  //构造方法
  constructor(errorName: ErrorName) {
    super();
    const errorMap = {
      UNKNOW_ERROR: { code: -1, message: '未知错误' },
      USER_NOT_EXIST: { code: 101, message: '用户不存在' },
      PARAM_MISS: { code: 500, message: '参数缺失' },
      PARAM_ERROR: { code: 500, message: '参数错误' }
    };
    const errorInfo = errorMap[errorName] || errorMap.UNKNOW_ERROR;

    this.name = errorName;
    this.code = errorInfo.code;
    this.message = errorInfo.message;
  }
}
