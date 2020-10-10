var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var expressJwt = require('express-jwt');
var expressArtTemplate = require('express-art-template');
var vertoken = require('./common/token');
var website = require(`./controllers/website`);
var { gameType } = require(`./controllers/gameType`);
var FriendLink = require(`./controllers/friendLink`);
var websiteBanner = require(`./controllers/banner`);

var router = require('./router')

app.use('/static/',express.static(path.join(__dirname,'static')));
app.use('/_static/',express.static(path.join(__dirname,'_static')));
app.use('/data',express.static(path.join(__dirname,'data')));

//因为一些框架都在使用{{}}这种模板语法，所以更改解析规则这种需求也时常出现
//更改art-template 解析规则{{ }}为<? ?>
// let rule = expressArtTemplate.template.defaults.rules[1]
// expressArtTemplate.template.defaults.rules[1].test = new RegExp(rule.test.source
//     .replace('{{', '{\\\?')
//     .replace('}}', '\\\?}'));

app.engine('html',expressArtTemplate);

//是否开启调试模式
app.set('view options', {
    // debug: process.env.NODE_ENV !== 'production'
    debug: true,
    bail: false,
    onerror: function (err) {
        console.log(err);
    },
});

// 设置模板存放目录    第一个参数 'views' 不能修改
app.set('views',path.join(__dirname,'./views'));


// 给express post请求体中 加入 body 对象
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//解决跨域问题
app.use(cors({
    origin:['http://localhost:8080'],
    methods:['GET','POST']
}));
//跨域问题解决方面
app.all('*',function(req,res,next) {
    res.header('Access-Control-Allow-Origin','http://localhost:8080');
    res.header('Access-Control-Allow-Headers','Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
    next();
});

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
// /api下所有路径都需要验证
app.use('/api',expressJwt({
    algorithms:['HS256'],  // algorithms should be set  6.0.0以后必须配置算法 否则报错
    secret:vertoken.singkey  //秘钥
}).unless({
    path:['/api/user/login'] //除了这个地址，其他的URL都需要验证
}));


//公共布局
app.use( async function (req, res, next) {
    if(!res.locals.partials){
        res.locals.partials = {};

        let websiteInfo = await website.promiseFindAll(req.body);
        let pcList = await gameType.promiseFindAll();

        let friendLink = await FriendLink.promiseFindAll();

        let banner = await websiteBanner.promiseFindAll();

        res.locals.partials.websiteInfo = websiteInfo;
        res.locals.partials.pcList = pcList;
        res.locals.partials.friendLink = friendLink.records;
        res.locals.partials.banner = banner;

    }
    next()
})

//把路由挂载到app中
app.use(router);

// 错误统一处理
app.use(function(err, req, res, next) {
    //当token失效返回提示信息
    if (err.status == 401) {
        return res.status(401).json({
            code:-1,
            data:null,
            msg:'token失效'
        });
    }
    return res.json({
        code:-1,
        data:null,
        msg:err
    })
});


module.exports = app;
