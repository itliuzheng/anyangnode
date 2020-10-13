let { gameType }= require('../controllers/gameType');
var { letterArr } = require('../common/utils');

module.exports.sitemapIndex = async function (req,res) {
    let tampltePath = 'sitemap/index.html';

    let gameTypeList = null;
    try {
        gameTypeList = await gameType.promiseFindAll();
    }catch (e) {
        //忽略错误 继续执行
    }

    let render = {
        currentClass:'sitemapIndex',
        gameTypeList:gameTypeList,
        letterArr:letterArr
    };

    res.render(tampltePath,render);
}