const SystemModel = require('../../models/system');

// system
exports._find = (req, res, next) => {
    SystemModel.findAll( (err, doc) => {
        if (err) {
            return res.json({
                status: 0,
                info: err,
                result: ''
            });
        } else {
            return res.json({
                status: 1,
                info: 'success',
                result: doc
            });
        }
    });
}

// SEO
exports._seo = (req, res, next) => {
    SystemModel.findAll( (err, doc) => {
        if (err) {
            return res.json({
                status: 0,
                info: err,
                result: ''
            });
        } else {
            return res.json({
                status: 1,
                info: 'success',
                result: {
                    icon: doc.icon,
                    h1: doc.h1,
                    SEO: doc.SEO
                }
            });
        }
    });
}