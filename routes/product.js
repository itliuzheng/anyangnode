var db = require(`../controllers/product`)

module.exports.list = function(req,res,next) {
    db.products.findAll(req.body,function(err,products) {
        if(err) return next(err)
        res.json(products)
    })
}

module.exports.create = function(req,res,next) {
    db.products.create(req.body,function(err,product) {
        if(err) return next(err)
        res.json(product)
    })
}

// module.exports.update = function(req,res,next) {
//     db.products.update( req.body, function(err, user) {
//       if (err) return next(err);
//       res.json(user);
//     });
// }

// module.exports.find = function(req, res, next) {
//     db.products.find(req.param('id'), function(err, user) {
//       if (err) return next(err);
//       res.send(user);
//     });
// };


