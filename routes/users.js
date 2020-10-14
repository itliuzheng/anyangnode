var Users = require(`../controllers/users`)


module.exports.Register = function(req, res, next) {
    Users.regsiter(req.body, function(err, end) {
        if (err) return next(err);
        res.json(end);
    });
};

module.exports.login = function(req, res, next) {
    Users.login(req.body, function(err, user) {
        if (err) return next(err);
        Users.saveLogin(req,user);
        res.json(user);
    });
};


