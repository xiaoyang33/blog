import dayjs from 'dayjs'

export const formateUnix = (unix)=>{

    return dayjs(unix).format('YYYY年MM月DD日')
}