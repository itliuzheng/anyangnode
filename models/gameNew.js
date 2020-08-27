var mongoose = require('./mongoose');

var Schema = mongoose.Schema;

var objSchema = new Schema({
    //标题
    "title":{
        "type":String,
        "required":true
    },
    //封面图片
    "imgUrl":{
        "type":String,
    },
    //描述
    "description":{
        "type":String,
    },
    //标签
    "tag":{
        "type":String,
    },
    //内容
    "content":{
        "type":String,
    },
    //排序
    "sort":{
        "type":String,
    },
    //创建时间
    "createDate":{
        "type":Date,
        "default":Date.now
    },
});

module.exports = mongoose.model('GameNew',objSchema);
