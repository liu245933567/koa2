import { Context } from 'koa';
import Crawler from '../models/crawler';
import ApiError from '../utils/ApiError';

// 添加爬虫
export const addCrawler = async (ctx: Context) => {
  const { name, type, href } = ctx.request.body as {
    name: string;
    type: string;
    href: string;
  };

  if (!name || !type || !href) {
    throw new ApiError('PARAM_MISS');
  }
  const a = await Crawler.findOne({ $or: [{ name }, { href }] });

  if (a) {
    ctx.body = {
      isOk: false,
      message: '该爬虫已存在'
    };
  } else {
    const b = await Crawler.create({
      name,
      type,
      href
    });

    if (b) {
      ctx.body = {
        message: '添加成功',
        result: b
      };
    } else {
      ctx.body = {
        isOk: false,
        message: '添加失败'
      };
    }
  }
};

// 获取爬虫列表
export const getCrawlerList = async (ctx: Context) => {
  const crawlerList = await Crawler.find({});

  ctx.body = {
    crawlerList: crawlerList || []
  };
};
