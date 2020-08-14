var error = require('../common/error');
var Product = require('../models/product');

function Collection(){

}

// await new User(obj).save()

Collection.prototype.find = function(body,cb) {
    let id = parseInt(body.id,10);
    var obj = this.store[id];
    if(obj){
        cb(null,obj)
    }else{
        cb(new error.NotFound('Item not found'))
    }
}

Collection.prototype.findAll = async function(obj,cb){
    try{
        let data = {};
        if(obj.name){ data.name = obj.name }
        if(obj.status){ data.name = obj.status }

        let items = await Product.find(data)

        cb(null,{
            code:1,
            data:items,
            msg:'成功'
        })

    }catch(e){
        cb(null, e)
    }
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
    let id = obj.id || null;
    this.find(id,function(err,item) {
        if(err) return cb(err);

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                item[key] = obj[key];
            }
        }
        
        cb(null,item);
    })
}

module.exports.products = new Collection('products');