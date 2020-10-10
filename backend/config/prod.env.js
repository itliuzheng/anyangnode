'use strict'
var buildtype = process.argv.slice(2)[0];
console.log('---------start build ---------'+buildtype);
var obj = {
  NODE_ENV: '"production"',
  BASE_API:'"http://119.147.171.111:81/e-factoring"'
}

switch(buildtype){
  case 'test'://测试
    process.argv.srconfig = 'test';
    obj.srconfig = '"test"';
    obj.BASE_API = '"/"';
    break;
  default://默认
    process.argv.srconfig = 'pro';
    obj.srconfig = '"pro"';
    obj.BASE_API = '"/"';
    break;
}

module.exports = obj
