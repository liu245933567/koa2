const router = require('koa-router')();
const userController = require('../../app/controllers/user_controller');

router.get('/getUser', userController.getUser);
router.post('/registerUser', userController.registerUser);

module.exports = router;
