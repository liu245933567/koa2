import DB from '../DB';
// import { formatDateToYYYYMMDD } from '../../utils/moment';
type RegisterParam = {
  phoneNo: number;
  password: string;
  email: string;
  nickname: string;
  gender: string;
  headPortrait: string;
  brithday: string;
};
class UserModel extends DB {
  // 注册
  async register(params: RegisterParam) {
    const { phoneNo } = params;
    const isExists = await this.queryUserIsExists(phoneNo);

    if (!isExists) {
      await this.insertNewUser(params);
    } else {
      return {
        isOk: false,
        message: '用户已存在,请勿重复注册'
      };
    }
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
      headPortrait,
      brithday
    } = params;
    const sql = `INSERT INTO user VALUES (
      ${phoneNo},
      '${password}',
      '${email}',
      '${nickname}',
      '${gender}',
      '${headPortrait}',
      '${brithday}'
    );`;
    const data = await this.getConnection(sql);

    console.log(data);
    return data;
  }

  // 查看 cookie 中存的信息是否正确
  async isVerifyedToken(params: {
    phoneNo: number;
    password: string;
  }) {
    const {phoneNo, password} = params;
    const sql = `SELECT  COUNT(*) AS count FROM user WHERE  phoneNo=${phoneNo} AND password='${password}';`;
    const [{ count }] = await this.getConnection(sql);

    return count > 0;
  }
}

export default new UserModel();
