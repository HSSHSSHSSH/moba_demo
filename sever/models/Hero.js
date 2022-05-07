const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    name: {type:String}, //英雄名称
    avatar: {type: String}, // 头像
    title: {type: String}, //称号
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}], //分类
    scores: {   //评分
        difficult: {type: Number},  //难度
        skills: {type: Number},   //技能
        attack: {type: Number},  //攻击力
        survive: {type: Number},//生存能力
    },
    skills: [{ //技能
        name: {type: String}, //技能名称
        icon: { type: String}, //技能图标
        description: { type: String}, //技能描述
        tips: { type : String} //技能小提示
    }],
    items1: [{type: mongoose.SchemaTypes.ObjectId,ref:'Item'}], //顺风出装
    items2: [{type: mongoose.SchemaTypes.ObjectId,ref:'Item'}], //逆风出装
    usageTips: {type: String}, //使用技巧
    battleTips: {type: String}, //对线技巧
    teamTips: {type: String}, //团战思路
    partners: {
        hero: {type: mongoose.SchemaTypes.ObjectId,ref: 'Hero'},
        description: {type:String}
    }
})


module.exports = mongoose.model('Hero',schema)