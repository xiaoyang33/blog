
const router = require('koa-router')()

const otherInfo = require('../../mongoose/backStage/OtherInfo')
const ArticleOperation = require('../../mongoose/backStage/Operations')
/* 
type:分类
    '1' 文章分类
    '2' 个人信息
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

// 个人信息编辑
router.get('/saveInfo',async (ctx)=>{
    // console.log(ctx.query)
    let res ;
    let isHas = await  otherInfo.findOne({type:'2'})
    if(!isHas){
        let user = new otherInfo({
            type:'2',
            ...ctx.query
        })
        res = await user.save()
        // console.log(res)
    }else{
        res = await otherInfo.updateOne({_id:isHas._id},{...ctx.query})
    }
    if(res){
        ctx.body = {
            code:200,
            data:{
                msg:'保存成功'
            }
        }
    }
})
// 获取个人信息
router.get('/getUserInfo',async (ctx) => {
    let user = await  otherInfo.findOne({type:'2'},{__v:false,type:false,createDate:false})
    let total = await ArticleOperation.count()
    let classIfyNum = await otherInfo.find({type:'1'}).count()
    // console.log(user,classIfyNum)
    ctx.body = {
        code:200,
        data:{
            user,
            total,
            classIfyNum
        }
    }
})


module.exports = router