import {
  convertParamsToGbk,
  toRequestPost,
  IImanhuaHOST,
  getHtmlDom
} from './utils';

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

/** 漫画基本信息 */
interface CartoonBaseInfo {
  /** 详情地址 */
  detailHref: string;
  /** 动漫名字 */
  cartoonName: string;
}

/** 推荐的漫画信息 */
interface CartoonRecommendInfo extends CartoonBaseInfo {
  /** 漫画作者 */
  cartoonAuthor: string;
  /** 漫画分类 */
  cartoonCategory: string;
  /** 封面链接 */
  coverPictureSrc: string;
  /** 最新章节 */
  latestChapter: string;
  /** 更新时间 */
  upDataTime: string;
}

/** 其他推荐漫画信息 */
interface CartoonOtherRecommendInfo extends CartoonBaseInfo {
  /** 封面链接 */
  coverPictureSrc: string;
  /** 最新章节 */
  latestChapter: string;
}

/** 其他推荐列表 */
interface OtherRecommend {
  /** 推荐 */
  recommend: {
    /** 推荐标题 */
    title:string;
    /** 推荐内容列表 */
    recommendList: CartoonOtherRecommendInfo[];
  };
  /** 排行榜 */
  rank: {
    /** 排行榜标题 */
    title: string;
    /** 排行榜列表 */
    rankList: CartoonBaseInfo[];
  }
}

/** 获取首页数据 */
export async function getHomePageInfo() {
  const homeUrl = IImanhuaHOST;
  const { $ } = await getHtmlDom(homeUrl);

  if (!$) { return {}; }

  /** 获取顶部推荐漫画 */
  const getRecommendCartoon = (type: 'coverBoxList2' | 'coverBoxList3') => {
    let resultArr:CartoonRecommendInfo[] = [];

    $(`.${type} .coverMhList .scroll li`).each((i, v) => {
      const $cover = $(v).find('a.pic');
      const detailHref = $($cover).attr('href') || '';
      const coverPictureSrc = $($cover).children('img').attr('src') || '';
      const $coverInfoChildren = $(v).find('p.coverInfo').children();
      const cartoonName = $coverInfoChildren.eq(0).text();
      const clearElText = (el: Cheerio) => el && el.clone().children().remove().end().text() || '';
      const cartoonAuthor = clearElText($coverInfoChildren.eq(1));
      const cartoonCategory = clearElText($coverInfoChildren.eq(2));
      const latestChapter = clearElText($coverInfoChildren.eq(3));
      const upDataTime = $coverInfoChildren.eq(4) && $coverInfoChildren.eq(4).find('font').text() || '';

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
      const coverPictureSrc = $(rv).find('a.pic img').attr('src') || '';
      const detailHref = $(rv).find('a.pic').attr('href') || '';
      const latestChapter = $(rv).find('.cover span').text() || '';
      const cartoonName = $(rv).children('a').text() || '';

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
        cartoonName = $(rv).find('.cover span').clone().children().remove().end().text() || '';
        detailHref = $(rv).find('.cover .pic').attr('href') || '';
      } else {
        cartoonName = $(rv).children('a').text() || '';
        detailHref = $(rv).children('a').attr('href') || '';
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
