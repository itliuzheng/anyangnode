var db = require(`../controllers/sysuser`)


module.exports.resources = function(req, res, next) {
    db.sysuser.resources(req.token, function(err, data) {
        if (err) return next(err);
        res.json({
            code:1,
            data:data,
            msg:'成功'
        });
    });
};

