const ApiError = require('../utils/ApiError');
const db = require('../models/mongoDB');

//获取动漫列表
exports.getCartoonList = async (ctx, next) => {
  const cartoonList = await db.find(`cartoon_list`, {});
  ctx.body = {
    cartoonList: cartoonList || []
  };
}

// 获取动漫详情
exports.getCartoonDetail = async (ctx) => {
  const {
    collectionTag,
    sortType,
    pageIndex,
    pageSize
  } = ctx.request.body;
  if (!collectionTag) throw new ApiError('PARAM_MISS');

  const queryCartoonListRes = await db.find('cartoon_list', {collectionTag});

  if(Object.prototype.toString.call(queryCartoonListRes) === '[object Array]' && queryCartoonListRes.length < 1) throw new ApiError('PARAM_ERROR');

  const sectioList = await db.findFormPage(
    `cartoon_${collectionTag}_section_list`,
    {},
    {
      pageIndex: pageIndex || 1,
      pageSize: pageSize || 20,
      sortType: sortType || 1,
      sortKey: 'sectionId',
    }
  );
  ctx.body = {
    cartoonInfo: queryCartoonListRes[0],
    sectioList: sectioList ? sectioList.map(item => ({
      sectionId: item.sectionId,
      sectionTitle: item.sectionTitle
    })) : []
  };
}

// 获取章节详情
exports.getSectionDetail = async (ctx) => {
  const {
    sectionId,
    collectionTag
  } = ctx.request.body;

  if (!collectionTag || !sectionId) throw new ApiError('PARAM_MISS');

  const sectionListRes = await db.find(`cartoon_${collectionTag}_section_list`, {sectionId});

  if(Object.prototype.toString.call(sectionListRes) === '[object Array]' && sectionListRes.length < 1) throw new ApiError('PARAM_ERROR');
  console.log('sectionListRes', sectionListRes);

  ctx.body = {
    sectionInfo: sectionListRes[0]
  };
}