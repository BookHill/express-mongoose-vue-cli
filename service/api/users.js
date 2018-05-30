const express = require('express');
const router = express.Router();

const login = require('./users/login');                 // login
const homeUser = require('./users/homeUser');           // home -> 用户状态
const system = require('./users/system');               // system -> 网站设置
const links = require('./users/links');                 // system -> 友情链接
const admin = require('./users/admin');                 // 管理员
const message = require('./users/message');             // 留言
const banner = require('./users/banner');               // banner
const newsType = require('./users/newsType');           // newsType
const news = require('./users/news');                   // news
const leaseType = require('./users/leaseType');         // leaseType
const lease = require('./users/lease');                 // lease
const editor = require('./users/editor');               // editor -> 编辑器

// 路由 router
    // login
module.exports = router.post('/login', login);
module.exports = router.post('/homeUser', homeUser);
    // system
module.exports = router.post('/system/icon', system.images_icon);
module.exports = router.post('/system/logo', system.images_logo);
module.exports = router.post('/system/update', system._update);
module.exports = router.post('/system/detail', system._detail);
    // links
module.exports = router.post('/links/create', links._create);
module.exports = router.post('/links/delete', links._delete);
module.exports = router.post('/links/update', links._update);
module.exports = router.post('/links/find', links._find);
module.exports = router.post('/links/detail', links._detail);
    // admin
module.exports = router.post('/admin/create', admin._create);
module.exports = router.post('/admin/delete', admin._delete);
module.exports = router.post('/admin/update', admin._update);
module.exports = router.post('/admin/find', admin._find);
module.exports = router.post('/admin/detail', admin._detail);
    // message
module.exports = router.post('/message/delete', message._delete);
module.exports = router.post('/message/find', message._find);
module.exports = router.post('/message/detail', message._detail);
    // banner
module.exports = router.post('/banner/banner', banner.images_banner);
module.exports = router.post('/banner/update', banner._update);
module.exports = router.post('/banner/find', banner._find);
module.exports = router.post('/banner/detail', banner._detail);
    // newsType
module.exports = router.post('/newsType/create', newsType._create);
module.exports = router.post('/newsType/delete', newsType._delete);
module.exports = router.post('/newsType/update', newsType._update);
module.exports = router.post('/newsType/find', newsType._find);
module.exports = router.post('/newsType/detail', newsType._detail);
    // news
module.exports = router.post('/news/thumbnail', news.images_thumbnail);
module.exports = router.post('/news/type', news._type);
module.exports = router.post('/news/create', news._create);
module.exports = router.post('/news/delete', news._delete);
module.exports = router.post('/news/update', news._update);
module.exports = router.post('/news/find', news._find);
module.exports = router.post('/news/detail', news._detail);
    // leaseType -> place
module.exports = router.post('/leaseType/place/create', leaseType._place_create);
module.exports = router.post('/leaseType/place/delete', leaseType._place_delete);
module.exports = router.post('/leaseType/place/update', leaseType._place_update);
module.exports = router.post('/leaseType/place/find', leaseType._place_find);
module.exports = router.post('/leaseType/place/detail', leaseType._place_detail);
    // leaseType -> area
module.exports = router.post('/leaseType/area/create', leaseType._area_create);
module.exports = router.post('/leaseType/area/delete', leaseType._area_delete);
module.exports = router.post('/leaseType/area/update', leaseType._area_update);
module.exports = router.post('/leaseType/area/find', leaseType._area_find);
module.exports = router.post('/leaseType/area/detail', leaseType._area_detail);
    // leaseType -> money
module.exports = router.post('/leaseType/money/create', leaseType._money_create);
module.exports = router.post('/leaseType/money/delete', leaseType._money_delete);
module.exports = router.post('/leaseType/money/update', leaseType._money_update);
module.exports = router.post('/leaseType/money/find', leaseType._money_find);
module.exports = router.post('/leaseType/money/detail', leaseType._money_detail);
    // leaseType -> tag
module.exports = router.post('/leaseType/tag/create', leaseType._tag_create);
module.exports = router.post('/leaseType/tag/delete', leaseType._tag_delete);
module.exports = router.post('/leaseType/tag/update', leaseType._tag_update);
module.exports = router.post('/leaseType/tag/find', leaseType._tag_find);
module.exports = router.post('/leaseType/tag/detail', leaseType._tag_detail);
    // lease
module.exports = router.post('/lease/thumbnail', lease.images_thumbnail);
module.exports = router.post('/lease/images', lease.images_images);
module.exports = router.post('/lease/type', lease._type);
module.exports = router.post('/lease/tag', lease._tag);
module.exports = router.post('/lease/create', lease._create);
module.exports = router.post('/lease/delete', lease._delete);
module.exports = router.post('/lease/update', lease._update);
module.exports = router.post('/lease/find', lease._find);
module.exports = router.post('/lease/detail', lease._detail);

    // editor
module.exports = router.post('/editor/news/images', editor._news_images);
module.exports = router.post('/editor/lease/images/1', editor._lease_images_1);
module.exports = router.post('/editor/lease/images/2', editor._lease_images_2);