import Vue from 'vue' // 跟组件
import App from './App.vue'
// import ElementUi from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import router from '@/router'
// Vue.use(ElementUi)
// 引入 elment-ui 组件库
import ElmentUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//  引入router 路由 router.js
import router from '@/router'
// 简单配置axios
import axios from '@/api'
// 引入组件封装的组件
import myPlugin from '@/components'
Vue.prototype.$http = axios

// 注册 eu 实力
Vue.use(ElmentUi)

Vue.use(myPlugin)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// main.js 是入口文件
// 职责:
//     ①负责依赖资源的全局导入
//     ②创建一个vue根实例，去管理index.html的div容器
