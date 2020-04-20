
import Vue from 'vue'
import VueRouter from 'vue-router'
// @ts-ignore
// // import Home from '../views/Home.vue'
// const login = () => import(/* webpackChunkName: "login" */ '../views/login.vue')
const topList = () => import(/* webpackChunkName: "topList" */ '../views/topList')
const disc = () => import(/* webpackChunkName: "disc" */ '../views/disc')
const singerDetail = () => import(/* webpackChunkName: "singerDetail" */ '../views/singerDetail')
const recommend = () => import(/* webpackChunkName: "recommend" */ '@/views/recommend.vue')
const singer = () => import(/* webpackChunkName: "singer" */ '@/views/singer')
const rank = () => import(/* webpackChunkName: "rank" */ '@/views/rank')
const search = () => import(/* webpackChunkName: "search" */ '@/views/search')
const user = () => import(/* webpackChunkName: "user" */ '@/views/user')


Vue.use(VueRouter)
const VueRouterPush = VueRouter.prototype.push 
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: recommend,
    children: [{
      path: ':id',
      component: disc
    }]
  },
  {
    path: '/singer',
    name: 'singer',
    component: singer,
  
  },
  {
    path: '/detail/:id',
    name: 'singerDetail',
    component: singerDetail,
    meta:'noHead'
  },
  {
    path: '/rank',
    name: 'rank',
    component: rank,
    children:[{
      path:':id',
      component:topList
    }]
  },
  {
    path: '/search',
    name: 'search',
    component: search
  },
  {
    path: '/user',
    name: 'user',
    component: user
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior(to,from,savedPosition){
    return{
      x:0,
      y:0
    }
  }
})

export default router
