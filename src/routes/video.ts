import * as Router from 'koa-router';
import { getVideoList } from '../controllers/Video';
const router = new Router();

router.post('/videoList.json', getVideoList);

export default router;
