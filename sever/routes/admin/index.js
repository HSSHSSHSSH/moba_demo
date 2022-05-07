module.exports = (app) => {

  const express = require('express')
  const inflection = require('inflection')
  const router = express.Router({
    mergeParams:true  //合并父级url参数
  })  //子路由
  const multer = require('multer') //用于处理上传文件
  const upload = multer({dest:__dirname + '/../../uploads'}) //文件上传位置  dirname表示当前位置
  
  //引入模型文件
  // const req.Model = require('../../models/req.Model')


 //curd接口
  router.post('/', async(req,res) =>{  
    const model = await req.Model.create(req.body) //创建类别数据
    res.send(model) //返回前端
  })

  router.get('/', async(req,res) =>{  
    let items
    if(req.Model.modelName === 'Category') {
      items = await req.Model.find().populate('parent').limit(10) //获取类别数据
    } else {
      items = await req.Model.find().limit(10)
    }
    res.send(items) //返回前端
  })

  router.get('/:id', async(req,res) =>{  
    const model = await req.Model.findById(req.params.id) //获取某一类别数据
    res.send(model) //返回前端
  })
  
  router.put('/:id', async(req,res) =>{  //修改某一类别数据
    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body) 
    res.send(model) //返回前端
  })
  
  router.delete('/:id', async(req,res) =>{  //删除某一类别数据
    const model = await req.Model.findByIdAndRemove(req.params.id) 
    res.send(model) //返回前端
  })

  app.use('/admin/api/rest/:resource',async(req,res,next) => {
    req.Model = require(`../../models/${inflection.classify(req.params.resource)}`)
    next()
  },router) //挂载子路由

  app.post('/admin/api/upload',upload.single('file'),async(req,res) => {
    const file = req.file  //使用中间件 为 req 挂载 file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}