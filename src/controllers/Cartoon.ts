import { Context } from 'koa';
import { ICartoonHomeRes } from '@typings/cartoon';
import {
  searchCartoon,
  getHomePageInfo,
  getCartoonDetailInfo,
  getSectionDetailInfo,
  getCategoryPageInfo
} from '@crawlies/iimanhua';
import { apiError } from '@utils/ApiError';
import { redisGet, redisSet } from '@src/redisDB';
import cartoonModel from '@models/cartoon';
import sectionModel from '@models/section';
import { dateDiff } from '@utils/moment';

/**
 * 动漫相关
 */
class Cartoon {
  /** 获取漫画首页信息 */
  public async getCartoonHomeInfo(ctx: Context) {
    let homeInfo: ICartoonHomeRes | null = await redisGet('cartoon_home_info');

    if (!homeInfo) {
      homeInfo = await getHomePageInfo();
      if (homeInfo) {
        await redisSet('cartoon_home_info', homeInfo);
      }
    }

    ctx.body = {
      result: homeInfo
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
      const findResult = await cartoonModel.findOne({
        detailHref: cartoonPath
      });

      if (findResult) {
        const { upDataTime } = findResult;
        const diffNum = dateDiff(upDataTime, new Date());

        if (diffNum < 4) {
          ctx.body = {
            result: findResult
          };
        } else {
          const cartoonDetail = await getCartoonDetailInfo(cartoonPath);

          if (cartoonDetail) {
            await cartoonModel.update(
              { detailHref: cartoonPath },
              cartoonDetail
            );
          }
          ctx.body = {
            result: cartoonDetail
          };
        }
      } else {
        const cartoonDetail = await getCartoonDetailInfo(cartoonPath);

        if (cartoonDetail) {
          await cartoonModel.create(cartoonDetail);
        }

        ctx.body = {
          result: cartoonDetail
        };
      }
    } else {
      apiError('PARAM_ERROR');
    }
  }

  /**
   * 获取章节详情
   */
  public async getSectionDetail(ctx: Context) {
    const { sectionPath } = ctx.request.body;

    if (sectionPath) {
      const findResult = await sectionModel.findOne({
        sectionHref: sectionPath
      });

      if (findResult) {
        // 更新下一章地址
        if (!findResult.nextSectionHref) {
          const sectionDeatil = await getSectionDetailInfo(sectionPath);

          if (sectionDeatil) {
            await sectionModel.update(
              { sectionHref: sectionPath },
              sectionDeatil
            );
          }

          ctx.body = {
            result: sectionDeatil
          };
        } else {
          ctx.body = {
            result: findResult
          };
        }
      } else {
        const sectionDeatil = await getSectionDetailInfo(sectionPath);

        if (sectionDeatil) {
          await sectionModel.create(sectionDeatil);
        }

        ctx.body = {
          result: sectionDeatil
        };
      }
    } else {
      apiError('PARAM_ERROR');
    }
  }
}

export default new Cartoon();
