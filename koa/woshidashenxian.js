const superagent = require('superagent')
const charset = require('superagent-charset');
const cheerio = require('cheerio')
charset(superagent)

module.exports = class {
  constructor() {
    this.cartoonName = '我是大神仙';
    // 我是大神仙漫画链接
    this.url = "https://www.iimanhua.com/comic/1204/";
    this.data = {
      name: '我是大神仙',
      sectionsList: [
        // {
        //   title: '第二九二话·交',
        //   sectionHref: 'https://www.iimanhua.com/comic/1204/356792.html',
        //   imagesList: [
        //     'http://res.img.fffimage.com/images/2020/05/07/09/35ef093b38.jpg/0',
        //     'http://res.img.fffimage.com/images/2020/05/07/09/35ef093b38.jpg/0',
        //     'http://res.img.fffimage.com/images/2020/05/07/09/35ef093b38.jpg/0'
        //   ]
        // }
      ]
    }
    this.genIns = null;
    this.getSectionsList = this.getSectionsList.bind(this);
    this.getImagesOfSingleSection = this.getImagesOfSingleSection.bind(this);
    this.getData = this.getData.bind(this);
    this.toGetImagesOfSingleSection = this.toGetImagesOfSingleSection.bind(this);
  }

  /**
   * 获取章节列表
   * [{
   *  title: '第二九二话·交',
   *  sectionHref: 'https://www.iimanhua.com/comic/1204/356792.html'
   * }...]
   */
  getSectionsList() {
    const { cartoonName, url } = this;
    return new Promise(resolve => {
      console.log(`开始获取${cartoonName}章节列表`);
      superagent
        .get(url)
        .charset('gb2312')
        .end((err, res) => {
          const htmlText = res.text
          const $ = cheerio.load(htmlText);
          let sectionsList = []
          $("#play_0 ul li").each((i, v) => {
            const $aEl = $(v).find('a')
            // 标题
            const title = $aEl.prop("title");
            // 章节地址
            const sectionHref = `https://www.iimanhua.com${$aEl.prop("href")}`;
            sectionsList.push({
              title,
              sectionHref,
              imagesList: []
            })
          });
          console.log(`获取${cartoonName}章节列表结束, 共${sectionsList.length}章`);
          resolve(sectionsList)
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
      console.log(`开始获取${sectionInfo.title}的图片列表`);
      superagent
        .get(sectionInfo.sectionHref)
        .charset('gb2312')
        .end((err, res) => {
          const htmlText = res.text;
          let photosr = [];
          // base64 js代码片段
          const base64js = htmlText.match(/packed="\w{20,}";/g)[0].slice(8, -2);
          const deCode = new Buffer(base64js, 'base64').toString().slice(4);
          // 执行解析后的代码
          eval(eval(deCode));
          photosr = photosr.filter(item => item).map(link => `http://res.img.fffimage.com/${link}`);
          console.log(`获取${sectionInfo.title}图片地址完毕, 共${photosr.length}张`);
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
    const sectionsList = await this.getSectionsList();
    this.data.sectionsList = sectionsList;
    this.genIns = this.gen([sectionsList[0], sectionsList[1]]);
    this.toGetImagesOfSingleSection();
  }

  async toGetImagesOfSingleSection() {
    const sectionInfo = this.genIns.next().value;
    if (sectionInfo) {
      const { sectionsList } = this.data;
      const imagesList = await this.getImagesOfSingleSection(sectionInfo);
      for (let i = 0; i < sectionsList.length; i++) {
        if (sectionsList[i].title === sectionInfo.title) {
          this.data.sectionsList[i].imagesList = imagesList;
          break;
        }
      }
      this.toGetImagesOfSingleSection();
    } else {
      console.log('全部获取完毕', this.data)
    }
  }
}