var blogModel = require('../mongo/blog');
var labelModel = require('../mongo/label');
var comm = require('../lib/comm');
var moment = require('moment');
var router = express.Router();
//新建博客
router.post('/blogCreate', function (req, res, next) {
    blogModel.create(req.body, function (err, doc) {
        if (err) return res.jsonp(false);
        var labels = req.body.labels.split(',');
        labels.forEach(function (label) {
            labelModel.create({blogid: doc._id, label: label}, function (err, doc) {
                if (err) return res.jsonp(false);
            })
        })
        return res.jsonp(true);
    })
});

//更新博客标签
router.post('/blogUpdate', function (req, res, next) {
    var labels = req.body.labels.split(',');
    labels.forEach(function (label) {
        labelModel.create({blogid: req.body.id, label: label}, function (err, doc) {
            if (err) return res.jsonp(false);
        })
    })
    return res.jsonp(true);
});

//根据标签获取博客列表
router.get('/blogListByLabel', function (req, res, next) {
    labelModel.find({label: req.query.label}).populate('blogid').exec(function (err, blogs) {
        if (err) return res.jsonp(false);
        res.jsonp(blogs);
    })
})

//获取标签列表
router.get('/labelList', function (req, res, next) {
    labelModel.aggregate([
        {$group: {_id: "$label", num_tutorial: {$sum: 1}}}
    ], function (err, label) {
        if (err) return res.jsonp(false);
        res.jsonp(label);
    })
})

//获取博客列表
router.get("/blogList", function (req, res, next) {
    blogModel.find({}, {title: 1, abstract: 1, _id: 1, createtime: 1}, {sort: {createtime: -1}}, function (err, docs) {
        if (err) return res.jsonp(false);
        res.jsonp(docs);
    })
});

//获取博客明细
router.get("/blogContent", function (req, res, next) {
    blogModel.findById(req.query.id, function (err, docs) {
        res.jsonp(docs);
    })
})

//删除标签明细
router.get("/delLabel", function (req, res, next) {
    labelModel.remove({blogid: req.query.id}, function (err) {
        if (err) return res.jsonp(false);
        res.jsonp(true);
    })
})
module.exports = router;
