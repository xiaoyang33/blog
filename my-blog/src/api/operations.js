
import request from './request'


export default  {

    getArticle(options){
        return request({
            methods:'get',
            url:'/operation/findArticle',
            params:options
        })
    }

}