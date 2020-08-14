var express = require('express');
var routes = require('./routes');


var router = express.Router();

// router.get('/',routes.users.index);

//登录
router.post('/user/login',routes.users.login);
// router.post('/register',routes.users.create);

//菜单
router.get('/sysuser/resources',routes.sysuser.resources)

//产品管理
router.post('/product/list',routes.product.list)
router.post('/product/create',routes.product.create)


module.exports = router;
