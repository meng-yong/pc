// 负责:用户的 存储 读取 删除 三个函数
const KEY = 'hm-toutiao-pc-user'
export default {
  //    存储
  setUser (user) {
    //   将传进来的数据转化成  json 类型的字符串
    const josnStr = JSON.stringify(user)
    // 储存数据
    window.sessionStorage.setItem(KEY, josnStr)
  },
  //    读取
  getUser () {
    //   通过key 来换取数据
    //  如果没有数据是null null.token会报错 {}.token是undefined
    const jsonStr = window.sessionStorage.getItem(KEY) || '{}'
    // 将数据转换成json对象
    return JSON.parse(jsonStr)
  },
  //    删除
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
