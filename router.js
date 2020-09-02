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

//游戏工具
router.post('/api/game_tool/page',routes.gameTool.list);
router.post('/api/game_tool/create',routes.gameTool.create);
router.post('/api/game_tool/update',routes.gameTool.update);
router.post('/api/game_tool/delete',routes.gameTool.deleteById);

//教程资讯  游戏教程
router.post('/api/game_tutorial/page',routes.gameTutorial.list);
router.post('/api/game_tutorial/create',routes.gameTutorial.create);
router.post('/api/game_tutorial/update',routes.gameTutorial.update);
router.post('/api/game_tutorial/delete',routes.gameTutorial.deleteById);
router.get('/api/game_tutorial/:id',routes.gameTutorial.getById);

//教程资讯  游戏资讯
router.post('/api/game_new/page',routes.gameNew.list);
router.post('/api/game_new/create',routes.gameNew.create);
router.post('/api/game_new/update',routes.gameNew.update);
router.post('/api/game_new/delete',routes.gameNew.deleteById);
router.get('/api/game_new/:id',routes.gameNew.getById);

//网站公告
router.post('/api/notice/page',routes.notice.list);
router.post('/api/notice/create',routes.notice.create);
router.post('/api/notice/update',routes.notice.update);
router.post('/api/notice/delete',routes.notice.deleteById);
router.get('/api/notice/:id',routes.notice.getById);

//网站公告
router.post('/api/friend_link/page',routes.friendLink.list);
router.post('/api/friend_link/create',routes.friendLink.create);
router.post('/api/friend_link/update',routes.friendLink.update);
router.post('/api/friend_link/delete',routes.friendLink.deleteById);
router.get('/api/friend_link/:id',routes.friendLink.getById);

//banner
router.post('/api/banner/page',routes.banner.list);
router.post('/api/banner/create',routes.banner.create);
router.post('/api/banner/update',routes.banner.update);
router.post('/api/banner/delete',routes.banner.deleteById);
router.get('/api/banner/:id',routes.banner.getById);




//用户界面  start
router.get('/',viewModels.home.home);

router.get('/Support',viewModels.pc.index);
//大类分类
router.get('/PC/:name',viewModels.pc.query);
//系列分类
router.get('/PC/:name/:series',viewModels.pc.query);
//首字母分类
router.get('/PC_initials/:letter',viewModels.pc.letter);
//详情
router.get('/PC_detail/:id',viewModels.pc.detail);
//搜索
router.get('/Search',viewModels.pc.search);



//高速下载通道
router.get('/vip',viewModels.home.vip);
router.get('/dashang',viewModels.home.dashang);

//游戏工具
router.get('/tool',viewModels.tool.index);
router.get('/tool/:id',viewModels.tool.detail);

//教程资讯
router.get('/course',viewModels.tutorial.index);
router.get('/course/:id',viewModels.tutorial.detail);

//教程资讯
router.get('/course_new',viewModels.gameNew.index);
router.get('/course_new/:id',viewModels.gameNew.detail);

//网站公告
router.get('/FFF',viewModels.notice.index);
router.get('/FFF/:id',viewModels.notice.detail);


//用户界面  end

//后台界面
router.get('/admin',function(req,res,next) {
    // res.end('/Wzadmin/index.html')
    res.end('/index.html')
});

router.get('/*',(req,res)=>{
    res.redirect('/');
});

module.exports = router;
