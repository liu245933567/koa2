import * as Router from 'koa-router';
import cartoon from '@controllers/Cartoon';
const router = new Router();

router.post('/cartoonHome.json', cartoon.getCartoonHomeInfo);
router.post('/cartoonSearch.json', cartoon.cartoonSearch);
router.post('/cartoonCategoryInfo.json', cartoon.cartoonCategoryInfo);
router.post('/cartoonDetail.json', cartoon.getCartoonDetail);
router.post('/sectionDetail.json', cartoon.getSectionDetail);

export default router;
