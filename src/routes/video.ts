import * as Router from 'koa-router';
import { getVideoList, getCategories } from '../controllers/Video';
const router = new Router();

router.post('/videoList.json', getVideoList);
router.post('/videoCategories.json', getCategories);

export default router;
