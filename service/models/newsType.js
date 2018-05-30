const mongoose = require('mongoose');
const db = require('./_db');

// Schema 结构
const NewsTypeSchema = new mongoose.Schema({
    id: Number,
    newsType: [{                            // 新闻类型
        typeId: Number,
        name: String
    }]
});

// 静态方法
NewsTypeSchema.statics = {
        // 倒序找id -> id++
    ById: function(callback) {
        return this.findOne(
                {},
                {'newsType': {$slice: -1}}
            )
            .exec(callback);
    },
    // --- 添加 ---
    createNewsType: function(typeId, name, callback) {
        return this.update(
            {},
            { $push: {
                'newsType': {
                    $each: [{typeId, name}]
                }
            }}
        )
        .exec(callback);
    },
    // --- 删除 ---
        // type
    removeType: function(typeId, callback) {
        return this.update(
                {'newsType.typeId': typeId},
                {$pull: {'newsType': {typeId}}}
            )
            .exec(callback);
    },
    // --- 修改 ---
        // NewsType
    updateNewsType: function(typeId, name, callback) {
        return this.update(
                { 'newsType.typeId': typeId },
                { $set: {'newsType.$.name': name} }
            )
            .exec(callback);
    },
    // --- 查询 ---
        // all
    findAll: function(callback) {
        return this.findOne()
            .sort('id')
            .exec(callback);
    },
        // typeId
    findTypeId: function(typeId, callback) {
        return this.findOne(
            { 'newsType.typeId': typeId },
            { _id: 0, 'newsType.$': 1 }
        )
        .exec(callback);
    }
}

// model
let NewsTypeModel = db.model('newsType', NewsTypeSchema, 'newsType');

// exports
module.exports = NewsTypeModel;