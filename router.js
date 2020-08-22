var express = require('express');
var fs = require('fs');
var routes = require('./routes');
var viewModels = require('./viewModels');


var router = express.Router();

// router.get('/',routes.users.index);

//登录
router.post('/api/user/login',routes.users.login);
// router.post('/register',routes.users.create);

//菜单
router.get('/api/sysuser/resources',routes.sysuser.resources);

//网站管理
router.post('/api/website/upload',routes.website.upload);
router.get('/api/website/info',routes.website.find);
router.post('/api/website/add',routes.website.createAndUpdate);

//游戏分类管理
router.post('/api/game_type/page',routes.gameType.list);
router.post('/api/game_type/create',routes.gameType.create);
router.post('/api/game_type/update',routes.gameType.update);
router.post('/api/game_type/delete',routes.gameType.delete);

//游戏详情
router.post('/api/game_detail/page',routes.gameDetail.list);
router.post('/api/game_detail/create',routes.gameDetail.create);
router.post('/api/game_detail/update',routes.gameDetail.update);
router.post('/api/game_detail/delete',routes.gameDetail.deleteById);

//产品管理
router.post('/api/product/list',routes.product.list);
router.post('/api/product/create',routes.product.create);
router.post('/api/product/update',routes.product.update);
router.post('/api/product/delete',routes.product.delete);



//用户界面
router.get('/',viewModels.home.home);


//后台界面
router.get('/admin',function(req,res,next) {
    // res.end('/Wzadmin/index.html')
    res.end('/index.html')
})

module.exports = router;
