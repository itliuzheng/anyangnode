var db = require(`../controllers/friendLink`)

module.exports.getById = function(req,res,next) {
    db.findById(req.params,function(err,products) {
        if(err) return next(err)
        res.json(products)
    })
}

module.exports.list = function(req,res,next) {
    db.findAll(req.body,function(err,products) {
        if(err) return next(err)
        res.json(products)
    })
}

module.exports.create = function(req,res,next) {
    db.create(req.body,function(err,product) {
        if(err) return next(err)
        res.json(product)
    })
}

module.exports.update = function(req,res,next) {
    db.update( req.body, function(err, product) {
      if (err) return next(err);
      res.json(product);
    });
}

module.exports.deleteById = function(req,res,next) {
    db.deleteById( req.query, function(err, product) {
      if (err) return next(err);
      res.json(product);
    });
}



