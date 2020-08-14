var util = require('util');

function NotFound(message){
    Error.call(this);
    Error.captureStackTrace(this,arguments.callee);  //指向正在执行的函数的指针
    this.statusCode = 404;
    this.message = message;
    this.name = 'NotFound';
}

function Server(message) {
    Error.call(this);
    Error.captureStackTrace(this,arguments.callee);  //指向正在执行的函数的指针
    this.statusCode = 200;
    this.message = message;
    this.name = 'Server';
}

function ErrorMessage(msg,data = null) {
    return {
        "code": -1,//	  业务错误码 	
        "data": data,//	  结果集 	
        "msg": msg//	  描述 	
    }
}

util.inherits(NotFound,Error);

module.exports = {
    NotFound:NotFound,
    Server:Server,
    ErrorMessage:ErrorMessage
}