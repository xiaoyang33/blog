
import axios from 'axios'

import baseURL from './baseApi'

export default function request(config){

    const instance =  axios.create({
        baseURL,
        timeout:5000
    })

    instance.interceptors.request.use(config => {
        

        return config

    })
    
    instance.interceptors.response.use( result => {
        return result.data
    } )

    return instance(config)

}