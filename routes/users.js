var db = require(`../controllers/users`)


module.exports.Register = function(req, res, next) {
    db.users.regsiter(req.body, function(err, end) {
        if (err) return next(err);
        res.json(end);
    });
};

module.exports.login = function(req, res, next) {
    db.users.login(req.body, function(err, user) {
        if (err) return next(err);
        res.json(user);
    });
};


