import * as Router from 'koa-router';
import cartoon from './cartoon';
import user from './user';

const router = new Router();

router.use('/cartoon', cartoon.routes(), cartoon.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());

export default router.routes();
