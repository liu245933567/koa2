import { Schema, model, Document } from 'mongoose';

const CartoonSchema = new Schema({
  _id: {
    type: Number
  },
  description: {
    type: String
  },
  cartoonName: {
    type: String
  },
  updataTime: {
    type: Date
  },
  coverImage: {
    type: String
  },
  sections: [
    {
      type: Number,
      ref: 'Section'
    }
  ]
}, {versionKey: false});

export interface CartoonDocument extends Document {
  // 动漫 id
  _id: number;
  // 动漫简介
  description: string;
  // 动漫名称
  cartoonName: string;
  // 最近更新日期
  updataTime: Date;
  // 动漫头像
  coverImage: string;
  // 动漫章节列表
  sections: number[];
}

/**
 * 动漫列表
 */
const Cartoon = model<CartoonDocument>('Cartoon', CartoonSchema);

Cartoon.findOne({}, (err, data) => {
  if (!data) {
    Cartoon.create({
      _id: 1,
      description: '无',
      cartoonName: '无',
      updataTime: new Date(),
      coverImage: '无',
      // 动漫章节列表
      sections: [1]
    });
  }
});

export default Cartoon;
