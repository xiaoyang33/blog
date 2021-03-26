let baseURL = ''
// 获取环境变量
let env = process.env.NODE_ENV
if(env === 'DEV'){
    baseURL = '/api'
}else if(env === 'PROD'){
    baseURL = 'http://139.196.253.225:25371'
}

export default baseURL