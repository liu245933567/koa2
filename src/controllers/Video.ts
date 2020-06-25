import { Context } from 'koa';
// import * as fs from 'fs';
// import * as path from 'path';
import {mapDir} from '../utils/fsUtils';

// 获取视频列表
export const getVideoList = async (ctx: Context) => {
  const videoList = await mapDir('chinese');

  ctx.body = {
    videoList
  };
};
