const LeaseTypeModel = require('../../models/leaseType');
const LeaseModel = require('../../models/lease');
const multiparty = require('multiparty');
const paths = require("path");

// 图片 -> thumbnail
exports.images_thumbnail = (req, res, next) => {
    let FileData = new multiparty.Form({uploadDir: process.cwd() + '/static/static/lease'});
    FileData.parse(req, function(err, fields, files) {
        let _id = fields.id[0];
        let _fileName = [];
        for(let i=0, j=files.thumbnail.length; i<j; i++) {
            let src = paths.basename(files.thumbnail[i].path);   // 取文件名带后缀
            _fileName.push(src);
        }
        // 添加
        if (_id == 'add') {
            return res.json({
                status: 1,
                session: true,
                info: 'success',
                result: {
                    fieldName: files.thumbnail[0].fieldName,
                    fileName: _fileName
                }
            });
        }
        // 修改
        LeaseModel.updateThumbnail( _id, _fileName, (err, doc) => {
            if (err) {
                return res.json({
                    status: 0,
                    session: false,
                    info: err,
                    result: ''
                });
            } else {
                return res.json({
                    status: 1,
                    session: true,
                    info: 'success',
                    result: {
                        fieldName: files.thumbnail[0].fieldName,
                        fileName: _fileName
                    }
                });
            }
        });
    });
}

// 图片 -> images
exports.images_images = (req, res, next) => {
    let FileData = new multiparty.Form({uploadDir: process.cwd() + '/static/static/lease'});
    FileData.parse(req, function(err, fields, files) {
        let _id = fields.id[0];                                 // 招租id
        let _fileName = [];                                     // images
        let filesKey = Object.keys(files)[0];                   // files -> key
        let filesValue = files[filesKey];                       // files -> value
        for(let i=0, j=filesValue.length; i<j; i++) {
            let src = paths.basename(filesValue[i].path);       // 取文件名带后缀
            _fileName.push(src);
        }
        // 添加
        if (_id == 'add') {
            return res.json({
                status: 1,
                session: true,
                info: 'success',
                result: {
                    fieldName: 'images',
                    fileName: _fileName
                }
            });
        }
        // 修改
        LeaseModel.updateImages( _id, _fileName, (err, doc) => {
            if (err) {
                return res.json({
                    status: 0,
                    session: false,
                    info: err,
                    result: ''
                });
            } else {
                return res.json({
                    status: 1,
                    session: true,
                    info: 'success',
                    result: {
                        fieldName: 'images',
                        fileName: _fileName
                    }
                });
            }
        });
    });
}

// find 区域
exports._type = (req, res, next) => {
    LeaseTypeModel.findAll( (err, doc) => {
        if ( err ) {
            return res.json({
                status: 0,
                session: false,
                info: err,
                result: ''
            });
        } else {
            return res.json({
                status: 1,
                session: true,
                info: 'success',
                result: doc.placeType
            });
        }
    });
}

// find 标签
exports._tag = (req, res, next) => {
    LeaseTypeModel.findAll( (err, doc) => {
        if ( err ) {
            return res.json({
                status: 0,
                session: false,
                info: err,
                result: ''
            });
        } else {
            return res.json({
                status: 1,
                session: true,
                info: 'success',
                result: doc.tagType
            });
        }
    });
}

// 增加 create
exports._create = (req, res, next) => {
    let FileData = new multiparty.Form();
    FileData.parse(req, function(err, fields, files) {
        let key = fields.linkmanName[0];
        let value = fields.linkmanTel[0];
        let linkman = {}
            linkman[key] = value;
        let _id = fields.id[0];                                 // id
        let form = { map: {}, SEO: {} }
            form.linkman = linkman;                          // 联系人
            form.placeType = fields.placeType[0];            // 区域
            form.areaType = fields.areaType[0];              // 面积
            form.moneyType = fields.moneyType[0];            // 价格
            form.tagType = fields.tagType[0].split(",");     // 标签
            form.thumbnail = fields.thumbnail[0];            // 缩略图
            form.images = fields.images[0].split(",");       // 多图展示
            form.title = fields.leaseTitle[0];               // 标题
            form.summary = fields.summary[0];                // 摘要
            form.detail = fields.detail[0];                  // 详情
            form.content = fields.content[0];                // 内容
            form.recom = fields.recom[0];                    // 是否推荐
            form.release = fields.release[0];                // 是否发布
            form.SEO.title = fields.title[0];                // SEO -> title
            form.SEO.keywords = fields.keywords[0];          // SEO -> keywords
            form.SEO.description = fields.description[0];    // SEO -> description
            form.map.lng = fields.lng[0];                    // map -> lng
            form.map.lat = fields.lat[0];                    // map -> lat
            form.map.zoom = fields.zoom[0];                  // map -> zoom
        LeaseModel.ById( (err, count) => {
            // count.id -> max id (id++)
            try {
                form.id = count.id + 1;
            } catch(e) {
                form.id = 0;
            }
            let AddEntity = new LeaseModel(form);
            AddEntity.save( (err, doc) => {
                if (err) {
                    return res.json({
                        status: 0,
                        session: false,
                        info: err,
                        result: ''
                    });
                } else {
                    return res.json({
                        status: 1,
                        session: true,
                        info: 'success',
                        result: ''
                    });
                }
            });
        });
    });
}

// 删除 delete
exports._delete = (req, res, next) => {
    let _id = req.body.params.id;
    LeaseModel.removeId( _id, (err, doc) => {
        if (err) {
            return res.json({
                status: 0,
                session: false,
                info: err,
                result: ''
            });
        } else {
            return res.json({
                status: 1,
                session: true,
                info: 'success',
                result: doc
            });
        }
    });
}

// 修改 update
exports._update = (req, res, next) => {
    let FileData = new multiparty.Form();
    FileData.parse(req, function(err, fields, files) {
        let key = fields.linkmanName[0];
        let value = fields.linkmanTel[0];
        let linkman = {}
            linkman[key] = value;
        let _id = fields.id[0];                                 // id
        let _fields = { map: {}, SEO: {} }
            _fields.linkman = linkman;                          // 联系人
            _fields.placeType = fields.placeType[0];            // 区域
            _fields.areaType = fields.areaType[0];              // 面积
            _fields.moneyType = fields.moneyType[0];            // 价格
            _fields.tagType = fields.tagType[0].split(",");     // 标签
            _fields.thumbnail = fields.thumbnail[0];            // 缩略图
            _fields.images = fields.images[0].split(",");       // 多图展示
            _fields.title = fields.leaseTitle[0];               // 标题
            _fields.summary = fields.summary[0];                // 摘要
            _fields.detail = fields.detail[0];                  // 详情
            _fields.content = fields.content[0];                // 内容
            _fields.recom = fields.recom[0];                    // 是否推荐
            _fields.release = fields.release[0];                // 是否发布
            _fields.SEO.title = fields.title[0];                // SEO -> title
            _fields.SEO.keywords = fields.keywords[0];          // SEO -> keywords
            _fields.SEO.description = fields.description[0];    // SEO -> description
            _fields.map.lng = fields.lng[0];                    // map -> lng
            _fields.map.lat = fields.lat[0];                    // map -> lat
            _fields.map.zoom = fields.zoom[0];                  // map -> zoom
        LeaseModel.updateAll( _id, _fields, (err, doc) => {
            if (err) {
                return res.json({
                    status: 0,
                    session: false,
                    info: err,
                    result: ''
                });
            } else {
                return res.json({
                    status: 1,
                    session: true,
                    info: 'success',
                    result: doc
                });
            }
        });
    });
}

// 查询 find
exports._find = (req, res, next) => {
    let _type = req.body.params.type;       // _type -> 分类（allType）
    let _page = --req.body.params.page;     // _page -> 页数（0）
    // allType -> 请求所有新闻分类-首页
    if ( _type == 'allType' ) {
        LeaseModel.DocCount( (err, count) => {
            // count -> 文档长度; all -> 总页数 (初始值1)
            let all = Math.ceil( parseInt(count)/10 );
            LeaseModel.DocFindPages( _page, (err, doc) => {
                if (err) {
                    return res.json({
                        status: 0,
                        session: false,
                        info: err,
                        type: _type,
                        result: ''
                    });
                } else {
                    return res.json({
                        status: 1,
                        session: true,
                        info: 'success',
                        type: _type,
                        result: {
                            count: all,
                            current: _page+1,
                            doc: doc
                        }
                    });
                }
            });
        });
    }
    // 单一新闻分类 -> _page页数据
    if ( _type != 'allType' ) {
        LeaseModel.DocCountType( _type, (err, count) => {
            // count -> 文档长度; all -> 总页数 (初始值1)
            let all = Math.ceil( parseInt(count)/10 );
            LeaseModel.DocFindPage( _type, _page, (err, doc) => {
                if (err) {
                    return res.json({
                        status: 0,
                        session: false,
                        info: err,
                        type: _type,
                        result: ''
                    });
                } else {
                    return res.json({
                        status: 1,
                        session: true,
                        info: 'success',
                        type: _type,
                        result: {
                            count: all,
                            current: _page+1,
                            doc: doc
                        }
                    });
                }
            });
        });
    }
}

// 查询 find -> detail
exports._detail = (req, res, next) => {
    let FileData = new multiparty.Form();
    FileData.parse(req, function(err, fields, files) {
        let _id = fields.id[0];             // news -> id
        LeaseModel.findLeaseId( _id, (err, doc) => {
            if (err || doc==null) {
                return res.json({
                    status: 0,
                    session: false,
                    info: err,
                    result: ''
                });
            } else {
                return res.json({
                    status: 1,
                    session: true,
                    info: 'success',
                    result: doc
                });
            }
        });
    });
}