
import request from './request'


export default  {
    // 获取文章
    getArticle(options){
        return request({
            methods:'get',
            url:'/operation/findArticle',
            params:options
        })
    },
    // 通过文章id读取文章
    getArticleById(options){

        return request({
            methods:'get',
            url:'/operation/findArticleById',
            params:options
        })

    },

    // 获取用户信息
    getUserInfo(options){
        return request({
            methods:'get',
            url:'/other/getUserInfo',
            params:options
        })
    },
    
    // 文章浏览量增加
    updataPageView(options){
        return request({
            url:'/operation/pageViewUpData',
            method:'get',
            params:options
        })
    },

}