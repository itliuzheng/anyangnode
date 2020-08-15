var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var expressJwt = require('express-jwt');
var vertoken = require('./common/token');

var router = require('./router')

// 给express post请求体中 加入 body 对象
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//解决跨域问题
app.use(cors({
    origin:['http://localhost:8080'],
    methods:['GET','POST']
}))
//跨域问题解决方面
app.all('*',function(req,res,next) {
    res.header('Access-Control-Allow-Origin','http://localhost:8080');
    res.header('Access-Control-Allow-Headers','Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
    next();
})

//解析token 获取用户信息
app.use(function(req,res,next) {
    var token = req.headers['authorization'];
    if(token === undefined){
        return next();
    }else{
        vertoken.getToken(token)
            .then( data=>{
                req.token = data;
                return next();
            })
            .catch(err=>{
                return next();
            })
    }
})

//验证Token是否过期并规定哪些路由不用验证
app.use(expressJwt({
    algorithms:['HS256'],  // algorithms should be set  6.0.0以后必须配置算法 否则报错
    secret:vertoken.singkey  //秘钥
}).unless({
    path:['/','/user/login'] //除了这个地址，其他的URL都需要验证
}))


//把路由挂载到app中
app.use(router)

//当token失效返回提示信息
app.use(function(err, req, res, next) {
    if (err.status == 401) {
        return res.status(401).json({
            code:-1,
            data:null,
            msg:'token失效'
        });
    }
});

module.exports = app;