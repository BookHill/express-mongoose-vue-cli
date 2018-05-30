const mongoose = require('mongoose');
const db = require('./_db');

// Schema 结构
const NewsSchema = new mongoose.Schema({
    id: Number,
    author: String,                     // 作者
    newsType: String,                   // 所属类型
    thumbnail: String,                  // 缩略图
    title: String,                      // 标题
    summary: String,                    // 摘要
    content: String,                    // 内容
    SEO: {
        title: String,
        keywords: String,
        description: String
    },
    userId: {                           // 用户id
        type: Number,
        default: 0
    },
    release: Boolean,                   // 是否发布
    recom: Boolean,                     // 是否推荐
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
NewsSchema.statics = {
// --- doc ---
        // 返回all文档长度
    DocCount: function(callback) {
        return this.count({})
            .exec(callback);
    },
        // 返回type文档长度
    DocCountType: function(type, callback) {
        return this.count({ 'newsType': type })
            .exec(callback);
    },
        // all文档 -> 一页数据
    DocFindPages: function(page, callback) {
        return this.find(
                {},
                { _id: 0, id: 1, newsType: 1, title: 1, release: 1, recom: 1, updateTime: 1 }
            )
            .skip(page * 10)
            .limit(10)
            .sort('id')
            .exec(callback);
    },
    // all文档分类 -> 一页数据
    DocFindPage: function(type, page, callback) {
        return this.find(
                {},
                { _id: 0, id: 1, newsType: 1, title: 1, release: 1, recom: 1, updateTime: 1 }
            )
            .where('newsType').equals(type)
            .skip(page * 10)
            .limit(10)
            .sort('id')
            .exec(callback);
    },
// --- doc ---
        // 已发布 -> 返回文档长度
    ByCount: function(callback) {
        return this.count({release: true})
            .exec(callback);
    },
        // 已发布 -> 返回type文档长度
    ByCountType: function(type, callback) {
        return this.count({release: true, newsType: type })
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
    // --- 修改 ---
        // all
    updateAll:function( id, obj, callback) {
        return this.update(
            { id },
            { $set: obj }
        )
        .exec(callback);
    },
        // thumbnail
    updateThumbnail: function(id, url, callback) {
        return this.update(
                {id},
                {$set: {'thumbnail': url}}
            )
            .exec(callback);
    },
    // --- 查询 ---
        // 全部分类 -> 一页数据
    findPages: function(page, callback) {
        return this.find(                   // 已发布(去掉_id、用户id、发布、推荐)
                { release: true },
                { _id: 0, id: 1, thumbnail: 1, title: 1, summary: 1 }
            )
            .skip(page * 10)                // 跳过指定数据
            .limit(10)                      // 读取指定数据
            .sort('id')                     // 排序
            .exec(callback);                // 将查询结果传入回调函数callback
    },
        // 分类 -> 一页数据
    findPage: function(type, page, callback) {
        return this.find(
                { release: true },
                { _id: 0, id: 1, thumbnail: 1, title: 1, summary: 1 }
            )
            .where('newsType').equals(type)
            .skip(page * 10)
            .limit(10)
            .sort('id')
            .exec(callback);
    },
        // 仅返回数组 -> 全部id
    findIdTypes: function(callback) {
        return this.find(
                { release: true },
                { _id: 0, id: 1, title: 1 }
            )
            .sort('id')
            .exec(callback);
    },
        // 仅返回数组 -> 指定字段id
    findIdType: function(type, callback) {
        return this.find(
                { release: true, newsType: type },
                { _id: 0, id: 1, title: 1 }
            )
            .sort('id')
            .exec(callback);
    },
        // id -> 单条数据
    findId: function(id, callback) {
        return this.findOne(
                { id },
                { _id: 0, newsType: 0, userId: 0, createTime: 0, release: 0, recom: 0 }
            )
            .exec(callback);
    },
        // news id -> 单条数据
    findNewsId: function(id, callback) {
        return this.findOne(
                { id },
                { _id: 0, userId: 0, createTime: 0 }
            )
            .exec(callback);
    },
        // 仅返回数组 -> 推荐id、title
    findRecom: function(callback) {
        return this.find(
                { release: true, recom: true },
                { _id: 0, id: 1, title: 1 }
            )
            .sort('id')
            .exec(callback);
    }
}

// model
let NewsModel = db.model('news', NewsSchema, 'news');

// exports
module.exports = NewsModel;