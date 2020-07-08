import { Context } from 'koa';
import userModel from '@models/user';
import { sign } from '@middlewares/auth';
import { apiError } from '@utils/ApiError';
import {
  isMobile,
  // isEmail,
  // isYYYYMMDD,
  // isGender,
  checkPwd
} from '@utils/rexp';

class User {
  /** 登陆注册功能 */
  public async loginRegister(ctx: Context) {
    const { phoneNo, password } = ctx.request.body;

    if (!phoneNo || !password || isMobile(phoneNo) || checkPwd(password)) {
      throw apiError('PARAM_ERROR', '请检查输入信息是否正确');
    }
    const findResult = await userModel.findOne({ phoneNo });

    if (findResult) {
      if (findResult.password !== password) {
        throw apiError('PARAM_ERROR', '手机号和密码不匹配');
      } else {
        sign(ctx, { phoneNo, password });
        ctx.body = {
          message: '登录成功~',
          result: findResult
        };
      }
    } else {
      const creatResult = await userModel.create({
        phoneNo,
        password
      });

      if (!creatResult) {
        throw apiError('ERROR', '创建账户失败');
      } else {
        sign(ctx, { phoneNo, password });
        ctx.body = {
          message: '登录成功~',
          result: creatResult
        };
      }
    }
  }
}

export default new User();
