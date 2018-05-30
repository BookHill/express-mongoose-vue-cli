const mongoose = require('mongoose');
const db = require('./_db');

// Schema 结构
const LeaseSchema = new mongoose.Schema({
    id: Number,
    linkman: Object,                    // 联系人
    placeType: String,                  // 所属地方
    areaType: Number,                   // 所属面积
    moneyType: Number,                  // 所属价格
    tagType: Array,                     // 所属标签
    thumbnail: String,                  // 缩略图
    images: Array,                      // 多图展示
    title: String,                      // 标题
    summary: String,                    // 摘要
    detail: String,                     // 资料
    content: String,                    // 内容
    map: {                              // 地图
        lng: Number,                        // 经度 
        lat: Number,                        // 纬度
        zoom: Number,                       // 级别 1~19
    },
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
LeaseSchema.statics = {
// --- doc ---
        // 返回all文档长度
    DocCount: function(callback) {
        return this.count({})
            .exec(callback);
    },
        // 返回type文档长度
    DocCountType: function(type, callback) {
        return this.count({ 'placeType': type })
            .exec(callback);
    },
        // all文档 -> 一页数据
    DocFindPages: function(page, callback) {
        return this.find(
                {},
                { _id: 0, id: 1, placeType:1, title: 1, release: 1, recom: 1 , updateTime: 1 }
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
            { _id: 0, id: 1, placeType:1, title: 1, release: 1, recom: 1 , updateTime: 1 }
        )
            .where('placeType').equals(type)
            .skip(page * 10)
            .limit(10)
            .sort('id')
            .exec(callback);
    },
// --- doc ---
        // 已发布 -> 返回type文档长度
    ByCountType: function(place, area, money, callback) {
        return this.count({release: true})
            .where(place)
            .where('areaType').gte(area.bottom).lte(area.top)
            .where('moneyType').gte(money.bottom).lte(money.top)
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
        // images
    updateImages: function(id, url, callback) {
        return this.update(
                {id},
                {$set: {'images': url}}
            )
            .exec(callback);
    },
    // --- 查询 ---
        // map -> 百度地图
    findMap: function(id, callback) {
        return this.findOne(
                { id },
                { _id: 0, map:1 }
            )
            .exec(callback);
    },
        // 一页数据
    findPages: function(place, area, money, page, sort, callback) {
        return this.find(
                { release: true },
                { _id: 0, id: 1, thumbnail: 1, title: 1, summary: 1, tagType: 1, moneyType: 1 }
            )
            .where(place)
            .where('areaType').gte(area.bottom).lte(area.top)
            .where('moneyType').gte(money.bottom).lte(money.top)
            .skip(page * 10)
            .limit(10)
            .sort({'moneyType': sort, 'id': 1})
            .exec(callback);
    },
        // id -> 单条数据
    findId: function(id, callback) {
        return this.findOne(
                { id },
                { _id: 0, userId: 0, release: 0, recom: 0, createTime: 0 }
            )
            .exec(callback);
    },
    // lease id -> 单条数据
    findLeaseId: function(id, callback) {
        return this.findOne(
                { id },
                { _id: 0, userId: 0, createTime: 0 }
            )
            .exec(callback);
    },
        // 仅返回数组 -> 推荐...
    findRecom: function(callback) {
        return this.find(
                { release: true, recom: true },
                { _id: 0, id: 1, thumbnail: 1, title: 1, placeType: 1, moneyType: 1 }
            )
            .sort('id')
            .exec(callback);
    }
}

// model
let LeaseModel = db.model('lease', LeaseSchema, 'leases');

// exports
module.exports = LeaseModel;