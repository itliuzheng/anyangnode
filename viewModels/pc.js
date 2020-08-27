var db = require(`../controllers/gameDetail`);
var gameTool = require(`../controllers/gameTool`);
var { gameType } = require(`../controllers/gameType`);
var website = require(`../controllers/website`);
var { calcPageination } = require('../common/utils');
var pyfl = require('pyfl').default;

function websiteFind(req){
    return new Promise((resolve,reject) => {
        website.find(req.body, function(err, home) {
            if (err) return reject(err);
            resolve(home.data);
        });
    })
}

function gameDetailFindById(body = {}){
    return new Promise((resolve,reject) => {
        db.findById(body, function(err, content) {
            if (err) return reject(err);
            resolve(content.data)
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

function autoFindAll(body = {}){
    return new Promise((resolve,reject) => {
        gameTool.autoFindAll(body, function(err, content) {
            if (err) return reject(err);
            resolve(content.data)
        },{
            page:1,
            pageSize:10
        });
    })
}

/**
 * 分割日期  为两部分，第一部分为 日，第二部分为 年-月
 * @param date
 * @returns {{tagTop: string, tagDown: string}}
 */
function substringDate(date){
    let dateStr = date.split(' ')[0];
    return {
        tagTop:dateStr.substring(dateStr.lastIndexOf('-')+1),
        tagDown:dateStr.substring(0,dateStr.lastIndexOf('-'))
    }
}

module.exports.index = async function(req, res, next) {

    let home = await websiteFind(req);
    let tampltePath = 'pc/index.html';

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
        return  Object.assign({},item,substringDate(item.createDate));
    });

    let pagination = calcPageination(gameInit,'/Support');

    let letterArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",]


    let allTool = await autoFindAll();

    allTool.records = allTool.records.map(item=>{
        return {
            id:item.id,
            title:item.title,
            imgUrl:item.imgUrl,
        }
    });
    allTool.scrollpicId = '';

    res.render(tampltePath,{
        home:home,
        rightNav:gameType.records,
        letterArr:letterArr,
        gameList:gameList,
        pagination:pagination,
        toolList:allTool
    });

};

module.exports.query = async function(req, res, next) {
    let gameTypeName = req.params.name;
    let tampltePath = 'pc/index.html';
    let currentSeries = {};

    let option = {
        page:1,
        pageSize:10
    };

    if(req.query.page){
        option.page = req.query.page;
    }

    if(req.params.series){
        option.catenaCode = req.params.series;
        currentSeries.code = req.params.series;
        tampltePath = 'pc/series_index.html';
    }

    let gameType = await gameTypeFindAll();

    let findGameType = gameType.records.find(item=>{
        return item.englishName == gameTypeName
    });

    let currentName = {
        name:findGameType.name,
        code:findGameType.englishName
    };

    option.typeId = findGameType.id;

    let gameInit = await gameDetailFindAll(option);

    let gameList = gameInit.records.map(item=>{
        let obj = Object.assign({},item);
        if(req.params.series){
            obj = Object.assign(obj,substringDate(item.createDate));
            currentSeries.name = `${item.catena}系列`;
        }else{
            obj.tagTop = pyfl(item.name[0]);
        }
        return obj
    });

    let pagination = calcPageination(gameInit,'/Support');

    let letterArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",]

    res.render(tampltePath,{
        currentName:currentName,
        currentSeries:currentSeries,
        rightNav:gameType.records,
        letterArr:letterArr,
        gameList:gameList,
        pagination:pagination,
    });

};

module.exports.letter = async function(req, res, next) {
    let letterName = req.params.letter;

    let option = {
        page:1,
        pageSize:10
    };

    if(req.query.page){
        option.page = req.query.page;
    }

    let gameType = await gameTypeFindAll();

    //{catenaCode:{$regex:"C"}}
    option.nameCode = { $regex:`^${letterName}`};

    let gameInit = await gameDetailFindAll(option);

    let gameList = gameInit.records.map(item=>{
        let obj = Object.assign({},item);
        let date = item.typeName.substring(0,4);
        obj.tagTop = date.substring(0,2);
        obj.tagDown = date.substring(2);
        return obj
    });

    let pagination = calcPageination(gameInit,'/Support');

    let letterArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",]

    res.render('pc/letter_index.html',{
        currentName:letterName,
        rightNav:gameType.records,
        letterArr:letterArr,
        gameList:gameList,
        pagination:pagination,
    });

};

module.exports.detail = async function(req, res, next) {
    let detailId = req.params.id;
    let tampltePath = 'pc/detail/index.html';

    let option = {
        id:detailId,
    };

    let gameType = await gameTypeFindAll();

    let gameInit = await gameDetailFindById(option);

    res.render(tampltePath,{
        rightNav:gameType.records,
        gameDetail:gameInit,
    });

};
