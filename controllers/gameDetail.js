var error = require('../common/error');
var utils = require('../common/utils');
var { gameType } = require('../controllers/gameType');
var DbGameType = require('../models/gameType');
var Db = require('../models/gameDetail');
var pyfl = require('pyfl').default;

class Collection{

    gameDetailfindById(obj={}){
        return new Promise((resolve ,reject)=> {
            Db.findOne(obj,(err,detail)=>{
                if(err) return reject(err);
                resolve(detail)
            })
        })
    }

    findGameType(obj={}){
        return new Promise((resolve ,reject)=> {
            DbGameType.find(obj,(err,items)=>{
                if(err) return reject(err);
                resolve(items)
            })
        })
    }

    findGameTypeOne(obj={}){
        return new Promise((resolve ,reject)=> {
            DbGameType.findOne(obj,(err,items)=>{
                if(err) return reject(err);
                resolve(items)
            })
        })
    }

    gameTypeSave(obj = {},catena){
        return new Promise((resolve ,reject)=> {
            let id = obj._id;
            DbGameType.updateOne({_id:id},{
                $addToSet:{
                    catena:catena
                }
            },(err,data)=>{
                if(err) return reject(err);
                resolve(data)
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
        if(utils.isEmpty(obj.catenaCode)){
            data.catenaCode = obj.catenaCode
        }

        if(utils.isEmpty(obj.nameCode)){
            data.nameCode = obj.nameCode
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
                    .then(gameTypes =>{
                        let item = items.map(value=>{
                            let type = gameTypes.find(val=>{
                                    return value.type == val._id
                                });
                            return {
                                id:value._id,
                                name:value.name,
                                nameCode:value.nameCode,
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

                        let result = {
                            current:page,
                            pageNum:page,
                            pageSize:pageSize,
                            records:item,
                            total:items.length
                        };
                        return cb(null,{
                            code:1,
                            data:result,
                            msg:'成功'
                        })
                    })
            }
        })
    }

    async findById(obj,cb){
        try {
            if(!utils.isEmpty(obj.id)){
                return cb('id不能为空');
            }

            let detail = await this.gameDetailfindById({
                _id:obj.id
            });

            return cb(null,{
                code:1,
                data:detail,
                msg:'成功'
            })

        }catch (e) {
            return cb(null, e)
        }
    }

    async create(obj,cb) {
        try {
            if(!utils.isEmpty(obj.name)){
                return cb('名称不能为空');
            }
            if(!utils.isEmpty(obj.type)){
                return cb('所属分类不能为空');
            }

            obj.nameCode = pyfl(obj.name);

            if(utils.isEmpty(obj.catena)){
               let gameTypeInfo = await this.findGameTypeOne({_id:obj.type});
               let catenaObj = {
                   name:obj.catena,
                   code:pyfl(obj.catena)
               }
               await this.gameTypeSave(gameTypeInfo,catenaObj);
               obj.catenaCode = pyfl(obj.catena);
            }


            await new Db(obj).save();

            return cb(null,{
                code:1,
                data:true,
                msg:'成功'
            })
        } catch (e) {
            return cb(null, e)
        }

    }

    async update(obj,cb) {
        try {
            let id = obj.id || null;
            let updateInfo = Object.assign({},obj);


            if(utils.isEmpty(obj.catena)){
               let gameTypeInfo = await this.findGameTypeOne({name:obj.typeName});
               let catenaObj = {
                   name:obj.catena,
                   code:pyfl(obj.catena)
               }
               await this.gameTypeSave(gameTypeInfo,catenaObj);
               updateInfo.catenaCode = pyfl(obj.catena);
            }

            Db.updateOne({_id:id},updateInfo,(err,docs)=>{
                if(err) return cb(err);
                return cb(null,{code:1,data:true,msg:'成功'})
            })
        } catch (e) {
            return cb(null, e)
        }
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
