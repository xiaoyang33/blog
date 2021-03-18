
// 只支持一层嵌套
export default   [
    {
        title:'首页',
        path:'/index',
        icon:'el-icon-s-custom'
    },
    {
        title:'发布文章',
        path:'/writepage',
        icon:'el-icon-s-order'
    },
    {
        title:'导航三',
        path:'/aaa',
        icon:'el-icon-menu',
        children:[
            {
                title:'导航三-一',
                path:'/bbb',
                icon:'el-icon-menu',
            },
            {
                title:'导航三-二',
                path:'/ccc',
                icon:'el-icon-menu',
            }
        ]
    },
]