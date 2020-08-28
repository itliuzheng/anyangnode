var error = require('../common/error');
var utils = require('../common/utils');
var Db = require('../models/gameType');


class Collection{

    findAll(obj,cb){
        let data = {};
        if(utils.isEmpty(obj.name)){
            data.name = {
                $regex:obj.name,
                $options:'i'
            }
        }
        let page = obj.page || 1;
        let pageSize = obj.pageSize || 10;

        //分页
        let queryResult = Db.find(data)
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .sort({'sort':1});

        queryResult.exec((err,items)=>{
            if(err){
                return cb(null,err)
            }else{
                let item = items.map(value=>{
                    return {
                        id:value._id,
                        name:value.name,
                        englishName:value.englishName,
                        catena:value.catena,
                        sort:value.sort,
                        createDate:value.createDate.toLocaleString(),
                    }
                });
                Db.find(function(err,total) {
                    let result = {
                        current:page,
                        pageNum:page,
                        pageSize:pageSize,
                        records:item,
                        total:total.length
                    };
                    return cb(null,{
                        code:1,
                        data:result,
                        msg:'成功'
                    })
                })
            }
        })
    };

    async create(obj,cb) {
    try {
        if(!utils.isEmpty(obj.name)){
            return cb('名称不能为空');
        }
        if(!utils.isEmpty(obj.englishName)){
            return cb('英文名称不能为空');
        }
        if(!utils.isEmpty(obj.sort)){
            return cb('排序不能为空');
        }
        let data = await new Db(obj).save();

        return cb(null,{
            code:1,
            data:true,
            msg:'成功'
        })
    } catch (e) {
        return cb(null, e)
    }

}

    update(obj,cb) {
    let id = obj.id || null;
    let updateInfo = {};

    if(utils.isEmpty(obj.name)) updateInfo.name = obj.name;
    if(utils.isEmpty(obj.englishName)) updateInfo.englishName = obj.englishName;
    if(utils.isEmpty(obj.sort)) updateInfo.sort = obj.sort;

    Db.updateOne({_id:id},updateInfo,(err,docs)=>{
        if(err) return cb(err);
        return cb(null,{code:1,data:true,msg:'成功'})
    })
}

    delete(obj,cb) {
    let id = obj.id || null;
    Db.findOneAndDelete({_id:id},(err,docs)=>{
        if(err) return cb(err);
        return cb(null,{code:1,data:true,msg:'成功'})
    })
}

    promiseFindAll(body = {}){
        return new Promise((resolve,reject) => {
            this.findAll(body, function(err, content) {
                if (err) return reject(err);
                resolve(content.data)
            });
        })
    }
}

module.exports.gameType = new Collection('gameType');
