/*
 * @Author: LiuYh
 * @Description: 动漫详情集合
 * @Date: 2020-07-07 15:13:13
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-07 15:20:18
 */

import { Schema, model, Document } from 'mongoose';
// import { SectionDocument } from './section';
import { CartoonDetail } from '@typings/cartoon';

const CartoonSchema = new Schema(
  {
    /** 详情地址 */
    detailHref: String,
    /** 动漫名字 */
    cartoonName: String,
    /** 漫画作者 */
    cartoonAuthor: String,
    /** 漫画分类 */
    cartoonCategory: String,
    /** 封面链接 */
    coverPictureSrc: String,
    /** 最新章节 */
    latestChapter: String,
    /** 更新时间 */
    upDataTime: String,
    /** 动漫简介 */
    introduction: String,
    /** 字母索引 */
    alphabetIndex: String,
    /** 人气 */
    popularity: String,
    /** 关键词 */
    keyWords: String,
    /** 当前连载状态状态 */
    state: String,
    /** 别名 */
    alias: String,
    /** 相关推荐 */
    recommendList: Array,
    /** 章节列表 */
    sectionList: Array
  },
  { versionKey: false }
);

export interface CartoonDocument extends Document, CartoonDetail {}

/**
 * 动漫列表
 */
const Cartoon = model<CartoonDocument>('Cartoon', CartoonSchema);

// Cartoon.findOne({}, (err, data) => {
//   if (!data) {
//     Cartoon.create({
//       _id: 1,
//       description: '无',
//       cartoonName: '无',
//       updataTime: new Date(),
//       coverImage: '无',
//       sections: [1]
//     });
//   }
// });

export default Cartoon;
