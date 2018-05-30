const NewsModel = require('../../models/news');

let news = (req, res, next) => {
    let _type = req.body.params.type;       // _type -> 分类（allType）
    let _page = --req.body.params.page;     // _page -> 页数（0）

    // allType -> 请求所有新闻分类-首页
    if ( _type == 'allType' ) {
        NewsModel.ByCount( (err, count) => {
            // count -> 文档长度; all -> 总页数 (初始值1)
            let all = Math.ceil( parseInt(count)/10 );
            NewsModel.findPages( _page, (err, doc) => {
                if (err || doc == null) {
                    return res.json({
                        status: null,
                        info: err,
                        type: _type,
                        result: doc
                    });
                } else {
                    return res.json({
                        status: 1,
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
        NewsModel.ByCountType( _type, (err, count) => {
            // count -> 文档长度; all -> 总页数 (初始值1)
            let all = Math.ceil( parseInt(count)/10 );
            NewsModel.findPage( _type, _page, (err, doc) => {
                if (err || doc == null) {
                    return res.json({
                        status: null,
                        info: err,
                        type: _type,
                        result: doc
                    });
                } else {
                    return res.json({
                        status: 1,
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

// exports
module.exports = news;