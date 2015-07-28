//博客schema
var blogSchema = new mongoose.Schema({
    title: {type: String}, //博客题目
    abstract: {type: String}, //摘要
    content: {type: String}, //文章内容
    click: {type: Number},//点击量
    createtime: {type: String} //消费时间
})

//创建model,第三个参数是实际表名
var blogModel = db.model("blog", blogSchema, "blog");
module.exports = blogModel;

