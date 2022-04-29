module.exports = (app) => {

  const express = require('express')
  const router = express.Router()  //子路由
  
  //引入模型文件
  const Category = require('../../models/Category')


 //curd接口
  router.post('/categories', async(req,res) =>{
    const model = await Category.create(req.body) //创建数据
    console.log('req.body',req.body);
    console.log('model',model)
    res.send(model) //返回前端
  })



  app.use('/admin/api',router) //挂载子路由
}