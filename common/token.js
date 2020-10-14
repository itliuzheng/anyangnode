var jwt = require('jsonwebtoken');
var { TokenSingkey } = require('../private_data');

exports.singkey = TokenSingkey;

exports.setToken = function(username,userid,expiresIn = "0.01h") {
    return new Promise((resolve,reject)=>{
        const TOKEN = jwt.sign({
            name:username,
            _id:userid
        },TokenSingkey,{expiresIn:expiresIn});
        resolve(TOKEN);
    })
}

exports.getToken = function(token) {
    token = 'Bearer ' + token ;
    return new Promise((resolve,reject)=>{
        var info = jwt.verify(token.split(' ')[1],TokenSingkey);
        resolve(info);
    })
}