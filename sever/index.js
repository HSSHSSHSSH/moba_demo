const express = require('express')

const app = express() 

app.set('secret','hshshshshsh') //为app实例挂载全局变量 应该是一个环境变量
app.use(require('cors')())
app.use(express.json())

app.use('/uploads',express.static(__dirname + '/uploads')) //静态文件托管 让uploads下的文件可通过 /uploads来访问

require('./routes/admin')(app)  //路由
require('./plugin/db')(app) //数据库





app.listen('3000',() =>{
    console.log('服务端在3000端口监听');
})