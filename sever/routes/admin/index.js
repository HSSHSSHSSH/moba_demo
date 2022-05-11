module.exports = (app) => {

  const express = require('express')
  
  const jwt = require('jsonwebtoken')
  const router = express.Router({
    mergeParams:true  //合并父级url参数
  })  //子路由
  const multer = require('multer') //用于处理上传文件
  const upload = multer({dest:__dirname + '/../../uploads'}) //文件上传位置  dirname表示当前位置
  const assert = require('http-assert')
  const authMiddleware = require('../../middleware/auth')
  const resourceMiddlware = require('../../middleware/resource')
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

  app.use('/admin/api/rest/:resource', authMiddleware() ,resourceMiddlware(),router) //挂载子路由

  app.post('/admin/api/upload',upload.single('file'),async(req,res) => {
    const file = req.file  //使用中间件 为 req 挂载 file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login',async(req,res) => {
    const {username, password} = req.body
    //根据用户名找用户
    const AdminUser =require('../../models/AdminUser')
    const user = await AdminUser.findOne({username}).select('+password') //在模型字段设置中 password默认不取出
    assert(user,422,'用户不存在')
    // if(!user) {
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }
    //校验密码
    const isValid =  require('bcrypt').compareSync(password,user.password)
    assert(isValid,422,'密码错误')
    // if(!isValid) {
    //   return res.status(422).send({
    //     message: '密码错误'
    //   })
    // }
    //返回token
    
    const token =  jwt.sign({ id: user._id},app.get('secret'))  //生成token  客户端不需要密钥便可以解析出token 服务端可校验客户端传来的token来校验是否token被篡改过,通过jwt.verify
    res.send(token)
  })


  //集中处理异常
  app.use(async(err,req,res,next) =>{
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })

}