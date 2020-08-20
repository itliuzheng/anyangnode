var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/user',
    {useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected',function(){
    console.log('数据库已连接')
})

mongoose.connection.on('error',function(err){
    console.log('数据库连接异常：'+ err);
})

mongoose.connection.on('disconnected',function(){
    console.log('数据库断开');
})




module.exports = mongoose;