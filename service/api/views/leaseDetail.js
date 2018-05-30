const LeaseModel = require('../../models/lease');

let leaseDetail = (req, res, next) => {
    let _id = req.body.id;              // _id -> 出租id
    LeaseModel.findId( _id, (err, doc) => {
        if (err || doc == null) {
            return res.json({
                status: null,
                info: err,
                result: doc
            });
        }
        LeaseModel.findRecom( (err, recom) => {
            let _recom = getRandomArrayElements(recom, 3);
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
                    result: {
                        recom: _recom,
                        doc 
                    }
                });
            }
        });
    });
    // 随机数组中随机取几个元素
    function getRandomArrayElements(arr, count) {
        let shuffled=arr.slice(0), i=arr.length, min=i-count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }
}

// exports
module.exports = leaseDetail;