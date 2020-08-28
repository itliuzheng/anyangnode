var db = require(`../controllers/gameTutorial`);
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

module.exports.index = async function (req, res, next) {

    let home = await websiteFind(req);
    let tampltePath = 'course/index.html';

    let option = {
        page: 1,
        pageSize: 10
    };

    if (req.query.page) {
        option.page = req.query.page;
    }

    let init = await getFindAll(option);

    let list = init.records.map(item => {
        let obj = Object.assign({}, item);
        obj.tagTop = obj.tag.split('|')[0];
        obj.tagDown = obj.tag.split('|')[1];
        return obj
    });

    let pagination = calcPageination(init, '/course');

    let render = {
        currentClass:'tutorial',
        home: home,
        list: list,
        pagination: pagination,
    };

    res.render(tampltePath, render);

};

module.exports.detail = async function (req, res, next) {
    let tampltePath = 'course/detail.html';
    try {
        let detailId = new ObjectId(req.params.id);

        let option = {
            id: detailId
        };
        let detail = {};
        let allData = null;
        detail = await getFindById(option);
        allData = await autoFindAll({
            _id: {
                $ne: detailId
            }
        });

        allData.records = allData.records.map(item => {
            return {
                id: item.id,
                title: item.title,
                imgUrl: item.imgUrl,
            }
        });
        allData.scrollpicId = detailId;

        res.render(tampltePath, {
            detail: detail,
            otherList: allData,
        });
    } catch (e) {
        res.redirect('/course')
    }
};
