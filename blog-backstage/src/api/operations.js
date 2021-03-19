
import request from './request'


export default {

    saveArticle(options){
        return request({
            url:'/operation/saveArticle',
            method:'post',
            data:options
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
    }
}