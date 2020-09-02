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
    //图片
    "imgUrl":{
        "type":String,
    },
    //类型
    "typeId":{
        "type":Array,
         /*
           * 0 网站首页
           * 1 单机游戏
           * 2 高速下载通道
           * 3 游戏工具
           * 4 教程资讯
           * 5 网站公告
         */
        // "enum":[0,1,2,3,4,5],
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

module.exports = mongoose.model('Banner',objSchema);
