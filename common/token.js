var jwt = require('jsonwebtoken');
var singkey = "liuzheng";//秘钥

exports.singkey = singkey;

exports.setToken = function(username,userid,expiresIn = "0.01h") {
    return new Promise((resolve,reject)=>{
        const TOKEN = jwt.sign({
            name:username,
            _id:userid
        },singkey,{expiresIn:expiresIn});
        resolve(TOKEN);
    })
}

exports.getToken = function(token) {
    return new Promise((resolve,reject)=>{
        var info = jwt.verify(token.split(' ')[1],singkey);
        resolve(info);
    })
}