var error = require('../common/error');
var Website = require('../models/website');
var utils = require('../common/utils');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');


//确保存在目录data
var dataDir = path.resolve(__dirname,'../data');
var tmpDir = path.join(dataDir,'tmp');
var vacationPhotoDir = path.join(dataDir,'photo');


//判断文件目录是否存在， 不存在则创建
fs.existsSync(dataDir) || fs.mkdirSync(dataDir);
fs.existsSync(tmpDir) || fs.mkdirSync(tmpDir);
fs.existsSync(vacationPhotoDir) || fs.mkdirSync(vacationPhotoDir);

class Collection {

    upload(req,cb){
        let form = new formidable.IncomingForm();
        // form.encoding = 'utf-8';
        form.uploadDir = tmpDir; //设置上传目录
        // form.keepExtensions = true; //保留后缀
        // form.type = true;

        form.parse(req,function (err, fileds, files) {
            if(err) return cb(err);
            //上传域
            let file = files.img;
            let extName = '';
            console.log(file.type);
            switch (file.type) {
                case 'image/pjpeg':
                    extName = 'jpg';
                    break;
                case 'image/jpeg':
                    extName = 'jpg';
                    break;
                case 'image/png':
                    extName = 'png';
                    break;
                case 'image/x-png':
                    extName = 'png';
                    break;
                case 'image/x-icon':
                    extName = 'ico';
                    break;
                default:
                    extName = '';
            }
            if(extName.length === 0){
                cb('只支持png/jpg/ico格式图片')
            }else{
                //未避免用户们上传同名图片，用时间戳来创建唯一目录，用户不会同一毫秒内都上传同一名称文件
                // var dir = path.join(vacationPhotoDir,Date.now());
                var dir = vacationPhotoDir + '/'+Date.now();
                var _path = path.join(dir,Date.now()+'.'+extName);
                fs.mkdirSync(dir);
                console.log(file.path);
                //file.path是formidable创建的临时文件
                fs.renameSync(file.path,_path);

                /**
                 * 可以将路径传到数据库存在
                 */

                cb(null,{
                    code:1,
                    data:_path,
                    msg:'成功'
                })
            }
        })

    }

    find(obj,cb){
        let body = {
            _id:1
        };
        Website.findOne(body)
            .then((result)=>{
                let docs = null;
                if(result) {
                    docs = {
                        name:result.name,
                        websiteUrl:result.websiteUrl,
                        logoUrl:result.logoUrl,
                        title:result.title,
                        keywords:result.keywords,
                        description:result.description,
                        insideContact:result.insideContact,
                        footer:result.footer,
                        mobile:result.mobile,
                        modifyDate:result.modifyDate.toLocaleString(),
                    }
                }
                return cb(null,{
                    code:1,
                    data:docs,
                    msg:'成功'
                });
            });
    }

    async createAndUpdate(obj,cb){
        let body = {};
        if(!utils.isEmpty(obj.name)){
            cb('网站名称不能为空');
        }
        if(!utils.isEmpty(obj.websiteUrl)){
            cb('网站网址不能为空');
        }
        if(!utils.isEmpty(obj.logoUrl)){
            cb('logo不能为空');
        }
        if(!utils.isEmpty(obj.title)){
            cb('首页标题不能为空');
        }
        if(!utils.isEmpty(obj.keywords)){
            cb('网站关键字不能为空');
        }
        if(!utils.isEmpty(obj.description)){
            cb('网站描述不能为空');
        }
        if(utils.isEmpty(obj.insideContact)){
            body.insideContact = obj.insideContact;
        }
        if(utils.isEmpty(obj.footer)){
            body.footer = obj.footer;
        }
        if(utils.isEmpty(obj.mobile)){
            body.mobile = obj.mobile;
        }
        body.name = obj.name;
        body.websiteUrl = obj.websiteUrl;
        body.logoUrl = obj.logoUrl;
        body.title = obj.title;
        body.keywords = obj.keywords;
        body.description = obj.description;
        body._id = 1;

        try {

            let result = await Website.findOne({
                _id:body._id
            });

            if(!result){
                await new Website(body).save()
            }else{
                await Website.updateOne({_id:body._id},
                    body)
            }
            cb(null,{
                code:1,
                data:true,
                msg:'成功'
            })
        }catch (err) {
            cb(err)
        }
    }

}

module.exports.website = new Collection('webiste');
