const NewsTypeModel = require('../../models/newsType');
const multiparty = require('multiparty');

// 增加 create
exports._create = (req, res, next) => {
    let FileData = new multiparty.Form();
    FileData.parse(req, function(err, fields, files) {
        let _name = fields.name[0];                 // name
        NewsTypeModel.ById( (err, doc) => {
            let _typeId;
            try {
                _typeId = parseInt(doc.newsType[0].typeId) + 1;
            } catch(e) {
                _typeId = 0;
            }
            NewsTypeModel.createNewsType( _typeId, _name, (err, doc) => {
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
    });
}

// 删除 delete
exports._delete = (req, res, next) => {
    let _id = req.body.params.id;   // typeId
    NewsTypeModel.removeType( _id, (err, doc) => {
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
        let _typeId = fields.id[0];
        let _name = fields.name[0];
        NewsTypeModel.updateNewsType( _typeId, _name, (err, doc) => {
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
    let _page = --req.body.params.page;         // _page -> 页数（0）
    NewsTypeModel.findAll( (err, doc) => {
        // count -> type数组长度; all -> 总页数 (初始值1)
        let count = doc.newsType.length;
        let all = Math.ceil( parseInt(count)/10 );
        let start = 0, end = 0;                 // 分页 -> 截取数组
            start = _page*10;
            end = (parseInt(_page) + 1) * 10;
        let _doc = doc.newsType.slice(start, end);
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
                    count: all,
                    current: _page+1,
                    doc: _doc
                }
            });
        }
    });
}

// 查询 find -> detail
exports._detail = (req, res, next) => {
    let FileData = new multiparty.Form();
    FileData.parse(req, function(err, fields, files) {
        let _typeId = fields.id[0];             // typeId
        NewsTypeModel.findTypeId( _typeId, (err, doc) => {
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
                    result: doc.newsType[0]
                });
            }
        });
    });
}