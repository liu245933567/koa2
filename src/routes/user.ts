import * as Router from 'koa-router';
import user from '@controllers/User';
const router = new Router();

router.post('/loginRegister.json', user.loginRegister);
router.post('/loginStatus.json', user.loginStatus);
router.post('/uploader.json', user.uploadFile2);
// router.post('/login.json', user);
// router.post('/register.json', register);

export default router;
