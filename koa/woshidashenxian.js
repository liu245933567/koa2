const superagent = require('superagent')
const charset = require('superagent-charset');
const cheerio = require('cheerio')
charset(superagent)

module.exports = class {
  constructor() {
    // 我是大神仙漫画链接
    this.url = "https://www.iimanhua.com/comic/1204/";
    this.getSectionsList = this.getSectionsList.bind(this);
  }

  // 获取章节列表
  getSectionsList() {
    return new Promise(resolve => {
      superagent
        .get(this.url)
        .charset('gb2312')
        .end((err, res) => {
          const htmlText = res.text
          const $ = cheerio.load(htmlText);
          let arr = []
          $("#play_0 ul li").each((i, v) => {
            const $aEl = $(v).find('a')
            // 标题
            const title = $aEl.prop("title");
            // 章节地址
            const href = `https://www.iimanhua.com${$aEl.prop("href")}`;
            arr.push({
              title,
              href
            })
          });
          resolve(arr)
        })
    })
  }


  // 获取每章的图片地址
  async getImagesOfSingleSection(){
    const sectionsList = await this.getSectionsList();
    const url = sectionsList[0].href;
    

  }
}