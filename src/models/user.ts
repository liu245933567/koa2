import { Schema, model, Document } from 'mongoose';
// import { IUserInfo } from '@typings/user';

const UserSchema = new Schema({
  phoneNo: {
    type: String,
    required: true
  },
  motto: {
    type: String,
    default: null
  },
  password: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    default: 1
  },
  email: {
    type: String,
    default: null
  },
  nickname: {
    type: String,
    default: '秀儿~'
  },
  isVip: {
    type: Boolean,
    default: false
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male'
  },
  headPortrait: {
    type: String,
    default: null
  },
  brithday: {
    type: Date,
    default: new Date('1991/12/24')
  },
  createDate: {
    type: Date,
    default: new Date()
  },
  lastLoginTime: {
    type: Date,
    default: new Date()
  }
});

export interface UserDocument extends Document {
  /** 手机号 */
  phoneNo: string;
  /** 座右铭 */
  motto?: string | null;
  /** 会员等级 */
  level?: number;
  /** 是否是VIP */
  isVip?: boolean;
  /** 头像 */
  headPortrait?: string | null;
  // 密码
  password: string;
  // 邮箱
  email?: string | null;
  // 昵称
  nickname?: string | null;
  // 性别
  gender?: string;
  // 生日
  brithday?: Date;
  // 创建日期
  createDate?: Date;
  // 上次登录时间
  lastLoginTime?: Date;
}

/** 用户 */
const User = model<UserDocument>('User', UserSchema);

export default User;
