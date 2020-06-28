import {
  convertParamsToGbk,
  toRequestPost,
  IImanhuaHOST,
  IImanhuaImageHOST,
  getHtmlDom,
  clearElText
} from './utils';
import {
  CartoonRecommendInfo,
  OtherRecommend,
  CartoonDetail,
  CartoonOtherRecommendInfo,
  SectionBaseInfo
} from './cartoon.types';

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
  /** 将utf-8编码转为GBK编码 */
  const postData = convertParamsToGbk(formData);
  const res = await toRequestPost(
    IImanhuaHOST.replace('https://', ''),
    '/e/search/index.php',
    postData
  );

  return res.headers.location;
}

/**
 * 查询动漫
 * @param searchStr 查询的字符串
 */
export async function searchCartoon(searchStr: string) {
  const searchPath = await getSearchPath(searchStr);

  console.log(searchPath);
}

/** 获取首页数据 */
export async function getHomePageInfo() {
  const homeUrl = IImanhuaHOST;
  const { $ } = await getHtmlDom(homeUrl);

  if (!$) {
    return {};
  }

  /** 获取顶部推荐漫画 */
  const getRecommendCartoon = (type: 'coverBoxList2' | 'coverBoxList3') => {
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
  };

  /** 热门连载漫画 */
  const hotCartoonRecommends = getRecommendCartoon('coverBoxList2');
  /** 最新更新漫画 */
  const latestRecommends = getRecommendCartoon('coverBoxList3');
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

  return {
    hotCartoonRecommends,
    latestRecommends,
    otherRecommendList
  };
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
  const coverPictureSrc = $('.info_cover img').attr('src') || '';
  const cartoonName = $('.titleInfo h1').text();
  const state = $('.titleInfo span').text();
  const $infoUl = $('.detailInfo ul li');
  const upDataTime = $infoUl
    .eq(0)
    .find('font')
    .text();
  const cartoonAuthor = clearElText($infoUl.eq(1));
  const cartoonCategory = clearElText($infoUl.eq(2));
  const alphabetIndex = $infoUl
    .eq(3)
    .find('a')
    .text();
  const alias = clearElText($infoUl.eq(4));
  const latestChapter = clearElText($infoUl.eq(5));
  const keyWords = clearElText($infoUl.eq(6));
  const popularity = clearElText($infoUl.eq(7));
  const introduction = $('#intro1').text();
  const $similarList = $('#similarList ul li');
  let recommendList: CartoonOtherRecommendInfo[] = [];
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
    detailHref,
    recommendList,
    sectionList
  };
}

/**
 * 获取章节详情信息
 * @param sectionHref 章节详情路径
 */
export async function getSectionDetailInfo(sectionHref: string) {
  const url = IImanhuaHOST + sectionHref;
  const { htmlText, $ } = await getHtmlDom(url);

  if (!$ || !htmlText) {
    return null;
  }
  let photosr: string[] = [];
  const mathArr = htmlText.match(/packed="\S{20,}";/g) || '';
  // base64 js代码片段
  const base64js = mathArr[0].slice(8, -2);
  const deCode = Buffer.from(base64js, 'base64')
    .toString()
    .slice(4);
  // 执行解析后的代码

  // eslint-disable-next-line no-eval
  eval(eval(deCode));
  photosr = photosr
    .filter((item) => item)
    .map((link) => `${IImanhuaImageHOST}/${link}`);

  return {
    sectionHref,
    photosr
  };
}
