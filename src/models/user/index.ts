import DB from '../DB';
// import { formatDateToYYYYMMDD } from '../../utils/moment';
//TODO: 优化抛错流程
type RegisterParam = {
  phoneNo: number;
  password: string;
  email: string;
  nickname: string;
  gender: string;
  brithday: string;
};
class UserModel extends DB {
  // 注册
  async register(params: RegisterParam) {
    const { phoneNo } = params;
    const isExists = await this.queryUserIsExists(phoneNo);

    if (!isExists) {
      const data = await this.insertNewUser(params);

      return data ? { isOk: true, message: '注册成功~' } : { isOk: false, message: '注册失败' };
    }
    return {
      isOk: false,
      message: '用户已存在,请勿重复注册'
    };
  }

  // 查询手机号是否被注册
  async queryUserIsExists(phoneNo: number) {
    const sql = `SELECT  COUNT(*) AS count FROM user WHERE  phoneNo=${phoneNo};`;
    const [{ count }] = await this.getConnection(sql);

    return count > 0;
  }

  // 存入新用户信息
  async insertNewUser(params: RegisterParam) {
    const {
      phoneNo,
      password,
      email,
      nickname,
      gender,
      brithday
    } = params;
    const sql = `INSERT INTO user VALUES (
      ${phoneNo},
      '${password}',
      ${email === 'NULL' ? 'NULL' : '\'' + email + '\''},
      '${nickname}',
      '${gender}',
      NULL,
      '${brithday}'
    );`;
    const data = await this.getConnection(sql);

    console.log(data);
    return data;
  }

  // 查看 cookie 中存的信息是否正确
  async isVerifyedToken(params: { phoneNo: number; password: string }) {
    const { phoneNo, password } = params;
    const sql = `SELECT  COUNT(*) AS count FROM user WHERE  phoneNo=${phoneNo} AND password='${password}';`;
    const [{ count }] = await this.getConnection(sql);

    return count > 0;
  }
}

export default new UserModel();
