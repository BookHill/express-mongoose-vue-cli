const MessageModel = require('../../models/message');

// 删除 delete
exports._delete = (req, res, next) => {
    let _id = req.body.params.id;
    MessageModel.removeId( _id, (err, doc) => {
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

// 查询 find
exports._find = (req, res, next) => {
    let _page = --req.body.params.page;         // _page -> 页数（0）
    MessageModel.ByCount( (err, count) => {
        // count -> 文档长度; all -> 总页数 (初始值1)
        let all = Math.ceil( parseInt(count)/10 );
        MessageModel.findPages( _page, (err, doc) => {
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
                        doc: doc
                    }
                });
            }
        });
    });
}

// 查询 find -> detail
exports._detail = (req, res, next) => {
    let _id = req.body.params.id;       // id
    MessageModel.findId( _id, (err, doc) => {
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
}