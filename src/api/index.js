// 引入axios
import axios from 'axios'
// 引入本地存储
import store from '@/store'
import router from '@/router'
// 配置基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 配置请求头
// axios.defaults.headers.Authorization = `Bearer ${store.getUser().token}`
// 添加请求拦截器 use--> 做什么
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(res => res, err => {
  // 获取状态码
  const status = err.response.status
  //   判断401
  if (status === 401) {
    // 跳转到登录页
    // 清空用户信息
    store.delUser()
    router.push('/login')
  }
})
// 导出axios
export default axios
