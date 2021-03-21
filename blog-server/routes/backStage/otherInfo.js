
const router = require('koa-router')()

const otherInfo = require('../../mongoose/backStage/OtherInfo')
/* 
    '1' 文章分类

*/
// 添加文章分类
router.get('/addArticleCate', async (ctx) => {
    console.log(ctx.query)

    let classIfy = new otherInfo({
        type: '1',
        articleClassIfy: ctx.query.title
    })
    let res = await  classIfy.save()
    console.log(res)
    if (res._id) {
        ctx.body = {
            code: 200,
            data: {
                msg: '保存成功'
            }
        }
    }
})
// 文章分类查询
router.get('/findArticleClassIfy', async (ctx) => {
    let data = await otherInfo.find({ 'type': '1' }, { '__v': false, type: false ,createDate:false})
    // console.log(data)
    ctx.body = {
        code: 200,
        data
    }

})

// 文章分类删除
router.get('/deleteArticleClassIfy',async (ctx)=>{
    let id = ctx.query.id
    let res = await otherInfo.remove({'_id':id})
    // console.log(res,id)
    if(res.deletedCount > 0){
        ctx.body = {
            code:200,
            data:{
                msg:'删除成功'
            }
        }
    }
})


module.exports = router