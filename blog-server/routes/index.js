const router = require('koa-router')()
/* 
  返回信息格式
  ctx.body = {
    code:状态码,
    data:响应数据
  }

*/
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})


// 后台开始
const user = require('./backStage/user')
const operation = require('./backStage/operation')
const other = require('./backStage/otherInfo')


router.use('/user',user.routes()).use(user.allowedMethods())
router.use('/operation',operation.routes(),operation.allowedMethods())
router.use('/other',other.routes(),other.allowedMethods())

// 后台结束

module.exports = router
