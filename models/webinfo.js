var mongoose = require('./mongoose');

var Schema = mongoose.Schema;


var userSchema = new Schema({
    //网站名称
    "name": {
        "type": String,
        "required": true
    },
    //网站网址
    "websiteUrl":{
        "type":String,
        "required": true
    },
    //logo
	"logo":{
    	"type":String,
        "required": true
    },
    //首页标题(Title)
	"title":{
    	"type":String,
        "required": true
    },
    //网站关键字(keywords)
	"keywords":{
    	"type":String,
        "required": true
    },
    //网站描述(Description)
	"description":{
    	"type":String,
        "required": true
    },
    //内页联系方式
	"insideContact":{
    	"type":String,
    },
    //网站底部HTML代码
	"footer":{
    	"type":String,
    },
    //联系电话
	"mobile":{
    	"type":String,
    },
    //创建时间`
    "createDate":{
        "type":Date,
        "default":Date.now
    },
    //修改时间`
    "modifyDate":{
        "type":Date,
        "default":Date.now
    },
});

module.exports = mongoose.model('Webinfo',userSchema)
