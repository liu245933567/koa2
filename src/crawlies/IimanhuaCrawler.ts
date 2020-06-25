import * as superagent from 'superagent';
// @ts-ignore
import * as charset from 'superagent-charset';
import * as cheerio from 'cheerio';
import Section from '../models/section';
import Cartoon from '../models/cartoon';
import Crawlers from '../models/crawler';

charset(superagent);

type MessageCallType = (param: { type: string; message: string }) => void;

interface SectionInfo {
  sectionTitle: string;
  sectionHref: string;
  sectionId: number;
  cartoonId: number;
  imagesList: string[];
}
interface CartoonInfo {
  _id: number;
  cartoonName: string;
  description: string;
  coverImage: string;
  sectionsList: SectionInfo[];
}

class Crawler {
  url: string;
  cartoonName: string;
  cartoonInfo: {
    _id: number;
    cartoonName: string;
    description: string;
    coverImage: string;
    sections: number[];
  } | null;
  messageCall: MessageCallType;
  constructor(messageCall: MessageCallType) {
    this.messageCall = messageCall;
    this.url = 'https://www.iimanhua.com/comic/1204/index.html';
    this.cartoonName = '我是大神仙';
    this.cartoonInfo = null;
    this.getCartoonInfo = this.getCartoonInfo.bind(this);
  }

  /**
   * 获取动漫信息
   */
  getCartoonInfo(crawler:{
    name: string;
    href: string;
  }): Promise<CartoonInfo | null> {
    const { messageCall } = this;
    const cartoonName = crawler.name, url = crawler.href;

    return new Promise((resolve) => {
      // othlogger.info(`开始获取${cartoonName}章节列表 ~`);
      messageCall({
        type: 'info',
        message: `开始获取《${cartoonName}》章节列表 ~`
      });
      superagent
        .get(url)
        .buffer(true)
        // @ts-ignore
        .charset('gb2312')
        // @ts-ignore
        .end((err, res) => {
          if (err) {
            // errlogger.info(`获取${cartoonName}章节列表失败`);
            messageCall({
              type: 'error',
              message: `获取《${cartoonName}》章节列表失败`
            });
            resolve(null);
          } else {
            const htmlText = res.text;
            const $ = cheerio.load(htmlText);

            const getCartoonIdFromUrl = (href: string) => {
              const arr = href
                .split('/')
                .filter((item) => Number(item || 'NaN') || Number(item));

              return arr.length ? Number(arr[arr.length - 1]) : 9999;
            };
            const cartoonId = getCartoonIdFromUrl(url);
            const description = $('.introduction').text();
            const coverImage = $('.info_cover img').prop('src');

            let sectionsList: Array<SectionInfo> = [];

            $('#play_0 ul li').each((i, v) => {
              const $aEl = $(v).find('a');
              // 标题
              const sectionTitle = $aEl.prop('title');
              // 章节地址
              const sectionHref = `https://www.iimanhua.com${$aEl.prop(
                'href'
              )}`;
              const idMatch = sectionHref.match(/[0-9]{1,}.html/g);
              const sectionId =
                idMatch && idMatch[0] ? Number(idMatch[0].slice(0, -5)) : -1;

              if (sectionId > -1) {
                sectionsList.push({
                  sectionTitle,
                  sectionHref,
                  sectionId,
                  cartoonId,
                  imagesList: []
                });
              }
            });
            const cartoonInfo = {
              _id: cartoonId,
              coverImage,
              description: description || '暂无简介',
              cartoonName,
              sectionsList
            };
            // othlogger.info(`获取${cartoonName}章节列表结束, 共${sectionsList.length}章`);

            messageCall({
              type: 'info',
              message: `获取《${cartoonName}》章节列表结束, 共${sectionsList.length}章`
            });
            resolve(cartoonInfo);
          }
        });
    });
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
  getImagesOfSingleSection(
    sectionInfo: SectionInfo
  ): Promise<SectionInfo | null> {
    return new Promise((resolve) => {
      // othlogger.info(`开始获取${sectionInfo.sectionTitle}的图片列表`);
      this.messageCall({
        type: 'info',
        message: `开始获取${sectionInfo.sectionTitle}的图片列表`
      });
      superagent
        .get(sectionInfo.sectionHref)
        // @ts-ignore
        .charset('gb2312')
        .buffer(true)
        // @ts-ignore
        .end((err, res) => {
          let photosr: string[] = [];

          if (err) {
            // errlogger.info(`获取${sectionInfo.sectionTitle}的图片列表失败`);
            this.messageCall({
              type: 'error',
              message: `获取${sectionInfo.sectionTitle}的图片列表失败`
            });
            resolve(null);
            return;
          }
          const htmlText = res.text;
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
            .map((link) => `http://res.img.fffimage.com/${link}`);
          // othlogger.info(`获取${sectionInfo.sectionTitle}图片地址完毕, 共${photosr.length}张`);
          this.messageCall({
            type: 'info',
            message: `获取${sectionInfo.sectionTitle}图片地址完毕, 共${photosr.length}张`
          });
          sectionInfo.imagesList = photosr;
          resolve(sectionInfo);
        });
    });
  }

  *sectionGen(sections: SectionInfo[]) {
    for (let i = 0; i < sections.length; i++) {
      // yield this.getImagesOfSingleSection(sections[i]);
      yield sections[i];
    }
  }

  /** 开始获取动漫信息 */
  async getData(crawler:{
    name: string;
    href: string;
  }) {
    let cartoonInfo = await this.getCartoonInfo(crawler);

    if (cartoonInfo) {
      const { _id } = cartoonInfo;
      const cartoonInfoFromDB = await Cartoon.findById(_id);
      // 数据库中所存的 sectionId 集合
      const sectionIdsFromDB =
        (cartoonInfoFromDB && cartoonInfoFromDB.sections || []) as number[];
      // 未存入数据库中的 section
      const sectionInfoNotInsert = cartoonInfo.sectionsList.filter(
        (item) => !sectionIdsFromDB.includes(item.sectionId)
      );

      if (!cartoonInfoFromDB) {
        await Cartoon.create({
          _id: _id,
          cartoonName: cartoonInfo.cartoonName,
          description: cartoonInfo.description,
          updataTime: new Date(),
          coverImage: cartoonInfo.coverImage,
          sections: []
        });
      }
      if (sectionInfoNotInsert.length > 0) {
        const sectionGenIns = this.sectionGen(sectionInfoNotInsert);

        const toGen = async () => {
          const genItem = sectionGenIns.next().value;

          if (genItem) {
            const sectionInfoIntegrated = await this.getImagesOfSingleSection(
              genItem
            );

            if (sectionInfoIntegrated) {
              const {
                sectionId,
                cartoonId,
                sectionTitle,
                imagesList
              } = sectionInfoIntegrated;
              const sectionInsertResult = await Section.create({
                _id: sectionId,
                cartoonId: cartoonId,
                sectionTitle: sectionTitle,
                imagesList: imagesList
              });

              console.log('sectionInsertResult -- ', sectionInsertResult);
              await Cartoon.update(
                { _id: cartoonId },
                { $addToSet: { sections: sectionId } }
              );
            }

            toGen();
          }
        };

        toGen();
      } else {
        this.messageCall({
          type: 'info',
          message: `《${cartoonInfo.cartoonName}》已是最新章节, 无需更新`
        });
      }
    }
  }

  async getListData() {
    const crawlerList = await Crawlers.find({type: 'cartoon'}, {name: 1, href: 1});

    if (crawlerList) {
      const crawlerGen = function *() {
        for (let i = 0; i< crawlerList.length; i++) {
          yield crawlerList[i];
        }
      };
      const crawlersGenIns = crawlerGen();
      const toGet = async () =>{
        const crawler = crawlersGenIns.next().value;

        if (crawler) {
          await this.getData(crawler);
          toGet();
        } else {
          this.messageCall({
            type: 'info',
            message: '全部获取完毕'
          });
        }
      };

      toGet();
    }
  }
}

export default Crawler;
