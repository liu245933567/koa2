import { Context } from 'koa';
// import * as fs from 'fs';
// import * as path from 'path';
import { mapDir, findDirs } from '../utils/fsUtils';

/** 获取视频列表 */
export const getVideoList = async (ctx: Context) => {
  const { category } = ctx.request.body;
  const videoList = await mapDir(category || 'chinese');

  ctx.body = {
    videoList
  };
};

/** 获取视频种类 */
export const getCategories = async (ctx: Context) => {
  const categories = await findDirs();

  ctx.body = {
    categories: categories && categories.map(category => ({key: category, category})) || []
  };
};
