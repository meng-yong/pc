<template>
    <div class="login">
        <el-card class="box-card">
            <img src="../../assets/images/logo_index.png" alt="">
            <!-- :model 是动态绑定双向数据  是表单个元素 数据的集合 -->
            <el-form :model="loginForm">
                <el-form-item>
                    <!-- placeholder  是h5新增的标签 输入字段预期值的的提示信息
                    在字段为空的时候显示 在字段获得焦点的时候消息 -->
                    <el-input placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入验证码" style="width:236px" ></el-input>
                    <el-button type="success" style="margin-left:12px">获取验证码</el-button>
                </el-form-item>
                <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
                <el-button type="primary" style="width:100%;margin-top:20px">登录</el-button>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import '../../style/index.less'
export default {
  data () {
    return {
      loginForm: {
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login{
    width: 100%;
    height: 100%;
    // background-color: #ccc;
    position: absolute;
    top: 0;
    left: 0;
    background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
    .box-card{
        width: 400px;
        height: 350px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        img{
            width: 200px;
            display: block;
            margin: 0 auto 30px;
        }
    }
}
</style>
