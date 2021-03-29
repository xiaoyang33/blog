
const router = require('koa-router')()
const ArticleOperation = require('../../mongoose/backStage/Operations')
const upload = require('../../utils/upLoadImg')
const {BaseUrl} = require('../../baseApi')  //测试地址
// 保存文章
router.post('/saveArticle',async (ctx)=>{
    let query = ctx.request.body
    let _id = query._id
    delete query._id
    // console.log(query,_id)
    let res= ''
    if(_id){
       res = await ArticleOperation.updateOne({_id},{...query})
    }else{
        let article = new ArticleOperation({
            ...ctx.request.body
        })
        res = await article.save()
    }
    
    if(!res){
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
// 查询文章
router.get('/findArticle',async (ctx)=>{
    let total = await ArticleOperation.count()
    let { pageSize = 10 , pageNum = 1 } = ctx.query
    ctx.query.pageNum && delete ctx.query.pageNum
    ctx.query.pageSize && delete ctx.query.pageSize
    ctx.query.total && delete ctx.query.total
    console.log(ctx.query)
    let data = await ArticleOperation.find({...ctx.query},{__v:false})
                                        //分页查询
                                      .skip((pageNum - 1) * pageSize).limit(Number(pageSize))
                                    //   console.log(data)
    ctx.body = {
        code:200,
        data:{
            total,
            data,
        }
    }
}),
// id查询文章
router.get('/findArticleById',async (ctx) => {
    let data = await ArticleOperation.findById(ctx.query._id,{__v:false})
    // console.log(ctx.query,data)
    ctx.body = {
        code:200,
        data:{
            data
        }
    }
})
// 推荐文章
router.get('/articleCommend',async (ctx)=>{
    let total = await ArticleOperation.count()
    let { pageSize = 10 , pageNum = 1 } = ctx.query
    ctx.query.pageNum && delete ctx.query.pageNum
    ctx.query.pageSize && delete ctx.query.pageSize
    ctx.query.total && delete ctx.query.total
    let data = await ArticleOperation.find({...ctx.query},{__v:false})
                                        //分页查询
                                      .skip((pageNum - 1) * pageSize).limit(Number(pageSize))
    ctx.body = {
        code:200,
        data:{
            total,
            data,
        }
    }
})
// 文章浏览量增加
router.get('/pageViewUpData',async (ctx)=>{
    let article = await ArticleOperation.findOne({_id:ctx.query._id})

    let data = await ArticleOperation.updateOne({_id:ctx.query._id},{pageView:Number(article.pageView+1)})
    // console.log(ctx.query,article,data)
    ctx.body = {
        code:200,
        data:'2222'
    }
})
// 删除文章
router.get('/deleteArticle',async (ctx)=>{
    let id = ctx.query.id
    let data = await ArticleOperation.remove({'_id':id})
    if(data.deletedCount> 0){
        ctx.body = {
            code:200,
            data:{
                msg:'删除成功'
            }
        }
    }
    
})
router.get('/sort',async (ctx)=>{
    let data = await ArticleOperation.find().sort({createDate:-1})
    console.log(data)
    ctx.body = 'ssss'
    
})
// 上传图片多张
router.post('/upLoadImgMany',upload.array('img'), async (ctx)=>{
    const files = ctx.req.files
    // console.log(files)
    ctx.body = {
        code:200,
        data:{
            imgUrl:`${BaseUrl}/images/blog-thumbnail/${files[0].filename}`,
            files,
        }
    }
})

// 二进制刘处理 上传单张图片
router.post('/upLoadImg',upload.single('img'), async (ctx)=>{
    const file = ctx.req.file
    console.log(file)
    ctx.body = {
        code:200,
        data:{
            imgUrl:`${BaseUrl}/images/blog-thumbnail/${file.filename}`
        }
    }
})






// 删除文章
router.put('/deleteArticle',async (ctx)=>{
    // let data = await articleOperation.find({})
    let data = await ArticleOperation.deleteMany({})
    console.log(data);
    ctx.body = '删除成功'
})

module.exports = router