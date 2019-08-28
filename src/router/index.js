import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Hello from '@/views/hello'
import Baocuo from '@/views/404'
// 引入 store 路由
import store from '@/store'
// 引入Article 组件
import Article from '@/views/Article'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // { path: '', redirect: '/login' },
    { path: '/login', name: 'login', component: Login },
    { path: '/',
      // 嵌套路由时 父组件 不需要设置name

      // name: 'home',
      component: Home,
      children: [
        { path: '/', name: 'hello', component: Hello },
        { path: '/article', name: 'Article', component: Article }
      ] },
    { path: '*', name: '404', component: Baocuo }
  ]
})
router.beforeEach((to, from, next) => {
  // 当去的时候是登录的时候 就放行
  // if (to.path === '/login') return next()
  // // 不是登录状态就去登录页token面
  // if (!store.getUser().token) return next('/login')
  // next()
  if (!store.getUser().token && to.path !== '/login') return next('/login')
  next()
})

export default router
