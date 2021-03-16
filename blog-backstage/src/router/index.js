import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
      path:'/',
      redirect:'Login'
    },
    {
      path:'/login',
      name:'Login',
      component:()=>import('../views/user/Login.vue')
    },
    {
      path:'/index',
      name:'Index',
      component:()=>import('../views/mainPages/index.vue')
    }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
