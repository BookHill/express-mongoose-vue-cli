const express = require('express');
const router = express.Router();

const banner = require('./views/banner');               // banner
const lease = require('./views/lease');                 // 招租
const leaseDetail = require('./views/leaseDetail');         // 详情
const leaseType = require('./views/leaseType');             // 类型
const news = require('./views/news');                   // 新闻
const newsDetail = require('./views/newsDetail');           // 详情
const newsType = require('./views/newsType');               // 类型
const message = require('./views/message');             // 留言
const system = require('./views/system');               // 基本设置


// 路由 router
module.exports = router.post('/banner', banner);
module.exports = router.post('/lease', lease._find);
module.exports = router.post('/lease/map', lease._map);
module.exports = router.post('/leaseDetail', leaseDetail);
module.exports = router.post('/leaseType', leaseType);
module.exports = router.post('/news', news);
module.exports = router.post('/newsDetail', newsDetail);
module.exports = router.post('/newsType', newsType);
module.exports = router.post('/message', message);
module.exports = router.post('/system', system._find);
module.exports = router.post('/seo', system._seo);