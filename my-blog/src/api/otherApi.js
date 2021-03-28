import request from './request'


export default {

    getArticleClassIfy(options){
        return request({
            methods:'get',
            url:'/other/findArticleClassIfy',
            params:options
        })
    }

}