<template>
  <div>
    <el-container class="my-container" >
      <el-aside :width="isCollapse?'64px':'200px'">
        <!-- <div class="logo" :class="{miniLogo:isCollapse}"></div> -->
        <div class="logo" :class="{miniLogo:isCollapse}"></div>
        <!-- $router是调用函数的  用法  this.$router.push();
        $route 是调用数据  用法  this.$route.query/params -->
        <!-- query 是获取地址栏 ?key=value的传参 this.$route.query.key-->
        <!-- params 是获取地址栏  user/:id的传参  user/100  this.$route.params.id -->
        <!-- $route.path 当前路径 -->
        <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <!-- 属性的时候  如果是布尔类型的属性  有属性代码true  没有属性代表false -->
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
       <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span @click="toggleAside()" class="icon el-icon-s-fold"></span>
          <span class="text">江苏传智播客科技教育有限公司</span>
          <el-dropdown class="my-el-dropdown" @command="clickItem">
            <span class="el-dropdown-link">
              <img id="touxiang" :src="photo" alt />
              <span>{{name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- @click.native 是是组件绑定原生的事件 -->
              <el-dropdown-item command="setting">个人设置</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
            <!-- 这里是二级路由占位符 -->
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  created () {
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    toggleAside () {
      // console.log(1)
      this.isCollapse = !this.isCollapse
    },
    clickItem (command) {
      this[command]()
    },
    setting () {
      this.$router.push('/setting')
      this.$message('跳转成功')
    },
    logout () {
      store.delUser()
      this.$router.push('/login')
      this.$message('退出成功')
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .el-header {
    border-bottom: 1px solid #ddd;
    .text {
      line-height: 60px;
      vertical-align: middle;
      font-weight: 700;
    }
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
      margin-right: 4px;
    }
    .my-el-dropdown {
      font-weight: 700;
      float: right;
      line-height: 60px;
      #touxiang {
        width: 30px;
        height: 30px;
        vertical-align: middle;
        margin-right: 6px;
      }
    }
  }
  .el-aside {
    background-color: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/images/logo_admin.png) no-repeat
        center / 140px auto;
    }
    .miniLogo{
        background-image: url(../../assets/images/logo_admin_01.png);
        background-size: 36px auto;
    }
    .el-menu{
        border-right: none;
    }
  }
}
</style>
