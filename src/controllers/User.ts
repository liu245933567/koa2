import { Context } from 'koa';
import userModel, { UserDocument } from '@models/user';
import { sign, getUserInfoFromCookie } from '@middlewares/auth';
import { apiError } from '@utils/ApiError';
import { IUserResInfo } from '@typings/user';
import {
  formatDateToYYYYMMDD,
  formatDateToYYYYMMDDHHMMSS
} from '@utils/moment';
import {
  isMobile,
  // isEmail,
  // isYYYYMMDD,
  // isGender,
  checkPwd
} from '@utils/rexp';

class User {
  /** 格式化文档参数 */
  private formatInfo(userDoc: UserDocument) {
    // 删除不必要参数
    delete userDoc.password;
    delete userDoc.__v;
    delete userDoc._id;

    const { brithday, createDate, lastLoginTime } = userDoc;

    return {
      ...userDoc,
      // 格式化时间
      brithday: formatDateToYYYYMMDD(brithday),
      createDate: formatDateToYYYYMMDDHHMMSS(createDate),
      lastLoginTime: formatDateToYYYYMMDDHHMMSS(lastLoginTime)
    };
  }

  /** 获取登陆状态 */
  public async loginStatus(ctx: Context) {
    const cookieInfo = await getUserInfoFromCookie(ctx);
    let result = null;

    if (cookieInfo) {
      const findResult = await userModel.findOne(cookieInfo);

      if (findResult) {
        result = this.formatInfo(findResult);
      }
    }
    ctx.body = {
      isOk: Boolean(result),
      message: result ? '登录成功' : '该用户未登录',
      result
    };
  }

  /** 登陆注册功能 */
  public async loginRegister(ctx: Context) {
    const { phoneNo, password } = ctx.request.body;

    if (!phoneNo || !password || !isMobile(phoneNo) || !checkPwd(password)) {
      throw apiError('PARAM_ERROR', '请检查输入信息是否正确');
    }
    let findResult = await userModel.findOne({ phoneNo });

    if (findResult) {
      if (findResult.password !== password) {
        throw apiError('PARAM_ERROR', '手机号和密码不匹配');
      }
    } else {
      findResult = await userModel.create({
        phoneNo,
        password
      });

      if (!findResult) {
        throw apiError('ERROR', '创建账户失败');
      }
    }
    // 更新上次登陆时间
    await userModel.updateOne(
      { phoneNo, password },
      { lastLoginTime: new Date() }
    );

    sign(ctx, { phoneNo, password });
    ctx.body = {
      message: '登陆成功',
      result: this.formatInfo(findResult)
    };
  }
}

export default new User();
