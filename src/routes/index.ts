import * as Router from 'koa-router';
import cartoon from './cartoon';
import user from './user';
import sport from './sport';

const router = new Router();

router.use('/cartoon', cartoon.routes(), cartoon.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());
router.use('/sport', sport.routes(), sport.allowedMethods());

export default router.routes();
