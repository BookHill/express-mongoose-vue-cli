const UserModel = require('../../models/user');
const multiparty = require('multiparty');
const crypto = require('crypto');               // 加密算法

// 增加 create
exports._create = (req, res, next) => {
    let FileData = new multiparty.Form();
    FileData.parse(req, function(err, fields, files) {
        let form = {};
        let _password = fields.password[0];     // password

        // 第一次 加密
        const hash = crypto.createHash('md5');
        const md5 = hash.update(_password).digest('hex');
        const new_md5 = md5.split('').reverse().join('');
        // 第二次 加密
        const new_hash = crypto.createHash('md5');
        const _md5_password_ = new_hash.update(new_md5).digest('hex');

        form.name = fields.name[0];             // name
        form.password = _md5_password_;         // password

        UserModel.ById( (err, doc) => {
            // doc.id -> max id (id++)
            try {
                form.id = doc.id + 1;
            } catch(e) {
                form.id = 0;
            }
            let AddEntity = new UserModel(form);
            AddEntity.save( (err, doc) => {
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
                        result: ''
                    });
                }
            });
        });
    });
}

// 删除 delete
exports._delete = (req, res, next) => {
    let _id = req.body.params.id;
    UserModel.removeId( _id, (err, doc) => {
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

// 修改 update
exports._update = (req, res, next) => {
    let FileData = new multiparty.Form();
    FileData.parse(req, function(err, fields, files) {
        let _id = fields.id[0];                 // id
        let _name = fields.name[0];             // name
        let _password = fields.password[0];     // password

        // 第一次 加密
        const hash = crypto.createHash('md5');
        const md5 = hash.update(_password).digest('hex');
        const new_md5 = md5.split('').reverse().join('');
        // 第二次 加密
        const new_hash = crypto.createHash('md5');
        const _md5_password_ = new_hash.update(new_md5).digest('hex');

        UserModel.updateUser( _id, _name, _md5_password_, (err, doc) => {
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
    UserModel.ByCount( (err, count) => {
        // count -> 文档长度; all -> 总页数 (初始值1)
        let all = Math.ceil( parseInt(count)/10 );
        UserModel.findPages( _page, (err, doc) => {
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
    let FileData = new multiparty.Form();
    FileData.parse(req, function(err, fields, files) {
        let _id = fields.id[0];             // user -> id
        UserModel.findId( _id, (err, doc) => {
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
    });
}