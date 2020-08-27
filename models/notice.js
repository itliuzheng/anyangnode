var mongoose = require('./mongoose');

var Schema = mongoose.Schema;

var objSchema = new Schema({
    //标题
    "title":{
        "type":String,
        "required":true
    },
    //是否置顶
    "isTop":{
        "type":Boolean,
    },
    //描述
    "description":{
        "type":String,
    },
    //内容
    "content":{
        "type":String,
    },
    //排列顺序
    "sort":{
        "type":Number,
        default:999
    },
    //创建时间
    "createDate":{
        "type":Date,
        "default":Date.now
    },
});

module.exports = mongoose.model('Notice',objSchema);
