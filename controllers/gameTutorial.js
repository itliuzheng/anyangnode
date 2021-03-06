var error = require('../common/error');
var utils = require('../common/utils');
var Db = require('../models/gameTutorial');

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
        let data = {};
        if(utils.isEmpty(obj.title)){
            data.title = {
                $regex:obj.title,
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
                        title:value.title,
                        description:value.description,
                        imgUrl:value.imgUrl,
                        tag:value.tag,
                        content:value.content,
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

    autoFindAll(obj,cb,pageObj = {}){

        let page = pageObj.page || 1;
        let pageSize = pageObj.pageSize || 10;

        //分页
        let queryResult = Db.find(obj)
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .sort({'sort':1});

        queryResult.exec((err,items)=>{
            if(err){
                return cb(null,err)
            }else{

                let item = items.map(value=>{
                    return {
                        id:value._id.toString(),
                        title:value.title,
                        description:value.description,
                        imgUrl:value.imgUrl,
                        tag:value.tag,
                        content:value.content,
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

    find(obj,cb){

        let page = pageObj.page || 1;
        let pageSize = pageObj.pageSize || 10;

        //分页
        let queryResult = Db.find(obj)
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .sort({'sort':1});

        queryResult.exec((err,items)=>{
            if(err){
                return cb(null,err)
            }else{

                let item = items.map(value=>{
                    return {
                        id:value._id.toString(),
                        title:value.title,
                        description:value.description,
                        imgUrl:value.imgUrl,
                        tag:value.tag,
                        content:value.content,
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
                    title:detail.title,
                    imgUrl:detail.imgUrl,
                    description:detail.description,
                    tag:detail.tag,
                    content:detail.content,
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
            if(!utils.isEmpty(obj.title)){
                return cb('名称不能为空');
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
            if(utils.isEmpty(obj.title))updateInfo.title = obj.title;
            if(utils.isEmpty(obj.description))updateInfo.description = obj.description;
            if(utils.isEmpty(obj.imgUrl))updateInfo.imgUrl = obj.imgUrl;
            if(utils.isEmpty(obj.tag))updateInfo.tag = obj.tag;
            if(utils.isEmpty(obj.content))updateInfo.content = obj.content;
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
            this.autoFindAll(obj,(err,detail)=>{
                if(err) return reject(err);
                resolve(detail.data)
            })
        })
    }

    promiseFind(obj={}){
        return new Promise((resolve,reject) => {
            let page = obj.page || 1;
            let pageSize = obj.pageSize || 10;
            let sort = obj.sort || 1;
            obj.page && delete obj.page;
            obj.pageSize &&delete obj.pageSize;
            obj.sort && delete obj.sort;
            //分页
            let queryResult = Db.find(obj)
                .limit(pageSize)
                .skip((page - 1) * pageSize)
                .sort({'sort':sort});

            queryResult.exec((err,items)=>{
                if(err) return reject(null);
                let result = {
                    current:page,
                    pageNum:page,
                    pageSize:pageSize,
                    records:items,
                    total:items.length
                };
                return resolve(result)
            })
        })
    }

}




module.exports = new Collection('gameDetail');
