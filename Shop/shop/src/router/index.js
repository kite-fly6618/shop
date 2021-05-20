import Vue from 'vue'
import VueRouter from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Main from '@/components/pages/Main'

Vue.use(VueRouter)

const routes = [
  {path: '/main',name: 'main',component:Main ,children: [
    {path: '/', name: 'ShoppingMall', component: () => import('@/components/pages/ShoppingMall')},
    {path: '/categoryList', name: 'CategoryList', component: () => import('@/components/pages/CategoryList')},
    {path: '/cart', name: 'Cart', component: () => import('@/components/pages/Cart')},
    {path: '/profile', name: 'Profile', component: () => import('@/components/pages/Profile')},

  ]},
  {path: '/register', name: 'register', component: () => import('@/components/pages/Register')},
  {path: '/login', name: 'login', component: () => import('@/components/pages/Login')},
  {path: '/goods:goodsId', name: 'Goods', component: () => import('@/components/pages/Goods')},
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
