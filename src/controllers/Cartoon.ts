import { Context } from 'koa';
import {
  ICartoonHomeRes,
  CartoonDetail,
  SectionInfo,
  CartoonOtherRecommendInfo
} from '@typings/cartoon';
import {
  searchCartoon,
  getHomePageInfo,
  getCartoonDetailInfo,
  getSectionDetailInfo,
  getCategoryPageInfo
} from '@crawlies/iimanhua';
import { getUserInfoFromCookie } from '@middlewares/auth';
import { apiError } from '@utils/ApiError';
import { autobind } from 'core-decorators';
import { redisGet, redisSet } from '@src/redisDB';
import cartoonModel from '@models/cartoon';
import sectionModel from '@models/section';
import cartoonHistoryModel from '@models/cartoonHistory';
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

  /**
   * 设置当前观看的漫画信息
   * @param cartoonDetail 当前正在浏览的动漫详情信息
   */
  private async setCurrentCartoonInfo(
    ctx: Context,
    cartoonDetail: CartoonDetail
  ) {
    const cookieInfo = await getUserInfoFromCookie(ctx);

    if (cookieInfo) {
      const { phoneNo } = cookieInfo;
      const {
        detailHref,
        cartoonName,
        coverPictureSrc,
        latestChapter
      } = cartoonDetail;

      await redisSet(`current_cartoon_${phoneNo}`, {
        detailHref,
        cartoonName,
        coverPictureSrc,
        latestChapter
      });
    }
  }

  /** 获取历史记录 */
  public async getCartoonHistory(ctx: Context) {
    const cookieInfo = await getUserInfoFromCookie(ctx);

    if (cookieInfo) {
      const curCartoonHistory = await cartoonHistoryModel.find(
        {
          phoneNo: cookieInfo.phoneNo
        },
        { phoneNo: 0, _id: 0 }
      );

      ctx.body = {
        result: curCartoonHistory
      };
    } else {
      apiError('REQUIRE_LOGIN');
    }
  }

  /** 设置动漫浏览历史记录 */
  private async setCartoonHistory(ctx: Context, sectionDeatil: SectionInfo) {
    const cookieInfo = await getUserInfoFromCookie(ctx);

    if (cookieInfo) {
      const currentCartoonInfo: CartoonOtherRecommendInfo | null = await redisGet(
        `current_cartoon_${cookieInfo.phoneNo}`
      );

      if (currentCartoonInfo) {
        const {
          detailHref,
          cartoonName,
          coverPictureSrc,
          latestChapter
        } = currentCartoonInfo;
        const { sectionHref, sectionTitle, sectionId } = sectionDeatil;
        const curCartoonHistory = await cartoonHistoryModel.findOne({
          detailHref,
          phoneNo: cookieInfo.phoneNo
        });

        if (!curCartoonHistory) {
          await cartoonHistoryModel.create({
            detailHref,
            cartoonName,
            coverPictureSrc,
            latestChapter,
            anchorSection: sectionTitle,
            anchorSectionHref: sectionHref,
            watchedSections: [
              { sectionTitle, sectionHref, sectionId, isWatched: true }
            ],
            phoneNo: cookieInfo.phoneNo
          });
        } else {
          const curSectionHistorys = curCartoonHistory.watchedSections;
          const findHistoryResult = curSectionHistorys.find(
            (item) => item.sectionId === sectionId
          );

          if (!findHistoryResult) {
            await cartoonHistoryModel.update(
              {
                detailHref,
                phoneNo: cookieInfo.phoneNo
              },
              {
                detailHref,
                cartoonName,
                coverPictureSrc,
                latestChapter,
                anchorSection: sectionTitle,
                anchorSectionHref: sectionHref,
                watchedSections: [
                  ...curSectionHistorys,
                  { sectionTitle, sectionHref, sectionId, isWatched: true }
                ]
              }
            );
          }
        }
      }
    }
  }

  /** 获取动漫详情 */
  @autobind
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
          await this.setCurrentCartoonInfo(ctx, findResult);
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
            await this.setCurrentCartoonInfo(ctx, cartoonDetail);
          }
          ctx.body = {
            result: cartoonDetail
          };
        }
      } else {
        const cartoonDetail = await getCartoonDetailInfo(cartoonPath);

        if (cartoonDetail) {
          await cartoonModel.create(cartoonDetail);
          await this.setCurrentCartoonInfo(ctx, cartoonDetail);
        }

        ctx.body = {
          result: cartoonDetail
        };
      }
    } else {
      apiError('PARAM_ERROR');
    }
  }

  /** 获取章节详情 */
  @autobind
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
            await this.setCartoonHistory(ctx, sectionDeatil);
          }

          ctx.body = {
            result: sectionDeatil
          };
        } else {
          await this.setCartoonHistory(ctx, findResult);
          ctx.body = {
            result: findResult
          };
        }
      } else {
        const sectionDeatil = await getSectionDetailInfo(sectionPath);

        if (sectionDeatil) {
          await sectionModel.create(sectionDeatil);
          await this.setCartoonHistory(ctx, sectionDeatil);
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
