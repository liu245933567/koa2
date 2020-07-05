/** 漫画基本信息 */
export interface CartoonBaseInfo {
  /** 详情地址 */
  detailHref: string;
  /** 动漫名字 */
  cartoonName: string;
}

/** 推荐的漫画信息 */
export interface CartoonRecommendInfo extends CartoonBaseInfo {
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
export interface CartoonOtherRecommendInfo extends CartoonBaseInfo {
  /** 封面链接 */
  coverPictureSrc: string;
  /** 最新章节 */
  latestChapter: string;
}

/** 其他推荐列表 */
export interface OtherRecommend {
  /** 推荐 */
  recommend: {
    /** 推荐标题 */
    title: string;
    /** 推荐内容列表 */
    recommendList: CartoonOtherRecommendInfo[];
  };
  /** 排行榜 */
  rank: {
    /** 排行榜标题 */
    title: string;
    /** 排行榜列表 */
    rankList: CartoonBaseInfo[];
  };
}

/** 章节详情基础信息 */
export interface SectionBaseInfo {
  /** 章节路径 */
  sectionHref: string;
  /** 章节标题 */
  sectionTitle: string;
}

/** 动漫详情信息 */
export interface CartoonDetail extends CartoonRecommendInfo {
  /** 动漫简介 */
  introduction: string;
  /** 字母索引 */
  alphabetIndex: string;
  /** 人气 */
  popularity: string;
  /** 关键词 */
  keyWords: string;
  /** 当前连载状态状态 */
  state: string;
  /** 别名 */
  alias: string;
  /** 相关推荐 */
  recommendList: CartoonOtherRecommendInfo[];
  /** 章节列表 */
  sectionList: SectionBaseInfo[];
}

/** 章节详情完整信息 */
export interface SectionInfo extends SectionBaseInfo {
  /** 章节图片 */
  sectionImages: string[];
  /** 章节标题 */
  sectionTitle: string;
  /** 章节路径 */
  sectionHref: string;
  /** 下一章地址 */
  nextSectionHref: string;
}

/** 动漫类型标签 */
export interface ICartoonCategory {
  /** 种类名称 */
  category: string;
  /** 种类code */
  categoryKey: string;
}

export interface IPageNav {
  /** 页码名称 */
  page: string;
  /** 页码地址 */
  pageHref: string;
}

/** 首页信息 */
export interface ICartoonHomeRes {
  /** 热门推荐 */
  hotCartoonRecommends: CartoonRecommendInfo[];
  /** 最新更新推荐 */
  latestRecommends: CartoonRecommendInfo[];
  /** 其他推荐列表 */
  otherRecommendList: OtherRecommend[];
  categorys: ICartoonCategory[];
}
/** 动漫详情请求参数 */
export interface ICartoonDeatilInfoReq {
  /** 详情路径 */
  cartoonPath: string;
}

/** 章节详情请求参数 */
export interface ISectionDeatilInfoReq {
  /** 章节详情路径 */
  sectionPath: string;
}

/** 种类查询结果 */
export interface ICategoryPageInfo {
  /** 热门排行 */
  hotRankingList: CartoonBaseInfo[];
  /** 最新排行 */
  latestRankingList: CartoonBaseInfo[];
  /** 热门推荐 */
  hotCartoonRecommends: CartoonOtherRecommendInfo[];
  /** 动漫列表 */
  cartoonList: CartoonOtherRecommendInfo[];
  /** 页码列表 */
  pageList: IPageNav[];
}

/** 字母查询结果 */
export interface ILetterPageInfo {
  /** 动漫列表 */
  cartoonList: CartoonOtherRecommendInfo[];
  /** 页码列表 */
  pageList: IPageNav[];
}

/** 字母查询结果 */
export interface ISearchPageInfo {
  /** 动漫列表 */
  cartoonList: CartoonOtherRecommendInfo[];
}
