
import axios from 'axios'

const baseURL = '/api'

export default function(options){

    let instance = axios.create({
        baseURL,
        timeout:5000
    })


    // 请求拦截器
    instance.interceptors.request.use((config)=>{


        

        return config
    })


    // 响应拦截器

    instance.interceptors.response.use((res)=>{


        return res.data

    })
    return instance(options)

}