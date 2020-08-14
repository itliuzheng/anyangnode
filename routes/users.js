var db = require(`../controllers/users`)

// module.exports.index = function(req,res,next) {
//     db.users.findAll(function(err,users) {
//         if(err) return next(err)
//         res.json(users)
//     })
// }

// module.exports.create = function(req,res,next) {
//     db.users.create(req.body,function(err,user) {
//         if(err) return next(err)
//         res.json(user)
//     })
// }

// module.exports.update = function(req,res,next) {
//     db.users.update( req.body, function(err, user) {
//       if (err) return next(err);
//       res.json(user);
//     });
// }

// module.exports.find = function(req, res, next) {
//     db.users.find(req.param('id'), function(err, user) {
//       if (err) return next(err);
//       res.send(user);
//     });
// };

module.exports.login = function(req, res, next) {
    db.users.login(req.body, function(err, user) {
        if (err) return next(err);
        res.json(user);
    });
};

