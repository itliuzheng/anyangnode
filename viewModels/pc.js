var db = require(`../controllers/gameDetail`);



module.exports.index = function(req, res, next) {
    db.findAll({}, function(err, content) {
        if (err) return next(err);
        res.render('pc/index.html',{
        });
    });
};

