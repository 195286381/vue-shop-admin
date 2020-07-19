<template>
  <div class="login-container">
    <div class="login-box">
      <div class="avator-box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 添加 ref 是为了获取引用重置表单 -->
      <el-form class="login-form-box" ref="loginFormRef" :model="loginForm" :rules="rules" label-position="left" label-width="0" label-suffix=":">
        <el-form-item size="mini" prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="默认用户名: admin"></el-input>
        </el-form-item>
        <el-form-item size="mini" prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" placeholder="默认密码: 123456"></el-input>
        </el-form-item>
        <el-form-item class="login-form-button-group" size="mini">
          <el-button type="primary" @click="login" :loading="isLoading">登入</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  // 组件的数据区域
  data () {
    return {
      isLoading: false,
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        // 用户名校验.
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符之间', trigger: 'blur' }
        ],
        // 用户密码校验.
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符之间', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    toggleClose () {

    },
    login () {
      this.isLoading = true
      this.$refs.loginFormRef.validate(async valid => {
        console.log('valid result: ' + valid)
        if (!valid) return // 验证不通过, 则直接返回.
        // 发起登陆的请求.
        const { data: res } = await this.$http.post('login', this.loginForm)
        this.isLoading = false
        console.log('hll')
        console.log('res: ' + JSON.stringify(res))
        if (res.meta.status !== 200) {
          this.$message.error('登录失败')
        }
        this.$message.success('登录成功')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    },
    resetLoginForm () {
      console.log(this)
      // 重置表单元素
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style scoped>
  .login-container {
    height: 100%;
    background-color: #2b4b6b;
  }

  .login-box {
    width: 400px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    padding: 20px;
  }

  .login-box .avator-box {
    height: 130px;
    width: 130px;
    padding: 10px;

    border: 1px solid #eee;
    background-color: #fff;
    border-radius: 50%;

    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
  }

  .login-box .login-form-box {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    left: 0;
    bottom: 20px;

  }

  .login-box .login-form-button-group {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
  }

  .avator-box img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
</style>
