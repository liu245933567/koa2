import * as Router from 'koa-router';
import sport from '@controllers/Sport';
const router = new Router();

router.post('/homeInfo.json', sport.getHomeInfo);

export default router;
