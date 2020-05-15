const router = require('koa-router')();
const cartoon_controller = require('../../controllers/cartoon_controller');

router.post('/cartoonList.json', cartoon_controller.getCartoonList);
router.post('/cartoonDetail.json', cartoon_controller.getCartoonDetail);
router.post('/sectionDetail.json', cartoon_controller.getSectionDetail);

module.exports = router;