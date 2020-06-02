import * as Router from 'koa-router';
import {
  login
} from '../../controllers/User';
const router = new Router();

router.post('/login.json', login);

export default router;
