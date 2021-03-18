
const MyMongo = require('../mongoose')

const {mongoose , db} = MyMongo()

let articleScheam = mongoose.Schema({
    articleTitle:String,
    articleContent:String,
    tag:String,
    thumbnail:String,
    createDate:{
        type:String,
        default:String(new Date().getTime())
    }
},{
     collation: { locale: 'en_US', strength: 1 }
})

let articleOperation = db.model('articleOperation',articleScheam)

module.exports = articleOperation