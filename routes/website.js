var db = require(`../controllers/website`);

module.exports.upload = function(req, res, next) {
    db.upload(req, function(err, user) {
        if (err) return next(err);
        res.json(user);
    });
};

module.exports.createAndUpdate = function(req, res, next) {
    db.createAndUpdate(req.body, function(err, user) {
        if (err) return next(err);
        res.json(user);
    });
};

module.exports.find = function(req, res, next) {
    db.find(req.body, function(err, user) {
        if (err) return next(err);
        res.json(user);
    });
};

