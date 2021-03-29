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
    redirect:'/',
    component:()=>import('../views/Index.vue'),
    children:[
      {
        path:'/',
        name:'Home',
        component:()=>import('../views/Home.vue')
      },
      {
        path:'/timeline',
        name:'TimeLine',
        component:()=>import('../views/TimeLine.vue')
      },
      {
        path:'/article/:id',
        name:"Article",
        component:()=>import('../views/Article.vue')
      },
      {
        path:'otherlink',
        name:"OtherLink",
        component:()=>import('../views/OtherLink.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
