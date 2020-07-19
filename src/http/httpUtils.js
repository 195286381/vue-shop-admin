import Vue from 'vue'
import axios from 'axios'

const DEFAULT_BASE_URL = 'https://www.liulongbin.top:8888/api/private/v1/'
// 使用axios作为vue的$http.
axios.defaults.baseURL = DEFAULT_BASE_URL
axios.interceptors.request.use(config => {
  console.log(123)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios
