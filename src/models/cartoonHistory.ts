import { Schema, model, Document } from 'mongoose';
import { ICartoonHistory } from '@typings/cartoon';

const SectionSchema = new Schema(
  {
    /** 详情地址 */
    detailHref: String,
    /** 动漫名字 */
    cartoonName: String,
    /** 封面链接 */
    coverPictureSrc: String,
    /** 最新章节 */
    latestChapter: String,
    /** 观看到的章节 */
    anchorSection: String,
    /** 观看到的章节路径 */
    anchorSectionHref: String,
    /** 观看过的章节列表 */
    watchedSections: Array,
    /** 手机号 */
    phoneNo: String
  },
  { versionKey: false }
);

export interface HistoryDocument extends Document, ICartoonHistory {
  /** 手机号 */
  phoneNo: string;
}

/** 章节 */
const cartoonHistoryModel = model<HistoryDocument>(
  'CartoonHistory',
  SectionSchema
);

export default cartoonHistoryModel;
