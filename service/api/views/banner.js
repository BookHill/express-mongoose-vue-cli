const BannerModel = require('../../models/banner');

let banner = (req, res, next) => {
    let _type = req.body.bannerType;
    BannerModel.findType( _type, (err, doc) => {
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

// exports
module.exports = banner;