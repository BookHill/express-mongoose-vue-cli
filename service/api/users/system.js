const SystemModel = require('../../models/system');
const multiparty = require('multiparty');
const paths = require("path");

// 图片 -> icon
exports.images_icon = (req, res, next) => {
    let FileData = new multiparty.Form({uploadDir: process.cwd() + '/static/static/logo'});
    FileData.parse(req, function(err, fields, files) {
        let _fileName = [];
        for(let i=0, j=files.icon.length; i<j; i++) {
            let src = paths.basename(files.icon[i].path);   // 取文件名带后缀
            _fileName.push(src);
        }
        SystemModel.updateIcon( _fileName, (err, doc) => {
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
                        fieldName: files.icon[0].fieldName,
                        fileName: _fileName
                    }
                });
            }
        });
    });
}

// 图片 -> logo
exports.images_logo = (req, res, next) => {
    let FileData = new multiparty.Form({uploadDir: process.cwd() + '/static/static/logo'});
    FileData.parse(req, function(err, fields, files) {
        let _fileName = [];
        for(let i=0, j=files.logo.length; i<j; i++) {
            let src = paths.basename(files.logo[i].path);   // 取文件名带后缀
            _fileName.push(src);
        }
        SystemModel.updateLogo( _fileName, (err, doc) => {
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
                        fieldName: files.logo[0].fieldName,
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
        let _fields = { message: {}, SEO: {} }
            _fields.h1 = fields.h1[0];
            _fields.copyright = fields.copyright[0];
            _fields.message.name = fields.name[0];
            _fields.message.tel = fields.tel[0];
            _fields.message.email = fields.email[0];
            _fields.SEO.title = fields.title[0];
            _fields.SEO.keywords = fields.keywords[0];
            _fields.SEO.description = fields.description[0];
        SystemModel.updateAll( _fields, (err, doc) => {
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

// 查询 find -> detail
exports._detail = (req, res, next) => {
    SystemModel.findAll( (err, doc) => {
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