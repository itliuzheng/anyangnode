var db = require(`../controllers/gameType`)

module.exports.list = function(req,res,next) {
    db.gameType.findAll(req.body,function(err,products) {
        if(err) return next(err)
        res.json(products)
    })
}

module.exports.create = function(req,res,next) {
    db.gameType.create(req.body,function(err,product) {
        if(err) return next(err)
        res.json(product)
    })
}

module.exports.update = function(req,res,next) {
    db.gameType.update( req.body, function(err, product) {
      if (err) return next(err);
      res.json(product);
    });
}

module.exports.delete = function(req,res,next) {
    db.gameType.delete( req.query, function(err, product) {
      if (err) return next(err);
      res.json(product);
    });
}

// module.exports.find = function(req, res, next) {
//     db.products.find(req.param('id'), function(err, user) {
//       if (err) return next(err);
//       res.send(user);
//     });
// };


