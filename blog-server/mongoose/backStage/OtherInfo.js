
const MyMongo = require('../mongoose')

const {mongoose , db} = MyMongo()
/* 
    type:
    '1' : 文章分类,
    '2' : 博客信息
*/

/* 
    articleClassIfy:文章分类
*/

let articleScheam = mongoose.Schema({
    type:String,
    articleClassIfy:String,
    createDate:{
        type:String,
        default:String(new Date().getTime())
    },
    userImg:String,
    userTitle:String,
    userDesc:String
},{
     collation: { locale: 'en_US', strength: 1 }
})

let otherInfo = db.model('otherInfo',articleScheam)

module.exports = otherInfo