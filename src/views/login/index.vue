<template>
  <div class="login" ref="box">
    <el-card class="box-card">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- :model 是动态绑定双向数据  是表单个元素 数据的集合 -->
      <!-- status-icon是校检图标  √ 或 ×  -->
      <!-- - el-form 属性 rules 指定校验规则
      - el-form-item 属性 prop 指定需要被校验的字段名称-->
      <el-form :model="loginForm" :rules="loginRules" status-icon ref="loginForm">
        <el-form-item prop="mobile">
          <!-- placeholder  是h5新增的标签 输入字段预期值的的提示信息
          在字段为空的时候显示 在字段获得焦点的时候消息-->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:236px"></el-input>
          <el-button type="success" style="margin-left:12px">获取验证码</el-button>
        </el-form-item>
        <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        <el-button @click="login()" type="primary" style="width:100%;margin-top:20px">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import '../../style/index.less'
export default {
  methods: {
    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$http.post(' http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then(res => {
              this.$router.push('/')
            })
            .catch(() => {
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  },
  data () {
    //   表单的数据对象
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号不合法'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '',
        code: ''
      },
      //   表单的校检规则对象
      loginRules: {
        //   校检手机属性
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'change' }

        ],
        // 校检验证码属性
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码长度为6位', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  // background-color: #ccc;
  position: absolute;
  top: 0;
  left: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .box-card {
    width: 400px;
    height: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto 30px;
    }
  }
}
</style>
