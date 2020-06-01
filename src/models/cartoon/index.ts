import DB from '../DB';
interface DetailReq {
  (req: { cartoonId: number }): Promise<{ cartoonInfo: any; sectionList: any }>;
}
class CaroonModel extends DB {
  // 获取动漫列表
  async getCartoonList() {
    const sql = 'SELECT id, cartoonName, description FROM cartoon_list;';
    const cartoonList = await this.getConnection(sql);

    return cartoonList || [];
  }

  // 获取动漫详情
  async getCartoonDetail(param: { cartoonId: number }) {
    const { cartoonId } = param;
    const queryDetailSql = `SELECT cartoonName, updataTime, coverImage, description FROM cartoon_list WHERE id=${cartoonId};`;
    const [cartoonInfo] = await this.getConnection(queryDetailSql);
    const querySectionListSql = `SELECT sectionId, sectionTitle, cartoonId FROM cartoon_sections WHERE cartoonId=${cartoonId} ORDER BY sectionId DESC;`;
    const sectionList = await this.getConnection(querySectionListSql);

    return {
      cartoonInfo,
      sectionList
    };
  }

  // 获取章节详情
  async getSectionDetail(param: {
    cartoonId: number;
    sectionId: number;
  }): Promise<{
    sectionId: number;
    sectionTitle: string;
    cartoonId: number;
    imagesList: string[];
  }> {
    const { cartoonId, sectionId } = param;
    const querySectionSql = `SELECT sectionId, sectionTitle, cartoonId FROM cartoon_sections WHERE cartoonId=${cartoonId} AND sectionId=${sectionId};`;
    const [sectionInfo] = await this.getConnection(querySectionSql);
    const queryImagesSql = `SELECT imageHref FROM cartoon_images WHERE cartoonId=${cartoonId} AND sectionId=${sectionId};`;
    const sectionImages: Array<{
      imageHref: string;
    }> = await this.getConnection(queryImagesSql);

    return {
      ...sectionInfo || {},
      imagesList: sectionImages.map((item) => `http://res.img.fffimage.com/${item.imageHref}`)
    };
  }
}

export default new CaroonModel();
