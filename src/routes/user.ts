import * as Router from 'koa-router';
import user from '@controllers/User';
const router = new Router();

router.post('/loginRegister.json', user.loginRegister);
// router.post('/login.json', user);
// router.post('/register.json', register);

export default router;
