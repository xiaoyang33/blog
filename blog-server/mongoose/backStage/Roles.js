
const { model } = require('mongoose')
const myMongo = require('../mongoose')

const {mongoose,db} = myMongo()
// edit编辑权限  0无  1有
let RolesScheam = mongoose.Schema({
    username:String,
    password:String,
    edit:{
        type:String,
        default:'0'
    }
},{
    collation: { locale: 'en_US', strength: 1 }
})

let Roles = db.model('user',RolesScheam)


module.exports = Roles