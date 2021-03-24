import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path:'/',
    redirect:'/home',
    component:()=>import('../views/Index.vue'),
    children:[
      {
        path:'/home',
        name:'Home',
        component:()=>import('../views/Home.vue')
      },
      {
        path:'/timeline',
        name:'TimeLine',
        component:()=>import('../views/TimeLine.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
