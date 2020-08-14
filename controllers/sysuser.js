var error = require('../common/error');
var User = require('../models/users');
var Sysuser = require('../models/sysuser');
var MD5 = require('blueimp-md5');
var Token = require('../common/token');

const MD5_KEY = "node";

function Collection(){

}

Collection.prototype.resources = async function(token,cb) {
    try{
        // 添加数据
        // let data = {
        //     userId:token._id,
        //     "name": "*",         
        //     "code": "user",       
        //     "type": "1",       
        //     "targetUrl": "/*",   
        //     "parentId": 0,
        //     "description": "*"
        // }
        // await new Sysuser(data).save();

        let result = await Sysuser.find({
            userId:token._id
        })
        cb(null,result)
    }catch (e){
        cb(new error.NotFound(e));
    }
}
module.exports.sysuser = new Collection('sysuser');