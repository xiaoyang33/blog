
const MyMongo = require('../mongoose')

const {mongoose , db} = MyMongo()
/* 
    type:
    '1' : 文章分类
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
    }
},{
     collation: { locale: 'en_US', strength: 1 }
})

let otherInfo = db.model('otherInfo',articleScheam)

module.exports = otherInfo