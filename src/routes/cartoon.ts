import * as Router from 'koa-router';
import {
  getCartoonList,
  getCartoonDetail,
  getSectionDetail
} from '../controllers/Cartoon';
const router = new Router();

router.post('/cartoonList.json', getCartoonList);
router.post('/cartoonDetail.json', getCartoonDetail);
router.post('/sectionDetail.json', getSectionDetail);

export default router;
