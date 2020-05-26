import koaRouter from 'koa-router';
import cartoonController from '../../controllers/cartoon_controller';
const router = koaRouter();
// const cartoonController = require('../../controllers/cartoon_controller');

router.post('/cartoonList.json', cartoonController.getCartoonList);
router.post('/cartoonDetail.json', cartoonController.getCartoonDetail);
router.post('/sectionDetail.json', cartoonController.getSectionDetail);

export default router;
