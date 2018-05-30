const mongoose = require('mongoose');
const db = require('./_db');

// Schema 结构
const UserSchema = new mongoose.Schema({
    id: Number,
    name: String, 
    password: String,
    status: {                       // 用户状态
        type: Boolean,
        default: true
    },                
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
UserSchema.statics = {
        // 返回文档长度
    ByCount: function(callback) {
        return this.count({ status: true })
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
        // status -> false
    removeId: function(id, callback) {
        return this.update(
            { id },
            { $set: {'status': false} }
        )
        .exec(callback);
    },
    // --- 修改 ---
        // user
    updateUser: function(id, name, password, callback) {
        return this.update(
                {id},
                {$set: {name, password}}
            )
            .exec(callback);
    },
    // --- 查询 ---
        // id
    findId: function(id, callback) {
        return this.findOne(
            { id },
            { _id: 0, id: 1, name: 1 }
        )
        .exec(callback);
    },
        // 用户
    findUser: function(name, password, callback) {
        return this.findOne(
                { status: true },
                { _id: 0, status: 0 }
            )
            .where('name').equals(name)
            .where('password').equals(password)
            .exec(callback);
    },
        // 一页数据
    findPages: function(page, callback) {
        return this.find(
                { status: true },
                { _id: 0, createTime: 0 }
            )
            .skip(page * 10 + 1)            // 跳过指定数据
            .limit(10)                      // 读取指定数据
            .sort('id')                     // 排序
            .exec(callback);                // 将查询结果传入回调函数callback
    }
}

// model
let UserModel = db.model('user', UserSchema, 'users');

// exports
module.exports = UserModel;