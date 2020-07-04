import { Context } from 'koa';
// import ApiError from '../utils/ApiError';
import Cartoon from '@models/cartoon';
// import { SectionDocument } from '../models/section';
// import Section from '../models/section';
import {
  searchCartoon,
  getHomePageInfo,
  getCartoonDetailInfo,
  getSectionDetailInfo,
  getCategoryPageInfo
} from '@crawlies/iimanhua';

/** 获取漫画首页信息 */
export const getCartoonHomeInfo = async (ctx: Context) => {
  const homeInfo = await getHomePageInfo();

  ctx.body = {
    result: homeInfo
  };
};

/** 获取动漫列表 */
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

/** 动漫查询 */
export const cartoonSearch = async (ctx: Context) => {
  const { searchStr } = ctx.request.body;
  const { cartoonList } = await searchCartoon(searchStr);

  ctx.body = {
    result: cartoonList
  };
};

/** 标签查询 */
export const cartoonCategoryInfo = async (ctx: Context) => {
  const { type, category } = ctx.request.body;
  const result = await getCategoryPageInfo(
    type as 'CATEGORY' | 'LETTER',
    category
  );

  ctx.body = {
    result
  };
};

/** 获取动漫详情 */
export const getCartoonDetail = async (ctx: Context) => {
  const { cartoonPath } = ctx.request.body;

  if (cartoonPath) {
    const cartoonDetail = await getCartoonDetailInfo(cartoonPath);

    ctx.body = {
      result: cartoonDetail
    };
  } else {
    ctx.body = {
      isOk: false,
      message: '参数不对'
    };
  }
};

/**
 * 获取章节详情
 */
export const getSectionDetail = async (ctx: Context) => {
  const { sectionPath } = ctx.request.body;

  if (sectionPath) {
    const sectionDeatil = await getSectionDetailInfo(sectionPath);

    ctx.body = {
      result: sectionDeatil
    };
  } else {
    ctx.body = {
      isOk: false,
      message: '参数不对'
    };
  }
};
