const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const Roles = require('../../mongoose/backStage/Roles')
const { SIGNATURE } = require('../emnu')

function getTime(day = 1) {
    let data = new Date().getTime()
    return data + 1000 * 60 * 60 * 24 * day
}

router.post('/register', async (ctx)=>{
    let { username , password } = ctx.request.body
    console.log(username,password)
    let data = await Roles.findOne({username})
    if(data && data._id){
        ctx.body = {
            code:100400,
            msg:'用户名已存在'
        }
    }else{
        let user = new Roles({
            username,
            password
        })
        await user.save()
         ctx.body = {
            code:200,
            msg:'注册成功'
        }
    }
})

router.post('/login',async (ctx)=>{
    let { username , password } = ctx.request.body
    let data = await Roles.findOne({username})
    if(!data){
        ctx.body = {
            code:100400,
            data:{
                msg:'账号不存在'
            }
        }
    }else if(data.password !== password){
        ctx.body = {
            code:100400,
            data:{
                msg:'密码错误'
            }
        }
    }else{
        let token = await jwt.sign({username,edit:data.edit,timeout:getTime()},SIGNATURE)
        // console.log(token);
        // let ver = await jwt.verify(token,SIGNATURE)
        ctx.body = {
            code:200,
            data:{
                msg:'登陆成功',
                token,
            }
        }
        
    }
})




module.exports = router