var mongoose = require('./mongoose');

var Schema = mongoose.Schema;

var objSchema = new Schema({
    //订单编号
    "orderNum":{
        "type":String,
        "required":true
    },
    //商品id
    "productId":{
        "type":String,
        "required":true
    },
    //创建时间
    "createDate":{
        "type":Date,
        "default":Date.now
    }
});

module.exports = mongoose.model('Order',objSchema)
