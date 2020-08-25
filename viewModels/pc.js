var db = require(`../controllers/gameDetail`);
var { gameType } = require(`../controllers/gameType`);
var website = require(`../controllers/website`);
var { calcPageination } = require('../common/utils');

function websiteFind(req){
    return new Promise((resolve,reject) => {
        website.find(req.body, function(err, home) {
            if (err) return reject(err);
            resolve(home.data);
        });
    })
}

function gameDetailFindAll(body = {}){
    return new Promise((resolve,reject) => {
        db.findAll(body, function(err, content) {
            if (err) return reject(err);
            resolve(content.data)
        });
    })
}

function gameTypeFindAll(body = {}){
    return new Promise((resolve,reject) => {
        gameType.findAll(body, function(err, content) {
            if (err) return reject(err);
            resolve(content.data)
        });
    })
}

module.exports.index = async function(req, res, next) {

    let home = await websiteFind(req);

    let option = {
        page:1,
        pageSize:10
    };

    if(req.query.page){
        option.page = req.query.page;
    }

    let gameType = await gameTypeFindAll();

    console.log(gameType);

    let gameInit = await gameDetailFindAll(option);

    let gameList = gameInit.records.map(item=>{
        let obj = Object.assign({},item);
        let date = item.createDate.split(' ')[0];
        obj.day = date.substring(date.lastIndexOf('-')+1);
        obj.years = date.substring(0,date.lastIndexOf('-'));
        return obj
    });

    let pagination = calcPageination(gameInit,'/Support');

    let letterArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",]

    res.render('pc/index.html',{
        home:home,
        rightNav:gameType.records,
        letterArr:letterArr,
        gameList:gameList,
        pagination:pagination,
    });

};

module.exports.query = async function(req, res, next) {

    console.log(req.params);
    if(req.series){

    }


    let option = {
        page:1,
        pageSize:10
    };

    if(req.query.page){
        option.page = req.query.page;
    }

    let gameType = await gameTypeFindAll();


    let gameInit = await gameDetailFindAll(option);

    let gameList = gameInit.records.map(item=>{
        let obj = Object.assign({},item);
        let date = item.createDate.split(' ')[0];
        obj.day = date.substring(date.lastIndexOf('-')+1);
        obj.years = date.substring(0,date.lastIndexOf('-'));
        return obj
    });

    let pagination = calcPageination(gameInit,'/Support');

    let letterArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",]

    res.render('pc/index.html',{
        rightNav:gameType.records,
        letterArr:letterArr,
        gameList:gameList,
        pagination:pagination,
    });

};

