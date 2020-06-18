<template>
  <div class="container">
    <div class="content">
      <div class="login-box">
        <!-- Login -->
        <div class="logo"></div>
        <!-- 表单 -->
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          label-position="top"
        >
          <!-- 账号 -->
          <el-form-item label="账号" prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <div class="forget-box">
            <div class="forget">
              <span>忘记密码</span>
            </div>
            <div class="register">
              <span>注册</span>
            </div>
          </div>
          <el-button round @click="login">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
let md5 = require('md5')

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('user', ['setIsLogin']),
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', {
          username: this.loginForm.username,
          password: md5(this.loginForm.password + 'q3aRcrQ3EvaQXeyC8')
        })
        if (res.meta.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功')
        // 保存token
        sessionStorage.setItem('token', res.data.token)
        sessionStorage.setItem('user', res.data.username)
        // console.log(res.data)
        this.$http.defaults.headers.common['Authorization'] = sessionStorage.getItem('token')
        this.setIsLogin(res.data.username)
        this.$router.push('/favorite')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  background-image: url(~@/assets/bg.jpg);
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  width: 430px;
  height: 540px;
  background: #fff;
  border-radius: 30px;
}
.logo {
  width: 200px;
  height: 80px;
  cursor: pointer;
  border-radius: 40px;
  margin: 30px auto;
  text-align: center;
  line-height: 80px;
  font-size: 26px;
  background: url(~@/assets/logo.png);
  background-size: 200px 80px;
}
.el-form {
  width: 280px;
  margin: auto;
}
.forget-box {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}
.forget {
  color: rgb(136, 136, 136);
  cursor: pointer;
}
.register {
  cursor: pointer;
  color: rgb(102, 102, 102);
}
.el-button {
  margin-top: 14px;
  width: 150px;
  height: 40px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #7bad37;
  color: #fff;
  color: rgb(222, 222, 2220);
}
.el-button:hover {
  color: #fff;
  background-color: #7bad37;
}
</style>
