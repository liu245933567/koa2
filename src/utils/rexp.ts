// 手机号码
export const isMobile = (s: string) => /^1[0-9]{10}$/.test(s);

// 邮箱
export const isEmail = (s: string) =>
  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);

// 日期格式是否为 YYYY-MM-DD
export const isYYYYMMDD = (s: string) =>
  /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/.test(s);

// 性别是否符合
export const isGender = (s: string) => s === 'male' || s === 'female';

// 校验密码强度
export const checkPwd = (str: string) => {
  let Lv = 0;

  if (str.length >= 6) {
    return Lv++;
  }
  if (/[0-9]/.test(str)) {
    Lv++;
  }
  if (/[a-z]/.test(str)) {
    Lv++;
  }
  if (/[A-Z]/.test(str)) {
    Lv++;
  }
  if (/[\.|-|_]/.test(str)) {
    Lv++;
  }
  return Lv > 3;
};
