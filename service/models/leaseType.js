const mongoose = require('mongoose');
const db = require('./_db');

// Schema 结构
const LeaseTypeSchema = new mongoose.Schema({
    id: Number,
    placeType: Array,                        // 地方
    areaType: [{                             // 面积
        "bottom": Number,
        "top": Number
    }],                         
    moneyType: [{                            // 价格
        "bottom": Number,
        "top": Number
    }],
    tagType: Array                           // 标签
});

// 静态方法
LeaseTypeSchema.statics = {
        // top -> max
    TopMax: function(callback) {
        return this.findOne({}, { _id: 0, 'areaType.top': 1, 'moneyType.top': 1 })
            .exec(callback);
    },
    // --- 添加 ---
        // place
    createPlace: function(name, callback) {
        return this.update(
            {},
            { $push: {
                'placeType': {
                    $each: [name]
                }
            }}
        )
        .exec(callback);
    },
        // area
    createArea: function(bottom, top, callback) {
        return this.update(
            {},
            { $push: {
                'areaType': {
                    $each: [{bottom, top}]
                }
            }}
        )
        .exec(callback);
    },
        // money
    createMoney: function(bottom, top, callback) {
        return this.update(
            {},
            { $push: {
                'moneyType': {
                    $each: [{bottom, top}]
                }
            }}
        )
        .exec(callback);
    },
        // tag
    createTag: function(name, callback) {
        return this.update(
            {},
            { $push: {
                'tagType': {
                    $each: [name]
                }
            }}
        )
        .exec(callback);
    },
    // --- 删除 ---
        // place
    removePlace: function(place, callback) {
        return this.update(
                { 'placeType': place },
                { $pull: {'placeType': place} }
            )
            .exec(callback);
    },
        // area
    removeArea: function(area, callback) {
        return this.update(
                { 'areaType.bottom': area.bottom, 'areaType.top': area.top },
                { $pull: {'areaType': area} }
            )
            .exec(callback);
    },
        // money
    removeMoney: function(money, callback) {
        return this.update(
                { 'moneyType.bottom': money.bottom, 'moneyType.top': money.top },
                { $pull: {'moneyType': money} }
            )
            .exec(callback);
    },
        // tag
    removeTag: function(tag, callback) {
        return this.update(
                { 'tagType': tag },
                { $pull: {'tagType': tag} }
            )
            .exec(callback);
    },
    // --- 修改 ---
        // place
    updatePlace: function(old_name, name, callback) {
        return this.update(
                { 'placeType': old_name },
                { $set: {'placeType.$': name} }
            )
            .exec(callback);
    },
        // area
    updateArea: function(old_bottom, old_top, bottom, top, callback) {
        return this.update(
                { 'areaType.bottom': old_bottom, 'areaType.top': old_top },
                { $set: {'areaType.$': {bottom, top}} }
            )
            .exec(callback);
    },
        // money
    updateMoney: function(old_bottom, old_top, bottom, top, callback) {
        return this.update(
                { 'moneyType.bottom': old_bottom, 'moneyType.top': old_top },
                { $set: {'moneyType.$': {bottom, top}} }
            )
            .exec(callback);
    },
        // tag
    updateTag: function(old_name, name, callback) {
        return this.update(
                { 'tagType': old_name },
                { $set: {'tagType.$': name} }
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
        // place -> page
    findPlacePages: function(page, callback) {
        return this.findOne(
                {},
                {'placeType': {$slice: [parseInt(page)*10, 10]}}
            )
            .exec(callback);
    },
        // place -> index
    findPlace: function(index, callback) {
        return this.findOne(
                {},
                {'placeType': {$slice: [parseInt(index), 1]}}
            )
            .exec(callback);
    },
        // area -> page
    findAreaPages: function(page, callback) {
        return this.findOne(
                {},
                {'areaType': {$slice: [parseInt(page)*10, 10]}}
            )
            .exec(callback);
    },
        // area -> index
    findArea: function(index, callback) {
        return this.findOne(
                {},
                {'areaType': {$slice: [parseInt(index), 1]}}
            )
            .exec(callback);
    },
        // money -> page
    findMoneyPages: function(page, callback) {
        return this.findOne(
                {},
                {'moneyType': {$slice: [parseInt(page)*10, 10]}}
            )
            .exec(callback);
    },
        // money -> index
    findMoney: function(index, callback) {
        return this.findOne(
                {},
                {'moneyType': {$slice: [parseInt(index), 1]}}
            )
            .exec(callback);
    },
        // tag -> page
    findTagPages: function(page, callback) {
        return this.findOne(
                {},
                {'tagType': {$slice: [parseInt(page)*10, 10]}}
            )
            .exec(callback);
    },
        // tag -> index
    findTag: function(index, callback) {
        return this.findOne(
                {},
                {'tagType': {$slice: [parseInt(index), 1]}}
            )
            .exec(callback);
    }
}

// model
let LeaseTypeModel = db.model('leaseType', LeaseTypeSchema, 'leaseType');

// exports
module.exports = LeaseTypeModel;