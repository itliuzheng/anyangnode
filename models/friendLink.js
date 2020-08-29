var mongoose = require('./mongoose');

var Schema = mongoose.Schema;

var objSchema = new Schema({
    //名称
    "name":{
        "type":String,
        "required":true
    },
    //链接
    "url":{
        "type":String,
        "required":true
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

module.exports = mongoose.model('FriendLink',objSchema);
