
const router = require('koa-router')()
const ArticleOperation = require('../../mongoose/backStage/Operations')
const upload = require('../../utils/upLoadImg')
const URL = 'http://localhost:25371'   //测试地址
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

// 上传图片多张
router.post('/upLoadImgMany',upload.array('img'), async (ctx)=>{
    const files = ctx.req.files
    // console.log(files)
    ctx.body = {
        code:200,
        data:{
            imgUrl:`${URL}/images/blog-thumbnail/${files[0].filename}`
        }
    }
})

// 二进制刘处理 上传单张图片
router.post('/upLoadImg',upload.single('img'), async (ctx)=>{
    const file = ctx.req.file
    // console.log(file)
    ctx.body = {
        code:200,
        data:{
            imgUrl:`${URL}/images/blog-thumbnail/${file.filename}`
        }
    }
})








// 删除文章
router.put('/deleteArticle',async (ctx)=>{
    // let data = await articleOperation.find({})
    let data = await ArticleOperation.deleteMany({articleTitle:'Xiaosaab'})
    console.log(data);
})

module.exports = router