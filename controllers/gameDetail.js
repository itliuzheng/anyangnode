var error = require('../common/error');
var utils = require('../common/utils');
var DbGameType = require('../models/gameType');
var Db = require('../models/gameDetail');

class Collection{

    findGameType(){
        return new Promise((resolve ,reject)=> {
            DbGameType.find((err,items)=>{
                if(err) return reject(err);
                resolve(items)
            })
        })
    }

    findAll(obj,cb){
        let data = {};
        if(utils.isEmpty(obj.name)){
            data.name = {
                $regex:obj.name,
                $options:'i'
            }
        }
        if(utils.isEmpty(obj.typeId)){
            data.type = obj.typeId
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

                this.findGameType()
                    .then(gameType =>{
                        let item = items.map(value=>{
                            let type = gameType.find(val=>{
                                    return value.type == val._id
                                });
                            return {
                                id:value._id,
                                name:value.name,
                                desc:value.desc,
                                type:type._id,
                                typeName:type.name,
                                catena:value.catena,
                                tagStr:value.tagStr,
                                sizeStr:value.sizeStr,
                                versionStr:value.versionStr,
                                downloadStr:value.downloadStr,
                                createDate:value.createDate.toLocaleString(),
                            }
                        });

                        Db.find(function(err,total) {
                            if(err) return cb(null,err);
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
                    })
            }
        })
    }

    async create(obj,cb) {
        try {
            if(!utils.isEmpty(obj.name)){
                return cb('名称不能为空');
            }
            if(!utils.isEmpty(obj.type)){
                return cb('英文名称不能为空');
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
        let updateInfo = Object.assign({},obj);

        Db.updateOne({_id:id},updateInfo,(err,docs)=>{
            if(err) return cb(err);
            return cb(null,{code:1,data:true,msg:'成功'})
        })
    }

    deleteById(obj,cb) {
        let id = obj.id || null;
        Db.findOneAndDelete({_id:id},(err,docs)=>{
            if(err) return cb(err);
            return cb(null,{code:1,data:true,msg:'成功'})
        })
    }

}



module.exports = new Collection('gameDetail');
