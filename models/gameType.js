var mongoose = require('./mongoose');

var Schema = mongoose.Schema;

var objSchema = new Schema({
    //类型名称
    "name":{
        "type":String,
        "required":true
    },
    //英文名称
    "englishName":{
        "type":String,
        "required":true
    },
    //显示排序
    "sort":{
        "type":Number,
        "required":true
    },
    //创建时间
    "createDate":{
        "type":Date,
        "default":Date.now
    },
});

module.exports = mongoose.model('Game',objSchema);
