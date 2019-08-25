<template>
  <div>
    <el-container class="my-container">
      <el-aside :width="isCollapse?'64px':'200px'">
        <!-- <div class="logo" :class="{miniLogo:isCollapse}"></div> -->
        <div class="logo" :class="{miniLogo:isCollapse}"></div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-menu el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image">
            <i class="el-icon-menu el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-menu el-icon-position"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="el-icon-menu el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-menu el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-menu el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span @click="toggleAside()" class="icon el-icon-s-fold"></span>
          <span class="text">江苏传智播客科技教育有限公司</span>
          <el-dropdown class="my-el-dropdown">
            <span class="el-dropdown-link">
              <img id="touxiang" src="../../assets/images/avatar.jpg" alt />
              用户名称
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人设置</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
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
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    toggleAside () {
      console.log(1)
      this.isCollapse = !this.isCollapse
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
