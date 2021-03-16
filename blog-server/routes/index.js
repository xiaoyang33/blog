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


router.use('/user',user.routes(),user.allowedMethods())
router.use('/operation',operation.routes(),operation.allowedMethods())

// 后台结束

module.exports = router
