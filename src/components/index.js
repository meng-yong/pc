// 封装一个插件，目的全局注册components下所有的组件。
// 引入组件
import MyBread from '@/components/my-bread'
import MyChannel from '@/components/channel'
import MyImages from '@/components/my-images'
export default {
  install (vue) {
    // Vue 对象  main.js 使用 Vue.use(插件) 调用install函数，传入当前的Vue对象
    vue.component(MyBread.name, MyBread)
    vue.component(MyChannel.name, MyChannel)
    vue.component(MyImages.name, MyImages)
  }
}
