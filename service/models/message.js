const mongoose = require('mongoose');
const db = require('./_db');

// Schema 结构
const MessageSchema = new mongoose.Schema({
    id: {
        type: Number,
        default: 0,
    },
    name: String,
    tel: String,
    content: String,
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
},{
    versionKey: false,
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }
});

// 静态方法
MessageSchema.statics = {
        // 返回文档长度
    ByCount: function(callback) {
        return this.count({})
            .exec(callback);
    },
        // 倒序找id -> id++
    ById: function(callback) {
        return this.findOne({}, { _id: 0, id:1 })
            .sort({'id': -1})
            .limit(1)
            .exec(callback);
    },
    // --- 删除 ---
    removeId: function(id, callback) {
        return this.remove({ id })
            .exec(callback);
    },
    // --- 查询 ---
        // id -> 单条数据
    findId: function(id, callback) {
        return this.findOne(
                { id },
                { _id: 0, createTime: 0 }
            )
            .exec(callback);
    },
        // 一页数据
    findPages: function(page, callback) {
        return this.find(
                {},
                { _id: 0, createTime: 0 }
            )
            .skip(page * 10)                // 跳过指定数据
            .limit(10)                      // 读取指定数据
            .sort('id')                     // 排序
            .exec(callback);                // 将查询结果传入回调函数callback
    }
}

// model
let MessageModel = db.model('message', MessageSchema, 'messages');

// exports
module.exports = MessageModel;