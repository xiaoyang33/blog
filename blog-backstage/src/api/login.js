
import request from './request'


export function login(options){
    return request({
        url:'/user/login',
        method:'post',
        data:options
    })
}