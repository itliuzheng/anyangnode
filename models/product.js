var mongoose = require('./mongoose');

var Schema = mongoose.Schema;

var objSchema = new Schema({
    //商品名称
    "name":{
        "type":String,
        "required":true
    },
    //商品描述
    "description":{
        "type":String,
        "required":true
    },
    //商品图片
    "imgUrl":{
        "type":String,
        "default":''
    },
    //价格
    "price":{
        "type":Number,
        "required":true
    },
    //商品上下架状态
    "status":{
        "type":Number,
        "enum":[0,1],  //0-下架  1-上架
        "default":0
    },
    //创建时间
    "createDate":{
        "type":Date,
        "default":Date.now
    },
    //修改时间
    "modifyDate":{
        "type":Date,
        "default":Date.now
    }
});

module.exports = mongoose.model('Product',objSchema)
