var mongoose = require('./mongoose');

var Schema = mongoose.Schema;

var objSchema = new Schema({
    //订单id    -> 对应的是  order表里的id
    "orderId":{
        "type":String,
        "required":true
    },
    //物流状态
    "status":{
        "type":Number,
        "enum":[0,1],  //0-未发货   1-已发货
        default:0
    },
	//物流单号
	"logistics":{
        "type":String
    },
    //创建时间
    "createDate":{
        "type":Date,
        "default":Date.now
    }
});

module.exports = mongoose.model('Logistics',objSchema)
