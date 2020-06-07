import { Schema, model, Document } from 'mongoose';

const UserSchema = new Schema({
  _id: {
    type: Number
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  nickname: {
    type: String
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male'
  },
  headPortrait: {
    type: String
  },
  brithday: {
    type: Date,
    default: Date.now
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  lastLoginTime: {
    type: Date,
    default: Date.now
  }
});

export interface UserDocument extends Document {
  // 用户 id 即用户手机号
  _id: number;
  // 密码
  password: string;
  // 邮箱
  email: string;
  // 昵称
  nickname: string;
  // 性别
  gender: string;
  // 头像地址
  headPortrait: string;
  // 生日
  brithday: Date;
  // 创建日期
  createDate: Date;
  // 上次登录时间
  lastLoginTime: Date;
}

/**
 * 用户
 */
const User = model<UserDocument>('User', UserSchema);

export default User;
