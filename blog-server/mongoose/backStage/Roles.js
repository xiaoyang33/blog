
const { model } = require('mongoose')
const myMongo = require('../mongoose')

const mongoose = myMongo('blogServer')
// edit编辑权限  0无  1有
let RolesScheam = mongoose.Schema({
    username:String,
    password:String,
    edit:{
        type:String,
        default:'0'
    }
})

let Roles = mongoose.model('user',RolesScheam)


module.exports = Roles