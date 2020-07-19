<template>
  <div class="login-container">
      <CenterCol :span="2">111</CenterCol>
  </div>
</template>

<script>
import CenterCol from '../components/CenterCol'
export default {
  components: {
    CenterCol
  },
  data () {
    return {
      registerForm: {
        username: '',
        password: '',
        isBoxOpen: true
      }
    }
  },
  methods: {
    resetLoginForm () {
      console.log('nothing to do!')
    }
  }
}
</script>

<style>

</style>
