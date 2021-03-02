import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 一级路由
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    // name: 'layout', // 拥有默认子路由时，此 name 没有意义
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 默认子路由，只能有一个
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  // 一级路由
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search')
  },
  // 页面配置到根级路由
  // 将路由动态参数映射到组件的 props 中，更推荐这种做法
  // props: true
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/acticle'),
    // props: true将路由动态参数映射到组件的 props 中，更推荐这种做法 开启路由传参
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
