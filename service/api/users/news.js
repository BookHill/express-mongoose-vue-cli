const NewsTypeModel = require('../../models/newsType');
const NewsModel = require('../../models/news');
const multiparty = require('multiparty');
const paths = require("path");

// 图片 -> thumbnail
exports.images_thumbnail = (req, res, next) => {
    let FileData = new multiparty.Form({uploadDir: process.cwd() + '/static/static/news'});
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
        NewsModel.updateThumbnail( _id, _fileName, (err, doc) => {
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

// find 新闻类型
exports._type = (req, res, next) => {
    // allType -> 所有新闻分类
    NewsTypeModel.findAll( (err, doc) => {
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
                result: doc.newsType
            });
        }
    });
}

// 增加 create
exports._create = (req, res, next) => {
    let FileData = new multiparty.Form();
    FileData.parse(req, function(err, fields, files) {
        let form = { SEO: {} }
            form.author = fields.author[0];                  // 作者
            form.newsType = fields.newsType[0];              // 分类
            form.thumbnail = fields.thumbnail[0];            // 缩略图
            form.title = fields.newstitle[0];                // 标题
            form.summary = fields.summary[0];                // 摘要
            form.content = fields.content[0];                // 内容
            form.recom = fields.recom[0];                    // 是否推荐
            form.release = fields.release[0];                // 是否发布
            form.SEO.title = fields.title[0];                // SEO -> title
            form.SEO.keywords = fields.keywords[0];          // SEO -> keywords
            form.SEO.description = fields.description[0];    // SEO -> description
        NewsModel.ById( (err, count) => {
            // count.id -> max id (id++)
            try {
                form.id = count.id + 1;
            } catch(e) {
                form.id = 0;
            }
            let AddEntity = new NewsModel(form);
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
    NewsModel.removeId( _id, (err, doc) => {
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
        let _id = fields.id[0];                                 // id
        let _fields = { SEO: {} }
            _fields.author = fields.author[0];                  // 作者
            _fields.newsType = fields.newsType[0];              // 分类
            _fields.thumbnail = fields.thumbnail[0];            // 缩略图
            _fields.title = fields.newstitle[0];                // 标题
            _fields.summary = fields.summary[0];                // 摘要
            _fields.content = fields.content[0];                // 内容
            _fields.recom = fields.recom[0];                    // 是否推荐
            _fields.release = fields.release[0];                // 是否发布
            _fields.SEO.title = fields.title[0];                // SEO -> title
            _fields.SEO.keywords = fields.keywords[0];          // SEO -> keywords
            _fields.SEO.description = fields.description[0];    // SEO -> description
        NewsModel.updateAll( _id, _fields, (err, doc) => {
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
        NewsModel.DocCount( (err, count) => {
            // count -> 文档长度; all -> 总页数 (初始值1)
            let all = Math.ceil( parseInt(count)/10 );
            NewsModel.DocFindPages( _page, (err, doc) => {
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
        NewsModel.DocCountType( _type, (err, count) => {
            // count -> 文档长度; all -> 总页数 (初始值1)
            let all = Math.ceil( parseInt(count)/10 );
            NewsModel.DocFindPage( _type, _page, (err, doc) => {
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
        NewsModel.findNewsId( _id, (err, doc) => {
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