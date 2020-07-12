import { Schema, model, Document } from 'mongoose';
import { SectionInfo } from '@typings/cartoon';

const SectionSchema = new Schema(
  {
    /** 章节路径 */
    sectionHref: String,
    /** 章节标题 */
    sectionTitle: String,
    /** 章节 id */
    sectionId: Number,
    /** 是否观看过 */
    isWatched: Boolean,
    /** 章节图片 */
    sectionImages: Array,
    /** 下一章地址 */
    nextSectionHref: String
  },
  { versionKey: false }
);

export interface SectionDocument extends Document, SectionInfo {}

/** 章节 */
const Section = model<SectionDocument>('Section', SectionSchema);

export default Section;
