import * as Router from 'koa-router';
import { getVideoList, getCategories } from '../controllers/Video';
const router = new Router();

router.post('/videoList.json', getVideoList);
router.post('/getVideoCategories.json', getCategories);

export default router;
