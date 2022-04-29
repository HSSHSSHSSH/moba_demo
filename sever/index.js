const express = require('express')

const app = express() 


app.use(require('cors')())
app.use(express.json())

require('./routes/admin')(app)  //路由
require('./plugin/db')(app) //数据库





app.listen('3000',() =>{
    console.log('服务端在3000端口监听');
})