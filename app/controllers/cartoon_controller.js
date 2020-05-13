// const ApiError = require('../error/ApiError');
// const ApiErrorNames = require('../error/ApiErrorNames');
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
  const sectioList = await db.find(`cartoon_woshidashenxian_section_list`, {});
  ctx.body = {
    sectioList: sectioList || []
  };
}

// 获取章节详情
exports.getSectionDtail = async (ctx) => {
  ctx.response.body = {
    imageList: []
  };
}