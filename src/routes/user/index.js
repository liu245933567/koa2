const router = require('koa-router')();
const userRouter = require('./user_router');

router.use('/users', userRouter.routes(), userRouter.allowedMethods());

module.exports = router;
