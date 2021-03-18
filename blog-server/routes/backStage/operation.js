
const router = require('koa-router')()
const ArticleOperation = require('../../mongoose/backStage/Operations')
// 保存文章
router.post('/saveArticle',async (ctx)=>{
    let article = new ArticleOperation({
        articleTitle:'Xiaosaab',
        articleContent:'你好啊啊 Html'
    })
    let err = await article.save()
    console.log(err);
    if(!err){
        ctx.body = {
            code:100400,
            data:{
                msg:'保存失败'
            }
        }
    }else{
        console.log('保存成功');
        ctx.body = {
            code:200,
            data:{
                msg:'保存成功'
            }
        }
    }
})
// 删除文章
router.put('/deleteArticle',async (ctx)=>{

    // let data = await articleOperation.find({})
    let obj = {articleTitle:'Xiaosaab'}
    let data = await ArticleOperation.deleteMany(obj)
    console.log(data);
    ctx.body = 'hhhhh'
})

module.exports = router