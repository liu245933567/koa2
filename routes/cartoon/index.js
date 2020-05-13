const router = require('koa-router')();
const cartoon_controller = require('../../app/controllers/cartoon_controller');

router.post('/cartoonList.json', cartoon_controller.getCartoonList);
router.post('/cartoonDetail.json', cartoon_controller.getCartoonDetail);
router.post('/sectionDtail.json', cartoon_controller.getSectionDtail);

module.exports = router;