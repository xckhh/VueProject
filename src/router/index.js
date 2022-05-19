import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routes = [
  {
    path: '/main',
    component: () => import('../views/main')
  },
  {
    path: '/personCenter',
    component: () => import('../components/personCenter')
  },
  {
    path: '/album',
    component: () => import('../components/album')
  },
  {
    path: '/browse',
    component: () => import('../components/browse')
  }
]
const router = new Router({
  mode: 'history',
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径 from 从哪个路径跳转而来 next 是一个函数 表示放行 next()放行  next('/login')强制跳转
  if (to.path === '/main') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有登录 强制跳转
  if (!tokenStr) return next('/main')
  // 已经登录 直接放行
  next()
})
export default router