import * as Router from 'koa-router';
import {
  getCartoonList,
  getCartoonDetail,
  getSectionDetail,
  getCartoonHomeInfo,
  cartoonSearch,
  cartoonCategoryInfo
} from '@controllers/Cartoon';
const router = new Router();

router.post('/cartoonHome.json', getCartoonHomeInfo);
router.post('/cartoonSearch.json', cartoonSearch);
router.post('/cartoonCategoryInfo.json', cartoonCategoryInfo);
router.post('/cartoonList.json', getCartoonList);
router.post('/cartoonDetail.json', getCartoonDetail);
router.post('/sectionDetail.json', getSectionDetail);

export default router;
