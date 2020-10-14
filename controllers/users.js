var error = require('../common/error');
var User = require('../models/users');
var MD5 = require('blueimp-md5');
var Token = require('../common/token');
var { isEmpty } = require('../common/utils');

const { MD5_KEY } = require('../private_data');

class Collection {

    /**
     * 用户注册
     * @param params = {
     *      loginName: String
     *      mobile: Number
     *      password: String
     * }
     * @param cb
     * @returns {Promise<void>}
     */
    async regsiter(params,cb){
        let ret = null;
        try {
            let { loginName ,mobile ,password } = params;
            if (!isEmpty(mobile)) return cb(null,error.ErrorMessage('手机号不能为空!'));
            if (!isEmpty(password)) return cb(null,error.ErrorMessage('密码不能为空!'));
            if(!isEmpty(loginName)){
                loginName = mobile
            }
            password = MD5(password,MD5_KEY);

            ret = await new User({
                loginName,
                mobile,
                password
            }).save();

            cb(null,{
                code : 1,
                data:null,
                msg:'注册成功'
            })

        }catch (e) {
            cb(new error.NotFound(e))
        }
    }

    /**
     * 登录
     * @param body
     * @param cb
     * @returns {Promise<void>}
     */
    async login(body = {},cb) {
        let password = MD5(body.password,MD5_KEY);

        try{
            let result = await User.findOne({
                loginName:body.loginName,
                password:password
            })

            if(result){
                let username = result.loginName;
                let userid = result._id;
                let token = await Token.setToken(username,userid,'1 days');

                cb(null,{
                    code : 1,
                    data:token,
                    msg:'登录成功'
                })
            }else{
                cb(null,error.ErrorMessage('用户名或密码错误'))
            }
        }catch (e){
            cb(new error.NotFound(e))
        }
    }

    saveLogin(req,user){
        req.session.token = user.data;
    }
    loginOut(req){
        delete req.session.token
    }
}



module.exports = new Collection('users');
