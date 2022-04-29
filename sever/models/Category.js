const mongoose = require('mongoose')

const schema = new mongoose.Schema({   //创建模型文件中的字段
    name: {type: String}
})


module.exports = mongoose.model('Category',schema)

