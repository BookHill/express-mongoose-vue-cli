const mongoose = require('mongoose');                   // mongoose
      mongoose.connect('mongodb://localhost/lease');    // 创建数据库连接

let db = mongoose.connection;
    db.once('open', () => {
        console.log( '连接数据库成功' );
    });
    db.on('error', (error) => {
        console.error( 'Mongoose Error: ' + error );
    });
    db.on('close', () => {
        console.log( '数据库断开' );
    });

// exports
module.exports = db;