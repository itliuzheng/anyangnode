var db = require(`../controllers/notice`);
var website = require(`../controllers/website`);
var {calcPageination} = require('../common/utils');
var ObjectId = require('mongodb').ObjectId;

function websiteFind(req) {
    return new Promise((resolve, reject) => {
        website.find(req.body, function (err, home) {
            if (err) return reject(err);
            resolve(home.data);
        });
    })
}

function getFindById(body = {}) {
    return new Promise((resolve, reject) => {
        db.findById(body, function (err, content) {
            if (err) return reject(err);
            resolve(content.data)
        });
    })
}

function getFindAll(body = {}) {
    return new Promise((resolve, reject) => {
        db.findAll(body, function (err, content) {
            if (err) return reject(err);
            resolve(content.data)
        });
    })
}

function autoFindAll(body = {}) {
    return new Promise((resolve, reject) => {
        db.autoFindAll(body, function (err, content) {
            if (err) return reject(err);
            resolve(content.data)
        }, {
            page: 1,
            pageSize: 10
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

module.exports.index = async function (req, res, next) {

    let home = await websiteFind(req);
    let tampltePath = 'FFF/index.html';

    let option = {
        page: 1,
        pageSize: 10
    };

    if (req.query.page) {
        option.page = req.query.page;
    }

    let init = await getFindAll(option);

    let list = init.records.map(item => {
        let obj = Object.assign({}, item,substringDate(item.createDate));

        return obj
    });

    let pagination = calcPageination(init, '/FFF');

    let render = {
        currentClass:'notice',
        home: home,
        list: list,
        pagination: pagination,
    };

    res.render(tampltePath, render);

};

module.exports.detail = async function (req, res, next) {
    let tampltePath = 'FFF/detail.html';
    try {
        let detailId = new ObjectId(req.params.id);

        let option = {
            id: detailId
        };
        let detail = {};
        let allData = null;
        detail = await getFindById(option);
        allData = await autoFindAll();

        allData.records = allData.records.map(item => {
            return {
                id: item.id,
                title: item.title,
                createDate: item.createDate,
            }
        });
        allData.scrollpicId = detailId;

        let index = allData.records.findIndex(item=>{
            return item.id.toString() === detailId.toString()
        });
        let otherNotice = {
            prev:{
                title:null,
                createDate:null,
                id:null
            },
            next:{
                title:null,
                createDate:null,
                id:null
            }
        };
        if(index > 0 ){
            otherNotice.prev = allData.records[index - 1];
        }
        if(index < allData.total - 1){
            otherNotice.next = allData.records[index + 1];
        }

        res.render(tampltePath, {
            detail: detail,
            otherNotice: otherNotice,
        });

    } catch (e) {
        res.redirect('/FFF')
    }
};
