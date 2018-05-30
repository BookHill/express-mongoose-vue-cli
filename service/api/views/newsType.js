const NewsTypeModel = require('../../models/newsType');

let newsType = (req, res, next) => {
    // allType -> 所有新闻分类
    NewsTypeModel.findAll( (err, doc) => {
        if ( err ) {
            return res.json({
                status: 0,
                info: err,
                result: ''
            });
        } else {
            return res.json({
                status: 1,
                info: 'success',
                result: doc.newsType
            });
        }
    });
}

// exports
module.exports = newsType;