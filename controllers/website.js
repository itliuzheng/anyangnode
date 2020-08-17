// var error = require('../common/error');
// var Product = require('../models/product');
var utils = require('../common/utils')

class Collection {

    createAndUpdate(obj,cb){
        let id = obj._id || null;
        let updateInfo = {};

        if(obj.name) updateInfo.name = obj.name;
        if(obj.description) updateInfo.description = obj.description;
        if(obj.imgUrl) updateInfo.imgUrl = obj.imgUrl;
        if(obj.status  || obj.status == 0) updateInfo.status = obj.status;

        Product.updateOne({_id:id},updateInfo,(err,docs)=>{
            if(err) cb(err)
            cb(null,{code:1,data:true,msg:'成功'})
        })
    }

}

console.log(utils.isEmpty('name'))

// module.exports.products = new Collection('products');
