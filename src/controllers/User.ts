import { Context } from 'koa';
import userModel from '@models/user';
import { sign } from '@middlewares/auth';
import {
  isMobile,
  // isEmail,
  // isYYYYMMDD,
  // isGender,
  checkPwd
} from '@utils/rexp';

// 用户登录
export const login = async (ctx: Context) => {
  let isOk = true;
  let message = '登录成功~';
  const { phoneNo, password } = ctx.request.body;

  if (!phoneNo || !password) {
    isOk = false;
    message = '请填写完整信息';
  }
  if (isOk) {
    const isVerifyed = await userModel.findOne({ phoneNo, password });

    if (!isVerifyed) {
      isOk = false;
      message = '请检查用户账号与密码是否匹配';
    } else {
      sign(ctx, { phoneNo, password });
    }
  }

  ctx.body = {
    isOk,
    message
  };
};

// 用户注册
export const register = async (ctx: Context) => {
  const {
    phoneNo,
    password
  } = ctx.request.body;
  let res = {
    isOk: true,
    message: '注册成功'
  };
  const isVerifyed =
    phoneNo &&
    isMobile(String(phoneNo)) &&
    password &&
    checkPwd(password);

  if (isVerifyed) {
     await userModel.create({
      phoneNo: phoneNo as number,
      password: password as string
    });
  } else {
    res = {
      isOk: false,
      message: '请查看填写信息是否正确'
    };
  }
  console.log(res);
  ctx.body = res;
};

// // 用户注册
// export const register = async (ctx: Context) => {
//   const {
//     phoneNo,
//     password,
//     email,
//     // nickname,
//     gender,
//     brithday
//   } = ctx.request.body;
//   let res = {
//     isOk: true,
//     message: '注册成功'
//   };
//   const isVerifyed =
//     phoneNo &&
//     isMobile(phoneNo) &&
//     password &&
//     checkPwd(password) &&
//     (!email || email && isEmail(email)) &&
//     (!gender || gender && isGender(gender)) &&
//     (!brithday || brithday && isYYYYMMDD(brithday));

//   if (isVerifyed) {
//     //  await userModel.create({
//     //   phoneNo,
//     //   password,
//     //   email: email || 'NULL',
//     //   nickname: nickname || phoneNo,
//     //   gender: gender || 'male',
//     //   brithday: brithday || '1991-12-24'
//     // });
//   } else {
//     res = {
//       isOk: false,
//       message: '请查看填写信息是否正确'
//     };
//   }
//   console.log(res);
//   ctx.body = res;
// };
