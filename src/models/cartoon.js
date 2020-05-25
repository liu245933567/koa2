const db = require('../models/mongoDB');

// 获取动漫列表
exports.dbGetCartoonList = async (param = {}) => await db.find('cartoon_list', param);

// 获取动漫详情
// exports.dbGetCartoonDetail =
