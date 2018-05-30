const SystemModel = require('../../models/system');
const multiparty = require('multiparty');

// 增加 create
exports._create = (req, res, next) => {
    let FileData = new multiparty.Form();
    FileData.parse(req, function(err, fields, files) {
        let _name = fields.name[0];             // name
        let _url = fields.url[0];               // url
        SystemModel.createLinks( _name , _url, (err, doc) => {
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

// 删除 delete
exports._delete = (req, res, next) => {
    let _name = req.body.params.key;
    let _url = req.body.params.value;
    SystemModel.removeLinks( _name, _url, (err, doc) => {
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
        let _id = fields.id[0];                 // id
        let _new_name = fields.name[0];         // name
        let _new_url = fields.url[0];           // url
        // 下标查询原始值
        SystemModel.findLinksIndex( _id, (err, doc) => {
            let _old_name = doc.friendlyLink[0].name;
            let _old_url = doc.friendlyLink[0].url;
            // 删除原始值
            SystemModel.removeLinks( _old_name, _old_url, (err, doc) => {
                // 增加
                SystemModel.updateLinks( _id, _new_name, _new_url, (err, doc) => {
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
    });
}

// 查询 find
exports._find = (req, res, next) => {
    let _type = req.body.params.type;           // _type -> 请求类型
    let _page = --req.body.params.page;         // _page -> 页数（0）
    // all -> list
    if ( _type == 'all' ) {
        SystemModel.findLinks( (err, doc) => {
            // count -> 友情链接数组长度; all -> 总页数 (初始值1)
            let count = doc.friendlyLink.length;
            let all = Math.ceil( parseInt(count)/10 );
            let start = 0, end = 0;             // 分页 -> 截取数组
                start = _page*10;
                end = (parseInt(_page) + 1) * 10;
            let _doc = doc.friendlyLink.slice(start, end);
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
}

// 查询 find -> detail
exports._detail = (req, res, next) => {
    let FileData = new multiparty.Form();
    FileData.parse(req, function(err, fields, files) {
        let _id = fields.id[0];                 // links 索引
        SystemModel.findLinksIndex( _id, (err, doc) => {
            if (err || doc.friendlyLink.length==0) {
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
                    result: doc.friendlyLink
                });
            }
        });
    });
}