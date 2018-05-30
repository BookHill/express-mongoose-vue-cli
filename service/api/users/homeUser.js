const UserModel = require('../../models/user');

// exports
module.exports = (req, res, next) => {
    // userId
    let _id = req.session.userId;
    if (!_id && _id!=0 ) {
        return res.json({
            status: 1,
            session: false,
            info: 'no session',
            result: ''
        });
    } else {
        UserModel.findId( _id, (err, doc) => {
            if (err) {
                return res.json({
                    status: 0,
                    session: true,
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
}