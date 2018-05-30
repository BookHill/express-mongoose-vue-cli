const mongoose = require('mongoose');
const db = require('./_db');

// Schema 结构
const SystemSchema = new mongoose.Schema({
    id: Number,
    icon: String,                         // 小图标
    logo: String,                         // logo
    h1: String,                           // h1
    message: {                            // 联系信息                         
        name: String,
        tel: String,
        email: String
    },
    friendlyLink: [{                      // 友情链接
        name: String,
        url: String
    }],
    copyright: String,                    // 版权
    SEO: {
        title: String,
        keywords: String,
        description: String
    }
});

// 静态方法
SystemSchema.statics = {
    // --- 添加 ---
    createLinks: function(name, url, callback) {
        return this.update(
            {},
            { $push: {
                'friendlyLink': {
                    $each: [{name, url}]
                }
            }}
        )
        .exec(callback);
    },
    // --- 删除 ---
    removeLinks: function(name, url, callback) {
        return this.update(
                {},
                {$pull: {'friendlyLink': {name, url}}}
            )
            .exec(callback);
    },
    // --- 修改 ---
        // all
    updateAll:function(obj, callback) {
        return this.update(
            {},
            {$set: obj}
        )
        .exec(callback);
    },
        // logo
    updateLogo: function(url, callback) {
        return this.update(
                {},
                {$set: {'logo': url}}
            )
            .exec(callback);
    },
        // icon
    updateIcon: function(url, callback) {
        return this.update(
                {},
                {$set: {'icon': url}}
            )
            .exec(callback);
    },
        // links
    updateLinks: function(index, new_name, new_url, callback) {
        return this.update(
                {},
                { $push: {
                    'friendlyLink': {
                        $each: [{'name': new_name, 'url': new_url}],
                        $position: parseInt(index)  // 下标 -> 添加
                    }
                }}
            )
            .exec(callback);
    },
    // --- 查询 ---
        // all
    findAll: function(callback) {
        return this.findOne({}, { _id: 0, id: 0 })
            .sort('id')
            .exec(callback);
    },
        // links -> page
    findLinks: function(callback) {
        return this.findOne(
                {},
                { _id: 0, friendlyLink: 1 }
            )
            .exec(callback);
    },
        // links -> 索引
    findLinksIndex: function(index, callback) {
        return this.findOne(
                {},
                {'friendlyLink': {$slice: [parseInt(index), 1]}}
            )
            .exec(callback);
    }
}

// model
let SystemModel = db.model('system', SystemSchema, 'systems');

// exports
module.exports = SystemModel;