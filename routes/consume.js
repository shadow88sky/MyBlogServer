var consumeModel = require('../mongo/consume');
var comm = require('../lib/comm');
var moment = require('moment');
var router = express.Router();
//输入消费数据
router.post('/consumeCreate', function (req, res, next) {
    consumeModel.create(req.body, function (err, doc) {
        console.log(doc);
        if (err) return res.jsonp(false);
        return res.jsonp(true);
    })
});

//获取消费记录
router.get("/consumeList", function (req, res, next) {
    var dateFrom = req.query.dateFrom;
    var dateEnd = req.query.dateEnd;
    var options = {};
    if (dateFrom && dateEnd) {
        options.createtime = {"$gte": comm.transdate(dateFrom), "$lte": comm.transdate(dateEnd)};
    } else if (dateEnd) {
        options.createtime = {"$lte": comm.transdate(dateEnd)};
    } else if (dateFrom) {
        options.createtime = {"$gte": comm.transdate(dateFrom)};
    } else {
        options.createtime = {"$gte": comm.transdate(moment().format('YYYY-MM')), "$lte": comm.transdate(moment().endOf('month').format('YYYY-MM-DD'))};
    }
    consumeModel.find(options, function (err, docs) {
        res.jsonp(docs);
    })
});

//删除消费记录
router.post("/consumeDelete",function(req,res,next){
    consumeModel.remove(req.body,function(err){
        if(err) return res.jsonp(false);
        res.jsonp(true);
    })
})
module.exports = router;
