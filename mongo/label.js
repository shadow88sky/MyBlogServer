//标签表
var labelSchema = new mongoose.Schema({
    blogid: {type: mongoose.Schema.Types.ObjectId, ref: 'blog'},//关联id
    label: {type: String} //标签名
});

//创建model,第三个参数是实际表名
var labelModel = db.model("label", labelSchema, "label");
module.exports = labelModel;
