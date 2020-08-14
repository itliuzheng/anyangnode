var error = require('../common/error');
var User = require('../models/users');
var MD5 = require('blueimp-md5');
var Token = require('../common/token');

const MD5_KEY = "node";

function Collection(){

}

Collection.prototype.seed = function(obj,cb){
    this.store = obj;
    cb();
}

Collection.prototype.login = async function(body = {},cb) {
    body.password = MD5(body.password,MD5_KEY);

    try{
        let result = await User.findOne({
            loginName:body.loginName,
            password:body.password
        })

        if(result){
            let username = result.loginName;
            let userid = result._id;
            let token = await Token.setToken(username,userid,'1 days');
            cb(null,{
                code : 1,
                data:token,
                msg:'登录成功'
            })
        }else{
            cb(null,error.ErrorMessage('用户名或密码错误'))
        }
    }catch (e){
        cb(new error.NotFound(e))
    }
}
// await new User(obj).save()

Collection.prototype.find = function(body = {},cb) {
    let id = parseInt(body.id,10);
    var obj = this.store[id];
    if(obj){
        cb(null,obj)
    }else{
        cb(new error.NotFound('Item not found'))
    }
}

Collection.prototype.findAll = function(obj,cb){
    var items = [];
    let object = this.store;
    for (const id in object) {
        if (object.hasOwnProperty(id)) {
            const element = object[id];
            items.push(element);
        }
    }
    cb(null,items)
}

Collection.prototype.create = function(obj,cb) {
    this.lastId++;
    obj.id = this.lastId;
    this.store[this.lastId] = obj;
    cb(null,obj)
}

Collection.prototype.update = function(obj = {},cb) {
    let id = obj.id || null;
    this.find(id,function(err,item) {
        if(err) return cb(err);

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                item[key] = obj[key];
            }
        }
        
        cb(null,item);
    })
}

module.exports.users = new Collection('users');