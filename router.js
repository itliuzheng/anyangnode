var express = require('express');
var routes = require('./routes');


var router = express.Router();

// router.get('/',routes.users.index);

//登录
router.post('/api/user/login',routes.users.login);
// router.post('/register',routes.users.create);

//菜单
router.get('/api/sysuser/resources',routes.sysuser.resources)

//产品管理
router.post('/api/product/list',routes.product.list);
router.post('/api/product/create',routes.product.create);
router.post('/api/product/update',routes.product.update);
router.post('/api/product/delete',routes.product.delete);



//用户界面
router.get('/',function(req,res,next) {
    res.end('/view/index.html')
})

module.exports = router;
