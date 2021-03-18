
import request from './request'


export default {

    saveArticle(options){
        return request({
            url:'/operation/saveArticle',
            method:'post',
            data:options
        })
    }

}