import * as Router from 'koa-router';
import {
  login,
  register
} from '@controllers/User';
const router = new Router();

router.post('/login.json', login);
router.post('/register.json', register);

export default router;
