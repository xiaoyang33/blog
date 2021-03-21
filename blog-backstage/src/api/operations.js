
import request from './request'


export default {
    // 保存文章
    saveArticle(options){
        return request({
            url:'/operation/saveArticle',
            method:'post',
            data:options
        })
    },
    // 查询文章
    findArticle(options){
        return request({
            url:'/operation/findArticle',
            method:'get',
            params:options
        })
    },
    // 删除文章
    deleteArticle(options){
        return request({
            url:'/operation/deleteArticle',
            method:'get',
            params:options
        })
    },

    // 上传图片单张
    upLoadImg(options){
        return request({
            url:'/operation/upLoadImg',
            method:'post',
            data:options
        })
    },
    // 上传图片多张
    upLoadImgMany(options){
        return request({
            url:'/operation/upLoadImgMany',
            method:'post',
            data:options
        })
    },

    // 添加文章分类
    saveArticleClassIfy(options){
        return request({
            url:'/other/addArticleCate',
            method:'get',
            params:options
        })
    },
    // 查询文章分类
    findArticleClassIfy(options){
        return request({
            url:'/other/findArticleClassIfy',
            method:'get',
            params:options
        })
    },
    // 删除文章分类
    deleteArticleClassIfy(options){
        return request({
            url:'/other/deleteArticleClassIfy',
            method:'get',
            params:options
        })
    },
}