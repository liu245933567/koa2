const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const db = require('../../mongoDB');

//获取动漫列表
exports.getCartoonList = async (ctx, next) => {
  const cartoonList = await db.find(`cartoon_list`, {});
  ctx.body = {
    cartoonList: cartoonList || []
  };
}

// 获取动漫详情
exports.getCartoonDetail = async (ctx) => {
  if (!ctx.request.body) throw new ApiError(ApiErrorNames.PARAM_MISS);
  const {
    collectionTag,
    sortType,
    pageIndex,
    pageSize
  } = ctx.request.body;
  if (!collectionTag || !(collectionTag !== 'woshidashenxian' || collectionTag !== 'congqianyouzuolingjianshan')) {
    throw new ApiError(ApiErrorNames.PARAM_ERROR);
  }

  const sectioList = await db.findFormPage(`cartoon_${collectionTag}_section_list`, {}, {
    pageIndex: pageIndex || 1,
    pageSize: pageSize || 20,
    sortType: sortType || 1,
    sortKey: 'sectionId',
  });
  ctx.body = {
    sectioList: sectioList ? sectioList.map(item => ({
      sectionId: item.sectionId,
      sectionTitle: item.sectionTitle
    })) : []
  };
}

// 获取章节详情
exports.getSectionDtail = async (ctx) => {
  ctx.response.body = {
    imageList: []
  };
}