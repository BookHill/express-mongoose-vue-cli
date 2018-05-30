const MessageModel = require('../../models/message');

let message = (req, res, next) => {
    let form = req.body.formData;
    MessageModel.ById( (err, doc) => {
        // doc.id -> max id (id++)
        try {
            form.id = doc.id + 1;
        } catch(e) {
            form.id = 0;    // console.log(e.name + ": " + e.message);
        }
        let AddEntity = new MessageModel(form);
        AddEntity.save( (err, doc) => {
            if (err) {
                return res.json({
                    status: 0,
                    info: err,
                    result: '提交失败！请稍后再试...'
                });
            } else {
                return res.json({
                    status: 1,
                    info: 'success',
                    result: '提交成功！'
                });
            }
        });
    });
}

// exports
module.exports = message;