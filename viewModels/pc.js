var db = require(`../controllers/gameDetail`);
var gameTool = require(`../controllers/gameTool`);
var gameTutorial = require(`../controllers/gameTutorial`);
var { calcPageination,letterArr } = require('../common/utils');
var pyfl = require('pyfl').default;
var commonFunction = require('../common/function');


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

    let tampltePath = 'pc/index.html';

    let option = {
        page:1,
        pageSize:10
    };

    if(req.query.page){
        option.page = req.query.page;
    }

    let gameInit = await gameDetailFindAll(option);

    let gameList = gameInit.records.map(item=>{
        return  Object.assign({},item,substringDate(item.createDate));
    });

    let pagination = calcPageination(gameInit,'/Support');


    let otherToolList = await gameTool.promiseFindAll();
    otherToolList.records = otherToolList.records.map(item=>{
        return {
            id:item.id,
            title:item.title,
            imgUrl:item.imgUrl,
        }
    });
    otherToolList.scrollpicId = '1';

    let otherTutorialList = await gameTutorial.promiseFindAll();
    otherTutorialList.records = otherTutorialList.records.map(item=>{
        return {
            id:item.id,
            title:item.title,
            imgUrl:item.imgUrl,
        }
    });
    otherTutorialList.scrollpicId = `game_1`;

    let currentName = {
        name:'PC单机游戏',
        code:null
    };

    res.locals.partials.banner = commonFunction.settingBanner(res,'单机游戏');

    res.render(tampltePath,{
        currentClass:'pc',
        currentName:currentName,
        letterArr:letterArr,
        gameList:gameList,
        pagination:pagination,
        otherToolList:otherToolList,
        otherTutorialList:otherTutorialList
    });

};

module.exports.query = async function(req, res, next) {
    let gameTypeName = req.params.name;
    let tampltePath = 'pc/index.html';
    let currentSeries = {};
    let nextUrl = `/PC/${gameTypeName}`;

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
        nextUrl = `/PC/${gameTypeName}/${req.params.series}`;
        tampltePath = 'pc/series_index.html';
    }

    let gameType = res.locals.partials.pcList;

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

    let pagination = calcPageination(gameInit,nextUrl);


    let otherToolList = await gameTool.promiseFindAll();
    otherToolList.records = otherToolList.records.map(item=>{
        return {
            id:item.id,
            title:item.title,
            imgUrl:item.imgUrl,
        }
    });
    otherToolList.scrollpicId = '1';

    let otherTutorialList = await gameTutorial.promiseFindAll();
    otherTutorialList.records = otherTutorialList.records.map(item=>{
        console.log(item.imgUrl);
        return {
            id:item.id,
            title:item.title,
            imgUrl:item.imgUrl,
        }
    });
    otherTutorialList.scrollpicId = `game_1`;

    res.locals.partials.banner = commonFunction.settingBanner(res,'单机游戏');
    res.render(tampltePath,{
        currentName:currentName,
        currentSeries:currentSeries,
        letterArr:letterArr,
        gameList:gameList,
        pagination:pagination,
        otherToolList:otherToolList,
        otherTutorialList:otherTutorialList,
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

    let pagination = calcPageination(gameInit,`/PC_initials/${letterName}`);


    let otherToolList = await gameTool.promiseFindAll();
    otherToolList.records = otherToolList.records.map(item=>{
        return {
            id:item.id,
            title:item.title,
            imgUrl:item.imgUrl,
        }
    });
    otherToolList.scrollpicId = '1';

    let otherTutorialList = await gameTutorial.promiseFindAll();
    otherTutorialList.records = otherTutorialList.records.map(item=>{
        return {
            id:item.id,
            title:item.title,
            imgUrl:item.imgUrl,
        }
    });
    otherTutorialList.scrollpicId = `game_1`;
    res.locals.partials.banner = commonFunction.settingBanner(res,'单机游戏');

    res.render('pc/letter_index.html',{
        currentName:letterName,
        letterArr:letterArr,
        gameList:gameList,
        pagination:pagination,
        otherToolList:otherToolList,
        otherTutorialList:otherTutorialList,
    });

};

module.exports.detail = async function(req, res, next) {
    let detailId = req.params.id;
    let tampltePath = 'pc/detail/index.html';

    let option = {
        id:detailId,
    };

    let gameInit = await gameDetailFindById(option);

    let otherToolList = await gameTool.promiseFindAll();
    otherToolList.records = otherToolList.records.map(item=>{
        return {
            id:item.id,
            title:item.title,
            imgUrl:item.imgUrl,
        }
    });
    otherToolList.scrollpicId = detailId;

    let otherTutorialList = await gameTutorial.promiseFindAll();
    otherTutorialList.records = otherTutorialList.records.map(item=>{
        return {
            id:item.id,
            title:item.title,
            imgUrl:item.imgUrl,
        }
    });
    otherTutorialList.scrollpicId = `game_${detailId}`;
    res.locals.partials.banner = commonFunction.settingBanner(res,'单机游戏');

    res.render(tampltePath,{
        gameDetail:gameInit,
        otherToolList:otherToolList,
        otherTutorialList:otherTutorialList,
    });

};

function replaceSearchName(reg,dom,replaceName){
    if(dom){
        return dom.replace(reg,`<span class="FontRed">${replaceName}</span>`)
    }else{
        return ''
    }
}

//搜索
module.exports.search = async function(req, res, next) {
    let searchName = req.query.q;
    let tampltePath = 'search/index.html';

    let option = {
        page:1,
        pageSize:10
    };

    if(req.query.page){
        option.page = req.query.page;
    }

    option.name = {
        $regex:searchName,
        $options:'i'
    };

    let gameInit = await db.autoFindAll(option);
    var reg = new RegExp(searchName,'ig');
    let formatValue = gameInit.records.map(item=>{
       return {
           id:item.id.toString(),
           formatName:item.name.replace(reg,`<span class="FontRed">${searchName}</span>`),
           name:item.name,
           sizeStr:replaceSearchName(reg,item.sizeStr,searchName),
           versionStr:replaceSearchName(reg,item.versionStr,searchName),
           createDate:item.createDate.toLocaleString(),
       }
    });

    let pagination = calcPageination(gameInit,`/Search?q=${searchName}`);
    res.locals.partials.banner = commonFunction.settingBanner(res,'单机游戏');

    res.render(tampltePath,{
        currentName:searchName,
        gameList:formatValue,
        pagination:pagination,
    });

};