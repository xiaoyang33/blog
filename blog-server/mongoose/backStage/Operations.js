
const MyMongo = require('../mongoose')

const {mongoose , db} = MyMongo()

/* 
    articleTitle:文章标题
    articleContent:文章内容
    tag:标签
    thumbnail:缩略图
    classIfy:分类
*/

let articleScheam = mongoose.Schema({
    articleTitle:String,
    articleContent:String,
    tag:String,
    thumbnail:String,
    classIfy:String,
    pageView:{
        type:Number,
        default:1
    },
    isChangeTop:{
        type:Number,
        default:9999
    },
    createDate:{
        type:String,
        default:String(new Date().getTime())
    }
},{
     collation: { locale: 'en_US', strength: 1 }
})

let articleOperation = db.model('articleOperation',articleScheam)

module.exports = articleOperation