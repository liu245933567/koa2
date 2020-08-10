import * as Router from 'koa-router';
import user from '@controllers/User';
const router = new Router();

router.post('/loginRegister.json', user.loginRegister);
router.post('/loginStatus.json', user.loginStatus);
router.post('/uploader.json', user.uploadFile2);
router.post('/modifyUserInfo.json', user.modifyUserInfo);
router.post('/getHeadPortrait.json', user.getHeadPortrait);
router.post('/logOut.json', user.logOut);

export default router;
