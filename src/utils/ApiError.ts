type ErrorNames =
  | 'ERROR'
  | 'UNKNOW_ERROR'
  | 'PARAM_ERROR'
  | 'PARAM_MISS'
  | 'REQUIRE_LOGIN';

/** 错误类型 */
enum ErrorType {
  /** 其他错误 */
  ERROR = 'ERROR',
  /** 未知错误 */
  UNKNOW_ERROR = 'UNKNOW_ERROR',
  /** 参数错误 */
  PARAM_ERROR = 'PARAM_ERROR',
  /** 参数缺失 */
  PARAM_MISS = 'PARAM_MISS',
  /** 缺少登陆状态 */
  REQUIRE_LOGIN = 'REQUIRE_LOGIN',
}

/**
 * 自定义Api异常
 */
export default class ApiError extends Error {
  code: string;
  /**
   * 构造方法
   * @param name 错误名称
   * @param message 错误信息
   */
  constructor(name: ErrorNames = ErrorType.UNKNOW_ERROR, message?: string) {
    super();
    // const errorMap = {
    //   UNKNOW_ERROR: { code: -1, message: ErrorType.UNKNOW_ERROR },
    //   USER_NOT_EXIST: { code: 101, message: '用户不存在' },
    //   PARAM_MISS: { code: 500, message: '参数缺失' },
    //   PARAM_ERROR: { code: 500, message: '参数错误' }
    // };
    // const errorInfo = errorMap[name] || errorMap.UNKNOW_ERROR;

    this.name = name;
    this.code = name;
    this.message = message || ErrorType[name];
  }
}

/**
 * 生成错误信息
 * @param name 错误名称
 * @param message 错误信息
 */
function apiError(name: ErrorNames = ErrorType.UNKNOW_ERROR, message?: string) {
  return new ApiError(name, message);
}

export { apiError };
