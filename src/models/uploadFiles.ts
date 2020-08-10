import { Schema, model, Document } from 'mongoose';

const UploadFileSchema = new Schema(
  {
    phoneNo: String,
    href: String,
    type: String
  },
  { versionKey: false }
);

export interface UploadFileDocument extends Document {
  /** 账户信息 */
  phoneNo: string;
  /** 文件地址 */
  href: string;
  /** 文件类型 */
  type: string;
}

/** 章节 */
const UploadFile = model<UploadFileDocument>('UploadFile', UploadFileSchema);

export default UploadFile;
