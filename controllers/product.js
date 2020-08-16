var error = require('../common/error');
var Product = require('../models/product');

function Collection(){

}

Collection.prototype.findAll = function(obj,cb){
    let data = {};
    if(obj.name != null || obj.name.trim() !== ''){
        data.name = obj.name
    }
    if(obj.status != null || obj.status.trim() != ''){
        data.status = obj.status
    }
    let page = obj.page || 1;
    let pageSize = obj.pageSize || 10;

    let queryResult = Product.find(data)
        .limit(pageSize)
        .skip((page - 1) * pageSize)
        .sort({'createDate':-1});

    queryResult.exec((err,items)=>{
        if(err){
            cb(err)
        }else{
            Product.find(function(err,total) {
                let result = {
                    current:page,
                    pageNum:page,
                    pageSize:pageSize,
                    records:items,
                    total:total.length
                }
                cb(null,{
                    code:1,
                    data:result,
                    msg:'成功'
                })
            })
        }
    })
}

Collection.prototype.create = async function(obj,cb) {
    try {
        if(typeof obj.price !== Number){
            obj.price = parseInt(obj.price);
            if(isNaN(obj.price)){
                obj.price = 0;
            }
        }
        let data = await new Product(obj).save();

        cb(null,{
            code:1,
            data:true,
            msg:'成功'
        })
    } catch (e) {
        cb(null, e)
    }
    
}

Collection.prototype.update = function(obj,cb) {
    let id = obj._id || null;
    let updateInfo = {}
    
    if(obj.name) updateInfo.name = obj.name;
    if(obj.description) updateInfo.description = obj.description;
    if(obj.imgUrl) updateInfo.imgUrl = obj.imgUrl;
    if(obj.status  || obj.status == 0) updateInfo.status = obj.status;
    
    Product.updateOne({_id:id},updateInfo,(err,docs)=>{
        if(err) cb(err)
        cb(null,{code:1,data:true,msg:'成功'})
    })
}

Collection.prototype.delete = function(obj,cb) {
    console.log('delete---',obj);
    let id = obj.id || null;
    Product.findOneAndDelete({_id:id},(err,docs)=>{
        if(err) cb(err)
        cb(null,{code:1,data:true,msg:'成功'})
    })
}

module.exports.products = new Collection('products');
