const LeaseTypeModel = require('../../models/leaseType');

let leaseType = (req, res, next) => {
    // allType -> 所有出租分类
    LeaseTypeModel.findAll( (err, doc) => {
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
                result: doc
            });
        }
    });
}

// exports
module.exports = leaseType;