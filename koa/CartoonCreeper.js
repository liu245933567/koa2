const superagent = require('superagent');
const charset = require('superagent-charset');
const cheerio = require('cheerio');
const fs = require('fs');
const db = require('./mongoDB');
charset(superagent);
const moment = require('moment');

/**
 * 爬取漫画资源信息
 * 目标网站： https://www.iimanhua.com/
 * @param {String} cartoonName 漫画名称
 * @param {String} cartoonUrl 漫画地址
 * @param {String} collectionTag 数据库表
 */
class CartoonCreeper {
  constructor({ cartoonName, cartoonUrl, collectionTag }) {
    this.cartoonName = cartoonName;
    // 漫画链接
    this.url = cartoonUrl;
    this.collectionTag = collectionTag;
    // 是否是更新
    this.isUpdata = false;
    // 漫画基本信息
    this.cartoonInfo = null;
    this.genIns = null;
    this.getSectionsList = this.getSectionsList.bind(this);
    this.getImagesOfSingleSection = this.getImagesOfSingleSection.bind(this);
    this.getData = this.getData.bind(this);
    this.toGetImagesOfSingleSection = this.toGetImagesOfSingleSection.bind(this);
  }

  /**
   * 获取章节列表
   * [{
   *  sectionTitle: '第二九二话·交',
   *  sectionId: 52642,
   *  sectionHref: 'https://www.iimanhua.com/comic/1204/356792.html',
   *  imagesList: []
   * }...]
   */
  getSectionsList() {
    const { cartoonName, url, collectionTag } = this;
    return new Promise(resolve => {
      console.log(`开始获取${cartoonName}章节列表 ~`);
      superagent
        .get(url)
        .buffer(true)
        .charset('gb2312')
        .end((err, res) => {
          if (err) {
            console.log(`获取${cartoonName}章节列表失败`);
            resolve([]);
          } else {
            const htmlText = res.text
            const $ = cheerio.load(htmlText);
            let sectionsList = [];
            const getCartoonIdFromUrl = (href) => {
              const arr = href.split('/').filter(item => Number(item || 'NaN') || Number(item) || 'NaN' === 0)
              return arr.length ? Number(arr[arr.length - 1]) : 9999;
            }
            const cartoonId = getCartoonIdFromUrl(url);
            const description = $("#intro1").html();
            this.cartoonInfo = {
              cartoonId,
              collectionTag,
              description: description || '暂无简介',
              cartoonName: cartoonName,
              updataTime: moment().format("YYYY-MM-DD")
            }
            $("#play_0 ul li").each((i, v) => {
              const $aEl = $(v).find('a')
              // 标题
              const sectionTitle = $aEl.prop("title");
              // 章节地址
              const sectionHref = `https://www.iimanhua.com${$aEl.prop("href")}`;
              const idMatch = sectionHref.match(/[0-9]{1,}.html/g);
              const sectionId = idMatch && idMatch[0] ? Number(idMatch[0].slice(0, -5)) : 9999;
              sectionsList.push({
                sectionTitle,
                sectionHref,
                sectionId,
                _id: sectionId,
                imagesList: []
              })
            });
            console.log(`获取${cartoonName}章节列表结束, 共${sectionsList.length}章`);
            resolve(sectionsList)
          }
        })
    })
  }


  /**
   * 获取每章的图片地址
   * @param {Object} sectionInfo 章节链接
   * [
   *   'http://res.img.fffimage.com/images/2020/05/07/09/35ef093b38.jpg/0',
   *   'http://res.img.fffimage.com/images/2020/05/07/09/35ef093b38.jpg/0',
   *   'http://res.img.fffimage.com/images/2020/05/07/09/35ef093b38.jpg/0',
   * ]
   */
  getImagesOfSingleSection(sectionInfo) {
    return new Promise(resolve => {
      console.log(`开始获取${sectionInfo.sectionTitle}的图片列表`);
      superagent
        .get(sectionInfo.sectionHref)
        .charset('gb2312')
        .buffer(true)
        .end((err, res) => {
          let photosr = [];
          if (err) {
            console.log(`获取${sectionInfo.sectionTitle}的图片列表失败`);
            resolve(photosr);
            return;
          }
          const htmlText = res.text;
          // base64 js代码片段
          const base64js = htmlText.match(/packed="\S{20,}";/g)[0].slice(8, -2);
          const deCode = Buffer.from(base64js, 'base64').toString().slice(4);
          // 执行解析后的代码
          eval(eval(deCode));
          photosr = photosr.filter(item => item).map(link => `http://res.img.fffimage.com/${link}`);
          console.log(`获取${sectionInfo.sectionTitle}图片地址完毕, 共${photosr.length}张`);
          resolve(photosr)
        })
    })
  }

  /**
   * 获取列表队列
   * @param {Array} sectionsList 
   */
  * gen(sectionsList) {
    for (let i = 0; i < sectionsList.length; i++) {
      yield sectionsList[i]
    }
  }

  async getData() {
    const { collectionTag } = this;
    const sectionsList = await this.getSectionsList();
    if (sectionsList.length < 1) return;
    const storeSectionList = await db.find(`cartoon_${collectionTag}_section_list`, {});
    if (!storeSectionList) {
      console.log('获取数据库信息出错');
      return;
    }
    const needUpdataSectionList = sectionsList.filter(item =>
      storeSectionList.findIndex(storeItem =>
        storeItem._id === item._id
      ) === -1
    )
    // this.data.sectionsList = sectionsList;
    if(needUpdataSectionList.length === 0){
      console.log('目前已经是最新');
      return;
    }
    this.isUpdata = true;
    this.genIns = this.gen(needUpdataSectionList);
    this.toGetImagesOfSingleSection();
  }

  async toGetImagesOfSingleSection() {
    let sectionInfo = this.genIns.next().value;
    if (sectionInfo) {
      // const { sectionsList } = this.data;
      const imagesList = await this.getImagesOfSingleSection(sectionInfo);
      if (imagesList.length < 1) {
        this.toGetImagesOfSingleSection();
        return;
      }
      sectionInfo.imagesList = imagesList;
      await db.insert(`cartoon_${this.collectionTag}_section_list`, sectionInfo);
      this.toGetImagesOfSingleSection();
    } else {
      if(this.isUpdata){
        await db.update(`cartoon_list`, {cartoonId: this.cartoonInfo.cartoonId}, this.cartoonInfo);
      } else {
        await db.insert(`cartoon_list`, this.cartoonInfo);
      }
      console.log('全部获取完毕');
      // let str = JSON.stringify(this.data)
      // fs.writeFile('congqian.json', str, (err) => {
      //   if (err) {
      //     console.log('生成json出错了');
      //   } else {
      //     console.log('写入json文件成功');
      //   }
      // })
    }
  }
}

// const ins = new CartoonCreeper({
//   cartoonName: '我是大神仙',
//    cartoonUrl: 'https://www.iimanhua.com/comic/1204/index.html', 
//    collectionTag: 'woshidashenxian'
// });

const ins = new CartoonCreeper({
  cartoonName: '元尊',
   cartoonUrl: 'https://www.iimanhua.com/comic/1381/index.html', 
   collectionTag: 'yuanzun'
});
ins.getData();

