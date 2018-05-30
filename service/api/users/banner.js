const BannerModel = require('../../models/banner');
const multiparty = require('multiparty');
const paths = require("path");

// 图片 -> banner
exports.images_banner = (req, res, next) => {
    let FileData = new multiparty.Form({uploadDir: process.cwd() + '/static/static/banner'});
    FileData.parse(req, function(err, fields, files) {
        let _id = fields.id[0];
        let _fileName = [];
        for(let i=0, j=files.banner.length; i<j; i++) {
            let src = paths.basename(files.banner[i].path);   // 取文件名带后缀
            _fileName.push(src);
        }
        BannerModel.updateBanner( _id, _fileName, (err, doc) => {
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
                        fieldName: files.banner[0].fieldName,
                        fileName: _fileName
                    }
                });
            }
        });
    });
}

// 修改 update
exports._update = (req, res, next) => {
    let FileData = new multiparty.Form();
    FileData.parse(req, function(err, fields, files) {
        let _id = fields.id[0];
        let _alt = fields.alt[0];
        BannerModel.updateAlt( _id, _alt, (err, doc) => {
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
    BannerModel.ByCount( (err, count) => {
        // count -> 文档长度; all -> 总页数 (初始值1)
        let all = Math.ceil( parseInt(count)/10 );
        BannerModel.findPages( _page, (err, doc) => {
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
    BannerModel.findId( _id, (err, doc) => {
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