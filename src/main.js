import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

// main.js 是入口文件
// 职责:
//     ①负责依赖资源的全局导入
//     ②创建一个vue根实例，去管理index.html的div容器
