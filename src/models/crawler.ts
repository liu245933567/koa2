import { Schema, model, Document } from 'mongoose';

const CrawlerSchema = new Schema({
  name: {
    type: String
  },
  type: {
    type: String,
    enum: ['cartoon']
  },
  href: {
    type: String
  }
}, {versionKey: false});

export interface CrawlerDocument extends Document {
  // 爬虫名称
  name: string;
  // 爬虫类型
  type: string;
  // 爬虫地址
  href: string;
}

/**
 * 动漫列表
 */
const Crawler = model<CrawlerDocument>('Crawler', CrawlerSchema);

// Crawler.findOne({}, (err, data) => {
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

export default Crawler;
