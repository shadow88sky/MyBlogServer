global.express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

//连接MongoDB
global.mongoose = require("mongoose");
global.db = mongoose.connect("mongodb://127.0.0.1:27017/home");
db.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});

//引用中间件，用来获取post的数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//解决跨域问题
app.use('/*', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

//静态路由
app.use(express.static(path.join(__dirname, 'public')));

//加载路由
app.use(require('./routes/consume'));
app.use(require('./routes/blog'));

app.listen(3000, function () {
    console.log("开启3000端口");
})
