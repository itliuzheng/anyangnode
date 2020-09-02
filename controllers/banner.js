var error = require('../common/error');
var utils = require('../common/utils');
var Db = require('../models/banner');

class Collection{

    gameDetailfindById(obj={}){
        return new Promise((resolve ,reject)=> {
            Db.findOne(obj,(err,detail)=>{
                if(err) return reject(err);
                resolve(detail)
            })
        })
    }


    findAll(obj,cb){

        let queryResult = Db.find(obj).sort({'createDate':1});

        queryResult.exec((err,items)=>{
            if(err){
                return cb(null,err)
            }else{
                let item = items.map(value=>{
                    return {
                        id:value._id.toString(),
                        name:value.name,
                        url:value.url,
                        imgUrl:value.imgUrl,
                        typeId:value.typeId,
                        sort:value.sort,
                        createDate:value.createDate.toLocaleString(),
                    }
                });

                return cb(null,{
                    code:1,
                    data:item,
                    msg:'成功'
                })
            }
        })
    }

    findAllPage(obj,cb){
        let page = obj.page || 1;
        let pageSize = obj.pageSize || 10;

        if(obj.page) delete obj.page;
        if(obj.pageSize) delete obj.pageSize;

        //分页
        let queryResult = Db.find(obj)
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .sort({'createDate':1});

        queryResult.exec((err,items)=>{
            if(err){
                return cb(null,err)
            }else{

                let item = items.map(value=>{
                    return {
                        id:value._id.toString(),
                        name:value.name,
                        url:value.url,
                        imgUrl:value.imgUrl,
                        typeId:value.typeId,
                        sort:value.sort,
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
                data:{
                    id:detail._id,
                    name:detail.name,
                    url:detail.url,
                    typeId:value.typeId,
                    imgUrl:value.imgUrl,
                    sort:detail.sort,
                    createDate:detail.createDate.toLocaleString(),
                },
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
            if(!utils.isEmpty(obj.typeId)){
                return cb('banner类型不能为空');
            }
            if(!utils.isEmpty(obj.imgUrl)){
                return cb('图片不能为空');
            }

            await new Db(obj).save();

            return cb(null,{
                code:1,
                data:true,
                msg:'成功'
            })
        } catch (e) {
            return cb(e)
        }

    }

    async update(obj,cb) {
        try {
            let id = obj.id || null;
            let updateInfo = {};
            if(utils.isEmpty(obj.name))updateInfo.name = obj.name;
            if(utils.isEmpty(obj.url))updateInfo.url = obj.url;
            if(utils.isEmpty(obj.imgUrl))updateInfo.imgUrl = obj.imgUrl;
            if(utils.isEmpty(obj.typeId))updateInfo.typeId = obj.typeId;
            if(utils.isEmpty(obj.sort))updateInfo.sort = obj.sort;

            Db.updateOne({_id:id},updateInfo,(err,docs)=>{
                if(err) return cb(err);
                return cb(null,{code:1,data:true,msg:'成功'})
            })
        } catch (e) {
            return cb( e)
        }
    }

    deleteById(obj,cb) {
        let id = obj.id || null;
        Db.findOneAndDelete({_id:id},(err,docs)=>{
            if(err) return cb(err);
            return cb(null,{code:1,data:true,msg:'成功'})
        })
    }

    promiseFindAll(obj={}){
        return new Promise((resolve ,reject)=> {
            this.findAll(obj,(err,detail)=>{
                if(err) return reject(err);
                resolve(detail.data)
            })
        })
    }
}

module.exports = new Collection('banner');
