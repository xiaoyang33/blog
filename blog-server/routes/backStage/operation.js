
const router = require('koa-router')()

router.get('/',(ctx)=>{
    console.log(ctx.header)
    ctx.body= 'aaaa'
})

module.exports = router