import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Hello from '@/views/hello'
import Baocuo from '@/views/404'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: Login },
    { path: '/',
      // 嵌套路由时 父组件 不需要设置name

      // name: 'home',
      component: Home,
      children: [
        { path: '/', name: 'hello', component: Hello }
      ] },
    { path: '*', name: '404', component: Baocuo }
  ]
})
export default router
