const UserModel = require('../../models/user');
const multiparty = require('multiparty');
const crypto = require('crypto');                               // 加密算法

// exports
module.exports = (req, res, next) => {
    let FileData = new multiparty.Form();
    FileData.parse(req, function(err, fields, files) {

        let _name = fields.name[0];                             // 用户名
        let _password = fields.password[0];                     // 密码

        // 第一次 加密
        const hash = crypto.createHash('md5');
        const md5 = hash.update(_password).digest('hex');
        const new_md5 = md5.split('').reverse().join('');
        // 第二次 加密
        const new_hash = crypto.createHash('md5');
        const _md5_password_ = new_hash.update(new_md5).digest('hex');

        UserModel.findUser( _name, _md5_password_, (err, doc) => {
            if (err) {
                return res.json({
                    status: 0,
                    session: false,
                    info: err,
                    result: ''
                });
            } else {
                try {
                    // 用户和密码正确
                    req.session.userId = doc.id;    //  设置session -> userId
                    return res.json({
                        status: 1,
                        session: true,
                        info: 'success',
                        result: {
                            id: doc.id,
                            name: doc.name
                        }
                    });
                } catch(e) {
                    // 用户或密码不对，doc -> null
                    return res.json({
                        status: 0,
                        session: false,
                        info: '用户名或密码出错！',
                        result: ''
                    });
                }
            }
        });
    });
}