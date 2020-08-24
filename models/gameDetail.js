var mongoose = require('./mongoose');

var Schema = mongoose.Schema;

var objSchema = new Schema({
    //游戏名称
    "name":{
        "type":String,
        "required":true
    },
    //游戏描述
    "desc":{
        "type":String,
    },
    //所属分类
    "type":{
        "type":String,
        "required":true
    },
    //系列分类
    "catena":{
        "type":String
    },
    //标签
    "tagStr":{
        "type":String
    },
    //游戏大小
    "sizeStr":{
        "type":String
    },
    //版本介绍
    "versionStr":{
        "type":String
    },
    //下载信息
    "downloadStr":{
        "type":String
    },
    //创建时间
    "createDate":{
        "type":Date,
        "default":Date.now
    },
});

module.exports = mongoose.model('GameDetail',objSchema);
