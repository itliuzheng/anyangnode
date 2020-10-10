var mongoose = require('mongoose');
var fs = require('fs');

fs.readFile('./mongodb.json','utf-8',(err,data)=>{
   if(err){
       console.log('读取不到数据库文件：'+ err);
       return false
   }else{
       let Data = JSON.parse(data);
       mongoose.connect(Data.address, {useNewUrlParser: true, useUnifiedTopology: true });
       mongoose.connection.on('connected',function(){
           console.log('数据库已连接')
       });
       mongoose.connection.on('error',function(err){
           console.log('数据库连接异常：'+ err);
       });
       mongoose.connection.on('disconnected',function(){
           console.log('数据库断开');
       })
   }
});


module.exports = mongoose;
