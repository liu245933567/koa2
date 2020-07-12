import { Context } from 'koa';
import {
  searchCartoon,
  getHomePageInfo,
  getCartoonDetailInfo,
  getSectionDetailInfo,
  getCategoryPageInfo
} from '@crawlies/iimanhua';

/**
 * 动漫相关
 */
class Cartoon {
  /** 获取漫画首页信息 */
  public async getCartoonHomeInfo(ctx: Context) {
    const result = await getHomePageInfo();

    ctx.body = {
      result
    };
  }

  /** 动漫查询 */
  public async cartoonSearch(ctx: Context) {
    const { searchStr } = ctx.request.body;
    const { cartoonList } = await searchCartoon(searchStr);

    ctx.body = {
      result: cartoonList
    };
  }

  /** 标签查询 */
  public async cartoonCategoryInfo(ctx: Context) {
    const { type, category } = ctx.request.body;
    const result = await getCategoryPageInfo(
      type as 'CATEGORY' | 'LETTER',
      category
    );

    ctx.body = {
      result
    };
  }

  /** 获取动漫详情 */
  public async getCartoonDetail(ctx: Context) {
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
  }

  /**
   * 获取章节详情
   */
  public async getSectionDetail(ctx: Context) {
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
  }
}

export default new Cartoon();
