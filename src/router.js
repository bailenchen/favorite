import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/login/Login.vue'
import Myfavorite from './pages/favorite/Myfavorite.vue'
import Collects from './pages/favorite/components/collects.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/favorite/',
      component: Myfavorite,
      redirect: '/favorite/1',
      children: [
        { path: '/favorite/:id', component: Collects },
        { path: '/favorite/search', component: Collects }
      ]
    }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
