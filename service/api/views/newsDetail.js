const NewsModel = require('../../models/news');

let newsDetail = (req, res, next) => {
    let _type = req.body.params.type;       // _type -> 分类（allType）
    let _id = req.body.params.id;           // _id -> 新闻id
    let count;                              // 分类上下文档id--文档总数
    let left = { id: -1, title: '' }
    let right = { id: -1, title: '' }
    let recomArr;                           // 推荐id -> 数组

    // allType -> 分类-id
    if ( _type == 'allType' ) {
        NewsModel.findIdTypes( (err, doc) => {
            computedFn(doc);
        });
    }
    // 单一新闻分类 -> id
    if ( _type != 'allType' ) {
        NewsModel.findIdType( _type, (err, doc) => {
            computedFn(doc);
        });
    }
    // 计算上下篇id
    function computedFn(doc) {
        count = doc.length;
        if ( count == 1 ) {
            left.id = right.id = -1;
            newsFn(_id);
            return false;
        }
        for(let i=0; i < count; i++) {
            if (_id == doc[i].id) {
                switch (i) {
                    case 0:
                        left.id = -1;
                        right.id = doc[i+1].id;
                        right.title = doc[i+1].title;
                        newsFn(_id);
                        break;
                    case count-1:
                        left.id = doc[i-1].id;
                        left.title = doc[i-1].title;
                        right.id = -1;
                        newsFn(_id);
                        break;
                    default:
                        left.id = doc[i-1].id;
                        left.title = doc[i-1].title;
                        right.id = doc[i+1].id;
                        right.title = doc[i+1].title;
                        newsFn(_id);
                        break;
                }
                return false;
            }
        }
        // 匹配不到id
        return res.json({
            status: null,
            info: 'err',
            result: ''
        });
    }
    // id -> 单条数据
    function newsFn(id) {
        NewsModel.findId( id, (err, doc) => {
            if (err || doc == null) {
                return res.json({
                    status: null,
                    info: err,
                    result: doc
                });
            }
            NewsModel.findRecom( (err, recom) => {
                // recom -> 推荐 -> 截取前10
                recomArr = (recom.length > 10)?recom.slice(0, 10):recom;
                if (err) {
                    return res.json({
                        status: 0,
                        info: err,
                        type: _type,
                        result: ''
                    });
                } else {
                    return res.json({
                        status: 1,
                        info: 'success',
                        type: _type,
                        result: { 
                            left,
                            right,
                            count,
                            recomArr,
                            doc 
                        }
                    });
                }
            });
        });
    }
}

// exports
module.exports = newsDetail;