import dayjs from 'dayjs'

export const formateUnix = (unix)=>{

    return dayjs(unix - 0).format('YYYY年MM月DD日')
}
export const isSameDay = (unix) => {

    return dayjs().isSame(unix - 0,'date')

}