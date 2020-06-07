import { Context } from 'koa';
import ApiError from '../utils/ApiError';
import Cartoon from '../models/cartoon';
import { SectionDocument } from '../models/section';
import Section from '../models/section';

//获取动漫列表
export const getCartoonList = async (ctx: Context) => {
  const cartoonList = await Cartoon.find(
    {},
    { _id: 1, cartoonName: 1, description: 1, coverImage: 1 }
  );

  ctx.body = {
    cartoonList: (cartoonList || []).map((item) => ({
      cartoonId: item._id,
      cartoonName: item.cartoonName,
      description: item.description,
      coverImage: item.coverImage
    }))
  };
};

// 获取动漫详情
export const getCartoonDetail = async (ctx: Context) => {
  const { cartoonId } = ctx.request.body;

  if (!cartoonId) {
    throw new ApiError('PARAM_MISS');
  }
  const cartoonDetail = await Cartoon.findOne({ _id: cartoonId }).populate(
    'sections',
    {
      _id: 1,
      cartoonId: 1,
      sectionTitle: 1
    }
  );

  if (cartoonDetail) {
    const {
      cartoonName,
      updataTime,
      coverImage,
      description,
      sections
    } = cartoonDetail;
    const sectionList = sections as Array<SectionDocument>;

    ctx.body = {
      cartoonInfo: {
        cartoonName,
        updataTime,
        coverImage,
        description
      },
      sectionList: sectionList.map((item) => ({
        sectionId: item._id,
        cartoonId: item.cartoonId,
        sectionTitle: item.sectionTitle
      }))
    };
  } else {
    ctx.body = {
      isOk: false,
      message: '获取动漫详情失败'
    };
  }
};

// 获取章节详情
// TODO: 获取上一章、下一张、返回是否有上一章下一章的参数
export const getSectionDetail = async (ctx: Context) => {
  const { sectionId, cartoonId } = ctx.request.body;

  if (!cartoonId || !sectionId) {
    throw new ApiError('PARAM_MISS');
  }
  const sectionInfo = await Section.findOne(
    { _id: sectionId, cartoonId },
    { sectionTitle: 1, imagesList: 1 }
  );

  if (sectionInfo) {
    const { sectionTitle, imagesList } = sectionInfo;

    ctx.body = {
      sectionInfo: {
        sectionTitle,
        sectionId,
        cartoonId,
        imagesList
      }
    };
  } else {
    ctx.body = {
      isOk: false,
      message: '获取章节详情失败'
    };
  }
};
