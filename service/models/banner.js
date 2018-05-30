const mongoose = require('mongoose');
const db = require('./_db');

// Schema 结构
const BannerSchema = new mongoose.Schema({
    id: Number,
    bannerType: String,                   // 类型
    img: {                                // 图片
        alt : String,
        name : String
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
BannerSchema.statics = {
        // 返回文档长度
    ByCount: function(callback) {
        return this.count({})
            .exec(callback);
    },
    // --- 修改 ---
        // alt
    updateAlt:function(id, alt, callback) {
        return this.update(
            {id},
            {$set: {'img.alt': alt}}
        )
        .exec(callback);
    },
        // banner
    updateBanner: function(id, url, callback) {
        return this.update(
                {id},
                {$set: {'img.name': url}}
            )
            .exec(callback);
    },
    // --- 查询 ---
        // id
    findId: function(id, callback) {
        return this.findOne(
            { id },
            { _id: 0 }
        )
        .exec(callback);
    },
        // banner类型
    findType: function(type, callback) {
        return this.findOne(
                { bannerType: type },
                { _id: 0, img: 1 }
            )
            .exec(callback);
    },
        // 一页数据
    findPages: function(page, callback) {
        return this.find(
                {},
                { _id: 0, createTime: 0, __v: 0 }
            )
            .skip(page * 10)                // 跳过指定数据
            .limit(10)                      // 读取指定数据
            .sort('id')                     // 排序
            .exec(callback);                // 将查询结果传入回调函数callback
    }
}

// model
let BannerModel = db.model('banner', BannerSchema, 'banners');

// exports
module.exports = BannerModel;