const multiparty = require('multiparty');
const paths = require("path");

// 图片 -> news
exports._news_images = (req, res, next) => {
    let FileData = new multiparty.Form({uploadDir: process.cwd() + '/views/static/editor/news'});
    FileData.parse(req, function(err, fields, files) {
        let _fileName = [];                                     // editor -> images
        let filesKey = Object.keys(files)[0];                   // files  -> key
        let filesValue = files[filesKey];                       // files  -> value
        for(let i=0, j=filesValue.length; i<j; i++) {
            let src = paths.basename(filesValue[i].path);       // 取文件名带后缀
            _fileName.push(src);
        }
        // 返回数组 editor -> images
        return res.json({
            status: 1,
            session: true,
            info: 'success',
            result: {
                fieldName: 'editor-images',
                fileName: _fileName
            }
        });
    });
}

// 图片 -> lease -> 1
exports._lease_images_1 = (req, res, next) => {
    let FileData = new multiparty.Form({uploadDir: process.cwd() + '/views/static/editor/lease'});
    FileData.parse(req, function(err, fields, files) {
        let _fileName = [];                                     // editor -> images
        let filesKey = Object.keys(files)[0];                   // files  -> key
        let filesValue = files[filesKey];                       // files  -> value
        for(let i=0, j=filesValue.length; i<j; i++) {
            let src = paths.basename(filesValue[i].path);       // 取文件名带后缀
            _fileName.push(src);
        }
        // 返回数组 editor -> images
        return res.json({
            status: 1,
            session: true,
            info: 'success',
            result: {
                fieldName: 'editor-images',
                editor: 1,
                fileName: _fileName
            }
        });
    });
}

// 图片 -> lease -> 2
exports._lease_images_2 = (req, res, next) => {
    let FileData = new multiparty.Form({uploadDir: process.cwd() + '/views/static/editor/lease'});
    FileData.parse(req, function(err, fields, files) {
        let _fileName = [];                                     // editor -> images
        let filesKey = Object.keys(files)[0];                   // files  -> key
        let filesValue = files[filesKey];                       // files  -> value
        for(let i=0, j=filesValue.length; i<j; i++) {
            let src = paths.basename(filesValue[i].path);       // 取文件名带后缀
            _fileName.push(src);
        }
        // 返回数组 editor -> images
        return res.json({
            status: 1,
            session: true,
            info: 'success',
            result: {
                fieldName: 'editor-images',
                editor: 2,
                fileName: _fileName
            }
        });
    });
}