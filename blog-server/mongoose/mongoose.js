


const myMongo = (collections)=>{
    const mongoose = require('mongoose')

    // const DB_URL = 'mongodb://139.196.253.225:27017/blogServer'
    const DB_URL = 'mongodb://127.0.0.1:27017/blogServer'

    let db = mongoose.createConnection(DB_URL)

    // let db = mongoose.connection

    db.once('open',()=>{
        console.log('数据库链接成功')
    })

    db.on('error',(err)=>{
        console.log('数据库链接出错')
    })
    return {
        mongoose,
        db
    }
}

module.exports = myMongo