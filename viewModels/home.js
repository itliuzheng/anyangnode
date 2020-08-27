var db = require(`../controllers/website`);



module.exports.home = function(req, res, next) {
    db.find(req.body, function(err, home) {
        if (err) return next(err);
        res.render('index.html',{
            home:home.data
        });
    });
};

module.exports.dashang = function(req, res, next) {
    res.render('dashang/index.html');
};

module.exports.vip = function(req, res, next) {
    res.render('vip/index.html');
};

