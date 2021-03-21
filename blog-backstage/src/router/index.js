import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'Login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/main',
    name: 'Main',
    redirect: '/main/index',
    component: () => import('@/views/Main.vue'),
    children: [
      {
        name: 'Index',
        path: '/index',
        component: () => import('@/views/pages/Index.vue')
      },
      {
        name: 'WritePage',
        path: '/writepage',
        component: () => import('@/views/pages/WritePage.vue')
      },
      {
        name: 'AddCate',
        path:'/addCate',
        component: () => import('@/views/pages/AddCate.vue')
      },
      {
        name: 'ArticleManage',
        path:'/articleManage',
        component: () => import('@/views/pages/ArticleManage.vue')
      },
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
