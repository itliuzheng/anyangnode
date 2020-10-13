var gameDetail = require(`../controllers/gameDetail`);
var notice = require(`../controllers/notice`);
var gameTool = require(`../controllers/gameTool`);
var gameTutorial = require(`../controllers/gameTutorial`);
var commonFunction = require('../common/function');


module.exports.home = async function(req, res, next) {
    let option = {
        sort:-1,
        page:1,
        pageSize:15
    };
    let newGameAll = await gameDetail.autoFindAll(option);

    let newGameList = newGameAll.records.map(item=>{
        return {
            id:item._id.toString(),
            name:item.name,
            imgUrl:item.imgUrl
        }
    });

    let noticeResult = await notice.promiseFindAll(
        {
            pageSize:1
        }
    );
    let newNotices = noticeResult.records.map(item=>{
        return {
            id:item.id,
            title:item.title,
            content:item.content
        }
    });

    let tutorialResult = await gameTutorial.promiseFind({
        pageSize:3
    });
    let tutorialsList = tutorialResult.records.map(item=>{
        return {
            id:item.id,
            title:item.title,
            description:item.description,
            imgUrl:item.imgUrl,
        }
    });

    let otherToolList = await gameTool.promiseFindAll();
    otherToolList.records = otherToolList.records.map(item=>{
        return {
            id:item.id,
            title:item.title,
            imgUrl:item.imgUrl,
        }
    });
    otherToolList.scrollpicId = 'home';

    res.locals.partials.banner = commonFunction.settingBanner(res,'网站首页');

    let render = {
        currentClass:'home',
        newGameList:newGameList,
        newNotices:newNotices,
        tutorialsList:tutorialsList,
        otherToolList:otherToolList,
    };

    res.render('index.html',render);
};

module.exports.dashang = function(req, res, next) {
    res.render('dashang/index.html');
};

module.exports.vip = function(req, res, next) {

    res.locals.partials.banner = commonFunction.settingBanner(res,'高速下载通道');

    res.render('vip/index.html',{
        currentClass:'vip',
    });
};


module.exports.PCLogin = function (req, res, next) {
    let tampltePath = 'login/login.html';

    let render = {
        currentClass:'loginIndex',
    };

    console.log(tampltePath);
    res.render(tampltePath,render);
}
