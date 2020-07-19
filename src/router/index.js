import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    component: () => import('../page/Login.vue')
  },
  {
    path: '/home',
    component: () => import('../page/Home.vue'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: () => import('../components/Welcome.vue')
      }
    ]
  },
  {
    path: '/userpage',
    component: () => import('../page/UserRegister.vue')
  }
]

const router = new VueRouter({
  routes
})

// 添加路由守卫, 如果没有权限验证过, 那么直接跳转到登录页面.

const routerGuardFunc = (to, from, next) => {
  // to 需要访问的路径
  // from 代表从哪个路径跳转过来
  // next 是一个函数, 表示放行

  if (to.path === '/login') return next()

  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
}

router.beforeEach(routerGuardFunc)

export default router
