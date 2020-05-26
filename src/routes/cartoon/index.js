import koaRouter from "koa-router";
import {
  getCartoonList,
  getCartoonDetail,
  getSectionDetail,
} from "../../controllers/cartoon_controller";
const router = koaRouter();
// const cartoonController = require('../../controllers/cartoon_controller');

router.post("/cartoonList.json", getCartoonList);
router.post("/cartoonDetail.json", getCartoonDetail);
router.post("/sectionDetail.json", getSectionDetail);

export default router;
