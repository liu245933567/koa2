const router = require('koa-router')();
const cartoonController = require('../../controllers/cartoon_controller');

router.post('/cartoonList.json', cartoonController.getCartoonList);
router.post('/cartoonDetail.json', cartoonController.getCartoonDetail);
router.post('/sectionDetail.json', cartoonController.getSectionDetail);

module.exports = router;
