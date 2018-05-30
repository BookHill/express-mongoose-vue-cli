const LeaseTypeModel = require('../../models/leaseType');
const multiparty = require('multiparty');

// place
    // 增加 create
    exports._place_create = (req, res, next) => {
        let FileData = new multiparty.Form();
        FileData.parse(req, function(err, fields, files) {
            let _name = fields.name[0];         // name
            LeaseTypeModel.createPlace( _name, (err, doc) => {
                if (err) {
                    return res.json({
                        status: 0,
                        session: false,
                        info: err,
                        result: ''
                    });
                } else {
                    return res.json({
                        status: 1,
                        session: true,
                        info: 'success',
                        result: doc
                    });
                }
            });
        });
    }
    // 删除 delete
    exports._place_delete = (req, res, next) => {
        let _place = req.body.params.id;
        LeaseTypeModel.removePlace( _place, (err, doc) => {
            if (err) {
                return res.json({
                    status: 0,
                    session: false,
                    info: err,
                    result: ''
                });
            } else {
                return res.json({
                    status: 1,
                    session: true,
                    info: 'success',
                    result: doc
                });
            }
        });
    }
    // 修改 update
    exports._place_update = (req, res, next) => {
        let FileData = new multiparty.Form();
        FileData.parse(req, function(err, fields, files) {
            let _index = fields.id[0];
            let _name = fields.name[0];
            LeaseTypeModel.findPlace( _index, (err, doc) => {
                let _old_name = doc.placeType[0];
                LeaseTypeModel.updatePlace( _old_name, _name, (err, doc) => {
                    if (err) {
                        return res.json({
                            status: 0,
                            session: false,
                            info: err,
                            result: ''
                        });
                    } else {
                        return res.json({
                            status: 1,
                            session: true,
                            info: 'success',
                            result: doc
                        });
                    }
                });
            });
        });
    }
    // 查询 find
    exports._place_find = (req, res, next) => {
        let _page = --req.body.params.page;         // _page -> 页数（0）
        LeaseTypeModel.findAll( (err, doc) => {
            // count -> 文档长度; all -> 总页数 (初始值1)
            let count = doc.placeType.length;
            let all = Math.ceil( parseInt(count)/10 );
            LeaseTypeModel.findPlacePages( _page, (err, doc) => {
                if (err) {
                    return res.json({
                        status: 0,
                        session: false,
                        info: err,
                        result: ''
                    });
                } else {
                    return res.json({
                        status: 1,
                        session: true,
                        info: 'success',
                        result: {
                            count: all,
                            current: _page+1,
                            doc: doc.placeType
                        }
                    });
                }
            });
        });
    }
    // 查询 find -> detail
    exports._place_detail = (req, res, next) => {
        let FileData = new multiparty.Form();
        FileData.parse(req, function(err, fields, files) {
            let _index = fields.id[0];             // index
            LeaseTypeModel.findPlace( _index, (err, doc) => {
                if (err || doc.placeType.length==0) {
                    return res.json({
                        status: 0,
                        session: false,
                        info: err,
                        result: ''
                    });
                } else {
                    return res.json({
                        status: 1,
                        session: true,
                        info: 'success',
                        result: doc.placeType[0]
                    });
                }
            });
        });
    }

// area
    // 增加 create
    exports._area_create = (req, res, next) => {
        let FileData = new multiparty.Form();
        FileData.parse(req, function(err, fields, files) {
            let _bottom = fields.bottom[0];         // bottom
            let _top = fields.top[0];               // top
            LeaseTypeModel.createArea( _bottom, _top, (err, doc) => {
                if (err) {
                    return res.json({
                        status: 0,
                        session: false,
                        info: err,
                        result: ''
                    });
                } else {
                    return res.json({
                        status: 1,
                        session: true,
                        info: 'success',
                        result: doc
                    });
                }
            });
        });
    }
    // 删除 delete
    exports._area_delete = (req, res, next) => {
        let _area = req.body.params;
        LeaseTypeModel.removeArea( _area, (err, doc) => {
            if (err) {
                return res.json({
                    status: 0,
                    session: false,
                    info: err,
                    result: ''
                });
            } else {
                return res.json({
                    status: 1,
                    session: true,
                    info: 'success',
                    result: doc
                });
            }
        });
    }
    // 修改 update
    exports._area_update = (req, res, next) => {
        let FileData = new multiparty.Form();
        FileData.parse(req, function(err, fields, files) {
            let _index = fields.id[0];
            let _bottom = fields.bottom[0];
            let _top = fields.top[0];
            LeaseTypeModel.findArea( _index, (err, doc) => {
                let _old_bottom = doc.areaType[0].bottom;
                let _old_top = doc.areaType[0].top;
                LeaseTypeModel.updateArea( _old_bottom, _old_top, _bottom, _top, (err, doc) => {
                    if (err) {
                        return res.json({
                            status: 0,
                            session: false,
                            info: err,
                            result: ''
                        });
                    } else {
                        return res.json({
                            status: 1,
                            session: true,
                            info: 'success',
                            result: doc
                        });
                    }
                });
            });
        });
    }
    // 查询 find
    exports._area_find = (req, res, next) => {
        let _page = --req.body.params.page;         // _page -> 页数（0）
        LeaseTypeModel.findAll( (err, doc) => {
            // count -> 文档长度; all -> 总页数 (初始值1)
            let count = doc.areaType.length;
            let all = Math.ceil( parseInt(count)/10 );
            LeaseTypeModel.findAreaPages( _page, (err, doc) => {
                if (err) {
                    return res.json({
                        status: 0,
                        session: false,
                        info: err,
                        result: ''
                    });
                } else {
                    return res.json({
                        status: 1,
                        session: true,
                        info: 'success',
                        result: {
                            count: all,
                            current: _page+1,
                            doc: doc.areaType
                        }
                    });
                }
            });
        });
    }
    // 查询 find -> detail
    exports._area_detail = (req, res, next) => {
        let FileData = new multiparty.Form();
        FileData.parse(req, function(err, fields, files) {
            let _index = fields.id[0];             // index
            LeaseTypeModel.findArea( _index, (err, doc) => {
                if (err || doc.areaType.length==0) {
                    return res.json({
                        status: 0,
                        session: false,
                        info: err,
                        result: ''
                    });
                } else {
                    return res.json({
                        status: 1,
                        session: true,
                        info: 'success',
                        result: doc.areaType[0]
                    });
                }
            });
        });
    }

// money
    // 增加 create
    exports._money_create = (req, res, next) => {
        let FileData = new multiparty.Form();
        FileData.parse(req, function(err, fields, files) {
            let _bottom = fields.bottom[0];         // bottom
            let _top = fields.top[0];               // top
            LeaseTypeModel.createMoney( _bottom, _top, (err, doc) => {
                if (err) {
                    return res.json({
                        status: 0,
                        session: false,
                        info: err,
                        result: ''
                    });
                } else {
                    return res.json({
                        status: 1,
                        session: true,
                        info: 'success',
                        result: doc
                    });
                }
            });
        });
    }
    // 删除 delete
    exports._money_delete = (req, res, next) => {
        let _money = req.body.params;
        LeaseTypeModel.removeMoney( _money, (err, doc) => {
            if (err) {
                return res.json({
                    status: 0,
                    session: false,
                    info: err,
                    result: ''
                });
            } else {
                return res.json({
                    status: 1,
                    session: true,
                    info: 'success',
                    result: doc
                });
            }
        });
    }
    // 修改 update
    exports._money_update = (req, res, next) => {
        let FileData = new multiparty.Form();
        FileData.parse(req, function(err, fields, files) {
            let _index = fields.id[0];
            let _bottom = fields.bottom[0];
            let _top = fields.top[0];
            LeaseTypeModel.findMoney( _index, (err, doc) => {
                let _old_bottom = doc.moneyType[0].bottom;
                let _old_top = doc.moneyType[0].top;
                LeaseTypeModel.updateMoney( _old_bottom, _old_top, _bottom, _top, (err, doc) => {
                    if (err) {
                        return res.json({
                            status: 0,
                            session: false,
                            info: err,
                            result: ''
                        });
                    } else {
                        return res.json({
                            status: 1,
                            session: true,
                            info: 'success',
                            result: doc
                        });
                    }
                });
            });
        });
    }
    // 查询 find
    exports._money_find = (req, res, next) => {
        let _page = --req.body.params.page;         // _page -> 页数（0）
        LeaseTypeModel.findAll( (err, doc) => {
            // count -> 文档长度; all -> 总页数 (初始值1)
            let count = doc.moneyType.length;
            let all = Math.ceil( parseInt(count)/10 );
            LeaseTypeModel.findMoneyPages( _page, (err, doc) => {
                if (err) {
                    return res.json({
                        status: 0,
                        session: false,
                        info: err,
                        result: ''
                    });
                } else {
                    return res.json({
                        status: 1,
                        session: true,
                        info: 'success',
                        result: {
                            count: all,
                            current: _page+1,
                            doc: doc.moneyType
                        }
                    });
                }
            });
        });
    }
    // 查询 find -> detail
    exports._money_detail = (req, res, next) => {
        let FileData = new multiparty.Form();
        FileData.parse(req, function(err, fields, files) {
            let _index = fields.id[0];             // index
            LeaseTypeModel.findMoney( _index, (err, doc) => {
                if (err || doc.moneyType.length==0) {
                    return res.json({
                        status: 0,
                        session: false,
                        info: err,
                        result: ''
                    });
                } else {
                    return res.json({
                        status: 1,
                        session: true,
                        info: 'success',
                        result: doc.moneyType[0]
                    });
                }
            });
        });
    }

// tag
    // 增加 create
    exports._tag_create = (req, res, next) => {
        let FileData = new multiparty.Form();
        FileData.parse(req, function(err, fields, files) {
            let _name = fields.name[0];         // name
            LeaseTypeModel.createTag( _name, (err, doc) => {
                if (err) {
                    return res.json({
                        status: 0,
                        session: false,
                        info: err,
                        result: ''
                    });
                } else {
                    return res.json({
                        status: 1,
                        session: true,
                        info: 'success',
                        result: doc
                    });
                }
            });
        });
    }
    // 删除 delete
    exports._tag_delete = (req, res, next) => {
        let _tag = req.body.params.id;
        LeaseTypeModel.removeTag( _tag, (err, doc) => {
            if (err) {
                return res.json({
                    status: 0,
                    session: false,
                    info: err,
                    result: ''
                });
            } else {
                return res.json({
                    status: 1,
                    session: true,
                    info: 'success',
                    result: doc
                });
            }
        });
    }
    // 修改 update
    exports._tag_update = (req, res, next) => {
        let FileData = new multiparty.Form();
        FileData.parse(req, function(err, fields, files) {
            let _index = fields.id[0];
            let _name = fields.name[0];
            LeaseTypeModel.findTag( _index, (err, doc) => {
                let _old_name = doc.tagType[0];
                LeaseTypeModel.updateTag( _old_name, _name, (err, doc) => {
                    if (err) {
                        return res.json({
                            status: 0,
                            session: false,
                            info: err,
                            result: ''
                        });
                    } else {
                        return res.json({
                            status: 1,
                            session: true,
                            info: 'success',
                            result: doc
                        });
                    }
                });
            });
        });
    }
    // 查询 find
    exports._tag_find = (req, res, next) => {
        let _page = --req.body.params.page;         // _page -> 页数（0）
        LeaseTypeModel.findAll( (err, doc) => {
            // count -> 文档长度; all -> 总页数 (初始值1)
            let count = doc.tagType.length;
            let all = Math.ceil( parseInt(count)/10 );
            LeaseTypeModel.findTagPages( _page, (err, doc) => {
                if (err) {
                    return res.json({
                        status: 0,
                        session: false,
                        info: err,
                        result: ''
                    });
                } else {
                    return res.json({
                        status: 1,
                        session: true,
                        info: 'success',
                        result: {
                            count: all,
                            current: _page+1,
                            doc: doc.tagType
                        }
                    });
                }
            });
        });
    }
    // 查询 find -> detail
    exports._tag_detail = (req, res, next) => {
        let FileData = new multiparty.Form();
        FileData.parse(req, function(err, fields, files) {
            let _index = fields.id[0];             // index
            LeaseTypeModel.findTag( _index, (err, doc) => {
                if (err || doc.tagType.length==0) {
                    return res.json({
                        status: 0,
                        session: false,
                        info: err,
                        result: ''
                    });
                } else {
                    return res.json({
                        status: 1,
                        session: true,
                        info: 'success',
                        result: doc.tagType[0]
                    });
                }
            });
        });
    }