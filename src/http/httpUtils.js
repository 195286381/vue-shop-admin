import Vue from 'vue'
import axios from 'axios'

const DEFAULT_BASE_URL = 'https://www.liulongbin.top:8888/api/private/v1/'
// 使用axios作为vue的$http.
axios.defaults.baseURL = DEFAULT_BASE_URL
Vue.prototype.$http = axios
