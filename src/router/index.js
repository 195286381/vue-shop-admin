import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/index' },
  { path: '/index', component: () => import('../page/Login.vue') }
]

const router = new VueRouter({
  routes
})

export default router
