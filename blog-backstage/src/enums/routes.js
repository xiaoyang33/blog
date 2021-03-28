
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
        title:'文章管理',
        path:'/manageMent',
        icon:'el-icon-s-tools',
        children:[
            {
                title:'添加分类',
                path:'/addCate',
                icon:'el-icon-s-unfold',
            },
            {
                title:'文章管理',
                path:'/ArticleManage',
                icon:'el-icon-s-release',
            }
        ]
    },
    {
        title:'个人信息',
        path:'/bloginfo',
        icon:'el-icon-s-tools',
    }
]