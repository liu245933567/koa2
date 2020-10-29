import {
  convertParamsToGbk,
  toRequestPost,
  IImanhuaHOST,
  getHtmlDom,
  clearElText
} from './utils';
import {
  CartoonDetail,
  SectionInfo,
  CartoonOtherRecommendInfo,
  ICategoryPageInfo,
  ILetterPageInfo,
  ISearchPageInfo,
  ICartoonHomeRes
} from '@typings/cartoon';
import {
  getRankInfo,
  getRecommendInfos,
  getCartoonListInfos,
  getPageListInfos,
  resolveCartoonDetail,
  resolveSectionImages,
  resolveCategorys,
  getRecommendCartoon,
  resolveOtherRecommendList
} from './iimanhuaDom';
/**
 * 获取搜索地址
 * @param searchStr 查询的字符串
 */
async function getSearchPath(searchStr: string): Promise<string | undefined> {
  /** 服务器接收的是GBK参数，响应也是GBK编码页面 */
  const formData = {
    orderby: 1,
    myorder: 1,
    tbname: 'mh',
    tempid: 3,
    show: 'title,player,playadmin,bieming,pinyin',
    keyboard: searchStr,
    Submit: '搜索漫画'
  };
  const postData = convertParamsToGbk(formData);
  const res = await toRequestPost(
    IImanhuaHOST.replace('http://', ''),
    '/e/search/index.php',
    postData
  );

  return res.headers.location;
}

/** 获取首页数据 */
export async function getHomePageInfo(): Promise<ICartoonHomeRes | null> {
  const homeUrl = IImanhuaHOST;
  const { $ } = await getHtmlDom(homeUrl);

  if (!$) {
    return null;
  }
  /** 种类列表 */
  let categorys = resolveCategorys($, '.nav .navWarp li');
  /** 热门连载漫画 */
  const hotCartoonRecommends = getRecommendCartoon($, 'coverBoxList2');
  /** 最新更新漫画 */
  const latestRecommends = getRecommendCartoon($, 'coverBoxList3');
  /** 其他推荐列表 */
  let otherRecommendList = resolveOtherRecommendList($);

  return {
    hotCartoonRecommends,
    latestRecommends,
    otherRecommendList,
    categorys
  };
}

/**
 * 获取种类页数据
 * @param type 查询的类型
 * @param categoryPath 种类路径
 */
export async function getCategoryPageInfo(
  type: 'CATEGORY' | 'LETTER' | 'SEARCH',
  categoryPath: string = '/shaonianrexue'
): Promise<ICategoryPageInfo | ILetterPageInfo | ISearchPageInfo | null> {
  const url =
    type === 'SEARCH'
      ? 'http://www.iimanhua.com/e/search/' + categoryPath
      : IImanhuaHOST + categoryPath;
  const { $ } = await getHtmlDom(url);

  if (!$) {
    return null;
  }
  /** 动漫列表 */
  let cartoonList = getCartoonListInfos($, '#dmList ul li');

  if (type === 'CATEGORY') {
    /** 热门排行 */
    let hotRankingList = getRankInfo($, '.topList ul li');
    /** 最新排行 */
    let latestRankingList = getRankInfo($, '.newUpdate ul li');
    /** 热门推荐 */
    let hotCartoonRecommends = getRecommendInfos($, '#lcmd_list ul');
    /** 页码列表 */
    let pageList = getPageListInfos($, '#pager a[target=_self]');

    return {
      hotRankingList,
      latestRankingList,
      hotCartoonRecommends,
      cartoonList,
      pageList
    };
  } else if (type === 'LETTER') {
    /** 页码列表 */
    let pageList = getPageListInfos($, '#pager a[target=_self]');

    return {
      cartoonList,
      pageList
    };
  }
  return {
    cartoonList
  };
}

/**
 * 查询动漫
 * @param searchStr 查询的字符串
 */
export async function searchCartoon(searchStr: string) {
  const searchPath = await getSearchPath(searchStr);
  let cartoonList: CartoonOtherRecommendInfo[] = [];

  if (searchPath && searchPath.indexOf('?searchid=0')) {
    const data = await getCategoryPageInfo('SEARCH', searchPath);

    cartoonList = data?.cartoonList as CartoonOtherRecommendInfo[];
  }
  return { cartoonList };
}

/**
 * 获取动漫详情信息
 * @param detailHref 动漫详情路径
 */
export async function getCartoonDetailInfo(
  detailHref: string
): Promise<CartoonDetail | null> {
  const url = IImanhuaHOST + detailHref;
  const { $ } = await getHtmlDom(url);

  if (!$) {
    return null;
  }
  const detail = resolveCartoonDetail($);

  return {
    ...detail,
    detailHref
  };
}

/**
 * 获取章节详情信息
 * @param sectionHref 章节详情路径
 */
export async function getSectionDetailInfo(
  sectionHref: string
): Promise<SectionInfo | null> {
  const url = IImanhuaHOST + sectionHref;
  const { htmlText, $ } = await getHtmlDom(url);

  if (!$ || !htmlText) {
    return null;
  }
  let sectionImages = resolveSectionImages(htmlText);
  const sectionTitle = clearElText($('h1'));
  let nextSectionHref = '';
  // 获取下一章节数据
  const idMatch = sectionHref.match(/[0-9]{1,}.html/g);
  const sectionId =
    idMatch && idMatch[0] ? Number(idMatch[0].slice(0, -5)) : -1;
  /** 请求下一章数据，请求参数 */
  const nextParam = convertParamsToGbk({ id: sectionId });

  const { responseData } = await toRequestPost(
    IImanhuaHOST.replace('http://', ''),
    '/e/extend/ret_page/index.php',
    nextParam
  );

  if (responseData) {
    const res = responseData.toString('utf8');
    const resData = JSON.parse(res);

    if (resData.status && resData.status === 1) {
      nextSectionHref = resData.url;
    }
  }

  return {
    sectionTitle,
    sectionHref,
    sectionImages,
    nextSectionHref,
    sectionId,
    isWatched: false
  };
}
