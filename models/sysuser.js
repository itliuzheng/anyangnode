var mongoose = require('./mongoose');

var Schema = mongoose.Schema;

var objSchema = new Schema({
    "userId": String,
    "name": String,         //	  菜单名称 	
    "code": String,         //	  资源识别码， 例如：user 	
    "type": String,         //	  菜单种类 	       1 目录 	       2 菜单 	       3 按钮 	
    "targetUrl": String,    //	  链接地址 	
    "parentId": {           //	  父级编号 	  默认没有父节点，值就是0 	
        type:Number,
        default:0
    },
    "description": String   //	  描述 	
});

module.exports = mongoose.model('Sysuser',objSchema)
