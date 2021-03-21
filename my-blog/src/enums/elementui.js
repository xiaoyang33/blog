
import {
    Header,
    Aside,
    Main,
    Container,
    Icon
}
from 'element-ui'

const element = {
    install:function(Vue){
        Vue.use(Header)
        Vue.use(Aside)
        Vue.use(Main)
        Vue.use(Container)
        Vue.use(Icon)
    }
}

export default element