//消费schema
var consumeSchema = new mongoose.Schema({
    name: {type: String}, //消费者
    goods: {type: String}, //消费物品
    money: {type: Number}, //消费金额
    createtime: {type: String} //消费时间
});

//创建model,第三个参数是实际表名
var consumeModel = db.model("consume", consumeSchema, "consume");
module.exports = consumeModel;

