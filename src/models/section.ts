import { Schema, model, Document } from 'mongoose';

const SectionSchema = new Schema({
  _id: {
    type: Number
  },
  cartoonId: {
    type: Number,
    index: true
  },
  sectionTitle: {
    type: String
  },
  imagesList: [{
    type: String
  }]
}, {versionKey: false});

export interface SectionDocument extends Document {
  // 章节 id
  _id: number;
  // 动漫 id
  cartoonId: number;
  // 章节标题
  sectionTitle: string;
  // 图片列表
  imagesList: string[];
}

/**
 * 章节
 */
const Section = model<SectionDocument>('Section', SectionSchema);

Section.findOne({}, (err:any, data) => {
  if (!data) {
    Section.create({
      _id: 1,
      cartoonId: 1,
      sectionTitle: '无',
      imagesList: ['http://localhost:8080/images/test.png']
    });
  }
});

export default Section;
