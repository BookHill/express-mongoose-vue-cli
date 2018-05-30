const LeaseModel = require('../../models/lease');
const LeaseTypeModel = require('../../models/leaseType');

// find -> map
exports._map = (req, res, next) => {
    let _id = req.body.id;
    LeaseModel.findMap( _id, (err, doc) => {
        if (err) {
            return res.json({
                status: 0,
                info: err,
                result: ''
            });
        } else {
            return res.json({
                status: 1,
                info: 'success',
                result: doc
            });
        }
    });
}

// find -> id
exports._find = (req, res, next) => {
    let _params = req.body.params           // Obj 参数
    let _page = --_params.page;             // _page -> 页数（0）
    let _sort = _params.sort;               // _sort -> 价格排序
    let _place = {}                         // 地方
    let _area = { bottom: 0, top: 0 };      // 面积范围
    let _money = { bottom: 0, top: 0 };     // 价格范围

    LeaseTypeModel.TopMax( (err, doc) => {
        let areaArr = [], moneyArr = [];
        for (let area of doc.areaType) {
            areaArr.push(area.top);
        }
        for (let money of doc.moneyType) {
            moneyArr.push(money.top);
        }
        _area.top = Math.max.apply(null, areaArr);    // area -> max
        _money.top = Math.max.apply(null, moneyArr);  // money -> max
        // to do ...
        if (_params.type.position != 'allType') {
            _place.placeType = _params.type.position;
        }
        if (_params.type.area != 'allType') {
            _area.bottom = _params.type.area.bottom;
            _area.top = _params.type.area.top;
        }
        if (_params.type.rental != 'allType') {
            _money.bottom = _params.type.rental.bottom;
            _money.top = _params.type.rental.top;
        }
        // to do ...
        LeaseModel.ByCountType( _place, _area, _money, (err, count) => {
            // count -> 文档长度; all -> 总页数 (初始值1)
            let all = Math.ceil( parseInt(count)/10 );
            LeaseModel.findPages( _place, _area, _money, _page, _sort, (err, doc) => {
                if (err || doc == null) {
                    return res.json({
                        status: null,
                        info: err,
                        result: doc
                    });
                } else {
                    return res.json({
                        status: 1,
                        info: 'success',
                        result: {
                            count: all,
                            current: _page+1,
                            doc: doc
                        }
                    });
                }
            });
        });
    });
}