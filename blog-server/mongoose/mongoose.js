


const myMongo = (collections)=>{
    const mongoose = require('mongoose')

    const DB_URL = 'mongodb://139.196.253.225:27017/'

    mongoose.connect(DB_URL + collections)

    let db = mongoose.connection

    db.on('open',()=>{
        console.log('数据库链接成功')
    })

    db.on('error',(err)=>{
        console.log('数据库链接出错')
    })
    return mongoose
}

module.exports = myMongo