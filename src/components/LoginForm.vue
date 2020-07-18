<template>
  <div class="login-form">
    <el-form label-width="60px" label-position="right">
      <el-form-item label="姓名" size="mini">
        <el-input v-model="username"></el-input>
      </el-form-item >
      <el-form-item label="密码" size="mini">
        <el-input v-model="password"></el-input>
      </el-form-item>
      <el-form-item label="确认" size="mini">
        <el-input></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login-form',
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style>
  .login-form {

  }
</style>
