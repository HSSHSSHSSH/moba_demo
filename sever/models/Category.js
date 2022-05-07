const mongoose = require('mongoose')

const schema = new mongoose.Schema({   //创建模型文件中的字段
    name: {type: String},
    parent: {type: mongoose.SchemaTypes.ObjectId,ref:'Category'}  //关联类型
})


module.exports = mongoose.model('Category',schema)

