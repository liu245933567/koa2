import { Context } from 'koa';
import ApiError from '../utils/ApiError';
import cartoonModel from '../models/cartoon';

//获取动漫列表
export const getCartoonList = async (ctx: Context) => {
  const cartoonList = await cartoonModel.getCartoonList();

  ctx.body = {
    cartoonList
  };
};

// 获取动漫详情
export const getCartoonDetail = async (ctx:Context) => {
  const {
    cartoonId
  } = ctx.request.body;

  if (!cartoonId) {
    throw new ApiError('PARAM_MISS');
  }
  const cartoonDetail = await cartoonModel.getCartoonDetail({cartoonId});

  ctx.body = {
    cartoonDetail
  };
};

// 获取章节详情
export const getSectionDetail = async (ctx:Context) => {
  const {
    sectionId,
    cartoonId
  } = ctx.request.body;

  if (!cartoonId || !sectionId) {
    throw new ApiError('PARAM_MISS');
  }
  const sectionDetail = await cartoonModel.getSectionDetail({cartoonId, sectionId});

  ctx.body = {
    sectionDetail
  };
};
