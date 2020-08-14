var mongoose = require('./mongoose')

var Schema = mongoose.Schema;

var userSchema = new Schema({
    //用户名
    "loginName": {
        "type": String,
        "required": true
    },
    //手机号
    "mobile":{
        "type":String,
    },
    //密码
	"password":{          
    	"type":String,
        "required": true
    },
    //用户类型
    "userType":{
        "type":Number,
        "enum":[0,1,2],  //0-超级管理员 1-后台管理  2-用户
        "default" : 2
    },
    //创建时间`
    "createDate":{
        "type":Date,
        "default":Date.now
    }
});

module.exports = mongoose.model('User',userSchema)
