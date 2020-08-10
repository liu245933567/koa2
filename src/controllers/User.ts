import { Context } from 'koa';
import userModel, { UserDocument } from '@models/user';
import uploadFileModel from '@models/uploadFiles';
import { sign, getUserInfoFromCookie } from '@middlewares/auth';
import { apiError } from '@utils/ApiError';
// import { IUserResInfo } from '@typings/user';
import { autobind } from 'core-decorators';
import * as uuid from 'uuid';
import {
  formatDateToYYYYMMDD,
  formatDateToYYYYMMDDHHMMSS
} from '@utils/moment';
import * as fs from 'fs';
import { upToQiniu } from '@utils/uploader';
import { isMobile, checkPwd } from '@utils/rexp';

class User {
  /** 上传头像图片路径 */
  private readonly uploadImagePath = 'images/headPortraits/';

  /** 获取登陆状态 */
  @autobind
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

  /** 退出登录功能 */
  public async logOut(ctx: Context) {
    const cookieInfo = await getUserInfoFromCookie(ctx);

    if (!cookieInfo) {
      throw apiError('REQUIRE_LOGIN', '请先登录');
    }
    const { phoneNo, password } = cookieInfo;

    sign(ctx, { phoneNo, password }, true);
  }

  /** 登陆注册功能 */
  @autobind
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

  /** 修改用户信息 */
  public async modifyUserInfo(ctx: Context) {
    const cookieInfo = await getUserInfoFromCookie(ctx);

    if (!cookieInfo) {
      throw apiError('REQUIRE_LOGIN', '请先登录');
    }
    const { phoneNo } = cookieInfo;
    const { nickname, brithday, gender, motto } = ctx.request.body;

    if (!nickname) {
      throw apiError('PARAM_ERROR', '昵称不能为空');
    }
    const upResult = await userModel.update(
      { phoneNo },
      {
        nickname,
        gender,
        brithday,
        motto
      }
    );

    if (upResult) {
      ctx.body = {
        message: '修改成功'
      };
    } else {
      throw apiError('UNKNOW_ERROR', '修改失败');
    }
  }

  /** 上传图片至七牛云 */
  @autobind
  public async uploadFile2(ctx: Context) {
    const cookieInfo = await getUserInfoFromCookie(ctx);

    if (!cookieInfo) {
      throw apiError('REQUIRE_LOGIN', '请先登录');
    }
    const { phoneNo } = cookieInfo;
    /** 上传至本服务器的文件 */
    const file = ctx.request.files?.file;

    if (file) {
      /** 命名文件 */
      const fileName = uuid.v1();
      /** 文件可读流 */
      const reader = fs.createReadStream(file.path);
      /** 上传文件扩展名 */
      const ext = file.name.split('.').pop();
      /** 用户路径 */
      const userPath = `${phoneNo}/`;
      /** 命名文件以及拓展名 */
      const fileUrl = `${this.uploadImagePath}${userPath}${fileName}.${ext}`;
      /** 调用方法(封装在utils文件夹内) */
      const result = await upToQiniu(reader, fileUrl);

      // 上传结束后删除缓存图片
      await fs.promises.unlink(file.path);

      if (result) {
        await uploadFileModel.create({
          phoneNo,
          href: result.fileHref,
          type: 'headPortrait'
        });
        ctx.body = {
          message: '上传成功',
          result
        };
      } else {
        throw apiError('ERROR', '上传图片失败');
      }
    } else {
      throw apiError('PARAM_MISS', '请选择图片上传');
    }
  }

  /** 获取上传过的头像 */
  public async getHeadPortrait(ctx: Context) {
    const cookieInfo = await getUserInfoFromCookie(ctx);

    if (!cookieInfo) {
      throw apiError('REQUIRE_LOGIN', '请先登录');
    }
    const { phoneNo } = cookieInfo;
    const images = await uploadFileModel.find({
      phoneNo,
      type: 'headPortrait'
    });

    ctx.body = {
      result: images.map((item) => item.href)
    };
  }

  /** 格式化文档参数 */
  private formatInfo(userDoc: UserDocument) {
    const {
      brithday,
      createDate,
      lastLoginTime,
      email,
      gender,
      headPortrait,
      isVip,
      level,
      motto,
      nickname,
      phoneNo
    } = userDoc;

    return {
      email,
      gender,
      headPortrait,
      isVip,
      level,
      motto,
      nickname,
      phoneNo,
      // 格式化时间
      brithday: formatDateToYYYYMMDD(brithday),
      createDate: formatDateToYYYYMMDDHHMMSS(createDate),
      lastLoginTime: formatDateToYYYYMMDDHHMMSS(lastLoginTime)
    };
  }
}

export default new User();
