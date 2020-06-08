import * as Router from 'koa-router';
import {
    addCrawler,
    getCrawlerList
} from '../controllers/Admin';
const router = new Router();

router.post('/addCrawler.json', addCrawler);
router.post('/getCrawlerList.json', getCrawlerList);

export default router;
