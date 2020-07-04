/*
 * @Author: LiuYh
 * @Description: iimanhua 网址的dom解析方法
 * @Date: 2020-07-04 19:26:16
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-04 20:21:18
 */

import { clearElText, IImanhuaImageHOST } from './utils';
import {
  CartoonBaseInfo,
  CartoonOtherRecommendInfo,
  IPageNav,
  SectionBaseInfo,
  ICartoonCategory,
  CartoonRecommendInfo,
  OtherRecommend
} from '@typings/cartoon';

/**
 * 获取动漫类型列表 - 首页、种类页
 * @param $ dom 解析实例
 * @param selectStr 选择字符
 */
export function resolveCategorys($: CheerioStatic, selectStr: string) {
  /** 种类列表 */
  let categorys: ICartoonCategory[] = [];

  $(selectStr).each((i, v) => {
    /** 种类名称 */
    const category = $(v)
      .find('a')
      .text();
    /** 种类code */
    const categoryKey = $(v)
      .find('a')
      .attr('href') as string;

    if (i !== 0 && categoryKey && categoryKey) {
      categorys.push({
        category,
        categoryKey
      });
    }
  });
  return categorys;
}

/**
 * 获取顶部推荐漫画 - 首页
 * @param $ dom 解析实例
 * @param type 推荐类型 热门还是最新
 */
export function getRecommendCartoon(
  $: CheerioStatic,
  type: 'coverBoxList2' | 'coverBoxList3'
) {
  let resultArr: CartoonRecommendInfo[] = [];

  $(`.${type} .coverMhList .scroll li`).each((i, v) => {
    const $cover = $(v).find('a.pic');
    const detailHref = $($cover).attr('href') || '';
    const coverPictureSrc =
      $($cover)
        .children('img')
        .attr('src') || '';
    const $coverInfoChildren = $(v)
      .find('p.coverInfo')
      .children();
    const cartoonName = $coverInfoChildren.eq(0).text();
    const cartoonAuthor = clearElText($coverInfoChildren.eq(1));
    const cartoonCategory = clearElText($coverInfoChildren.eq(2));
    const latestChapter = clearElText($coverInfoChildren.eq(3));
    const upDataTime =
      $coverInfoChildren.eq(4) &&
        $coverInfoChildren
          .eq(4)
          .find('font')
          .text() ||
      '';

    resultArr.push({
      detailHref,
      coverPictureSrc,
      cartoonName,
      cartoonAuthor,
      cartoonCategory,
      latestChapter,
      upDataTime
    });
  });
  return resultArr;
}

/**
 * 获取其他推荐信息 - 首页下方的一片
 * @param $ dom 解析实例
 */
export function resolveOtherRecommendList($: CheerioStatic) {
  /** 其他推荐列表 */
  let otherRecommendList: OtherRecommend[] = [];

  $('.floorList').each((i, v) => {
    let curInfo: OtherRecommend = {
      recommend: {
        title: '',
        recommendList: []
      },
      rank: {
        title: '',
        rankList: []
      }
    };
    const $floorLeft = $(v).children('div.floorLeft');

    curInfo.recommend.title = $floorLeft.find('h4 a').text() || '';
    $floorLeft.find('ul li').each((ri, rv) => {
      const coverPictureSrc =
        $(rv)
          .find('a.pic img')
          .attr('src') || '';
      const detailHref =
        $(rv)
          .find('a.pic')
          .attr('href') || '';
      const latestChapter =
        $(rv)
          .find('.cover span')
          .text() || '';
      const cartoonName =
        $(rv)
          .children('a')
          .text() || '';

      curInfo.recommend.recommendList.push({
        coverPictureSrc,
        detailHref,
        latestChapter,
        cartoonName
      });
    });

    const $floorRight = $(v).children('div.floorRight');

    curInfo.rank.title = $floorRight.find('h4').text() || '';
    $floorRight.find('ul li').each((ri, rv) => {
      let cartoonName = '';
      let detailHref = '';

      if (ri === 0) {
        cartoonName =
          $(rv)
            .find('.cover span')
            .clone()
            .children()
            .remove()
            .end()
            .text() || '';
        detailHref =
          $(rv)
            .find('.cover .pic')
            .attr('href') || '';
      } else {
        cartoonName =
          $(rv)
            .children('a')
            .text() || '';
        detailHref =
          $(rv)
            .children('a')
            .attr('href') || '';
      }

      curInfo.rank.rankList.push({
        detailHref,
        cartoonName
      });
    });

    otherRecommendList.push(curInfo);
  });
  return otherRecommendList;
}

/**
 * 获取排行信息 - 种类详情页
 * @param $ dom 解析实例
 * @param selectStr 选择字符
 */
export function getRankInfo($: CheerioStatic, selectStr: string) {
  let result: CartoonBaseInfo[] = [];

  $(selectStr).each((i, v) => {
    const cur = $(v).find('a');
    /** 详情地址 */
    const detailHref = cur.attr('href') as string;
    /** 动漫名字 */
    const cartoonName = cur.text();

    result.push({
      detailHref,
      cartoonName
    });
  });
  return result;
}

/**
 * 获取推荐列表信息 - 种类详情页
 * @param $ dom 解析实例
 * @param selectStr 选择字符
 */
export function getRecommendInfos($: CheerioStatic, selectStr: string) {
  let recommends: CartoonOtherRecommendInfo[] = [];

  $(selectStr)
    .eq(0)
    .find('li')
    .each((i, v) => {
      const cur = $(v);
      /** 封面链接 */
      const coverPictureSrc = cur.find('img').attr('src') || '';
      /** 最新章节 */
      const latestChapter = cur.find('span a').text();
      /** 详情地址 */
      const detailHref = cur.find('a').attr('href') || '';
      /** 动漫名字 */
      const cartoonName = cur.children('a').text();

      recommends.push({
        coverPictureSrc,
        latestChapter,
        detailHref,
        cartoonName
      });
    });
  return recommends;
}

/**
 * 获取动漫列表 - 种类详情页、字母索引详情页
 * @param $ dom 解析实例
 * @param selectStr 选择字符
 */
export function getCartoonListInfos($: CheerioStatic, selectStr: string) {
  /** 动漫列表 */
  let cartoonList: CartoonOtherRecommendInfo[] = [];

  $(selectStr).each((i, v) => {
    const cur = $(v);
    /** 封面链接 */
    const coverPictureSrc = cur.find('p.cover a img').attr('_src') || '';
    /** 最新章节 */
    const latestChapter = cur.find('p.cover span a').text();
    /** 详情地址 */
    const detailHref = cur.find('a').attr('href') || '';
    /** 动漫名字 */
    const cartoonName = cur
      .children('dl')
      .find('dt a')
      .text();

    cartoonList.push({
      coverPictureSrc,
      latestChapter,
      detailHref,
      cartoonName
    });
  });
  return cartoonList;
}

/**
 * 获取页码信息 - 种类详情页、字母索引详情页
 * @param $ dom 解析实例
 * @param selectStr 选择字符
 */
export function getPageListInfos($: CheerioStatic, selectStr: string) {
  /** 页码列表 */
  let pageList: IPageNav[] = [];

  $(selectStr).each((i, v) => {
    const cur = $(v);
    /** 页码名称 */
    const page = cur.text();
    /** 页码地址 */
    const pageHref = cur.attr('href') || '';

    pageList.push({
      page,
      pageHref
    });
  });
  return pageList;
}

/**
 * 获取动漫详情信息
 * @param $ dom 解析实例
 */
export function resolveCartoonDetail($: CheerioStatic) {
  /** 封面链接 */
  const coverPictureSrc = $('.info_cover img').attr('src') || '';
  /** 动漫名字 */
  const cartoonName = $('.titleInfo h1').text();
  /** 当前连载状态状态 */
  const state = $('.titleInfo span').text();
  const $infoUl = $('.detailInfo ul li');
  /** 更新时间 */
  const upDataTime = $infoUl
    .eq(0)
    .find('font')
    .text();
  /** 漫画作者 */
  const cartoonAuthor = clearElText($infoUl.eq(1));
  /** 漫画分类 */
  const cartoonCategory = clearElText($infoUl.eq(2));
  /** 字母索引 */
  const alphabetIndex = $infoUl
    .eq(3)
    .find('a')
    .text();
  /** 别名 */
  const alias = clearElText($infoUl.eq(4));
  /** 最新章节 */
  const latestChapter = clearElText($infoUl.eq(5));
  /** 关键词 */
  const keyWords = clearElText($infoUl.eq(6));
  /** 人气 */
  const popularity = clearElText($infoUl.eq(7));
  /** 动漫简介 */
  const introduction = $('#intro1').text();
  const $similarList = $('#similarList ul li');
  /** 相关推荐 */
  let recommendList: CartoonOtherRecommendInfo[] = [];
  /** 章节列表 */
  let sectionList: SectionBaseInfo[] = [];

  if ($similarList) {
    $similarList.each((i, v) => {
      const cpSrc =
        $(v)
          .find('img')
          .attr('src') || '';
      const cName = $(v)
        .children('a')
        .text();
      const cHref =
        $(v)
          .children('a')
          .attr('href') || '';
      const lChapter = $(v)
        .find('.cover span')
        .text();

      recommendList.push({
        cartoonName: cName,
        coverPictureSrc: cpSrc,
        detailHref: cHref,
        latestChapter: lChapter
      });
    });
  }
  $('#play_0 ul li').each((i, v) => {
    const $aEl = $(v).find('a');
    const sectionTitle = $aEl.text();
    const sectionHref = $aEl.prop('href');

    sectionList.push({
      sectionTitle,
      sectionHref
    });
  });

  return {
    coverPictureSrc,
    cartoonName,
    state,
    upDataTime,
    cartoonAuthor,
    cartoonCategory,
    alphabetIndex,
    alias,
    latestChapter,
    keyWords,
    popularity,
    introduction,
    // detailHref,
    recommendList,
    sectionList
  };
}

/**
 * 解析出漫画图片地址列表 - 章节详情页
 * @param htmlText 返回的html长字符串
 */
export function resolveSectionImages(htmlText: string) {
  let photosr: string[] = [];
  const mathArr = htmlText.match(/packed="\S{20,}";/g) || '';
  /** base64 js代码片段 */
  const base64js = mathArr[0].slice(8, -2);
  /** 解码后的js代码 */
  const deCode = Buffer.from(base64js, 'base64')
    .toString()
    .slice(4);
  // 执行解析后的代码

  // eslint-disable-next-line no-eval
  eval(eval(deCode));
  photosr = photosr
    .filter((item) => item)
    .map((link) => `${IImanhuaImageHOST}/${link}`);
  return photosr;
}
