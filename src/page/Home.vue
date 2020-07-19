<template>
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header>
        <div>
          <img src="../assets/logo.png" alt="">
          <span>ZR-Tools 后台管理系统工具</span>
        </div>
        <el-button size="mini" @click="logout">
          <i class="el-icon-user"></i>
          登出
        </el-button>
      </el-header>
      <!-- 页面主体区 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <!-- unique-opened 只允许打开制定的菜单 -->
          <el-menu
            unique-opened
            background-color="#333744"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu  v-for="item in menuList" :index="item.id + ''"  :key="item.id">
              <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.id + ''">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ subItem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <!-- <el-menu-ite -->
          </el-menu>
        </el-aside>
        <!-- 右侧内容主体 -->
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

</template>

<script>
export default {
  // Vue生命周期创建完成时的回调
  created () {
    // 创建完成后, 加载菜单数据.
    this.createMenu()
  },
  data () {
    return {
      menuList: [],
      iconsObj: {
        125: 'el-icon-user', // 用户属性
        103: 'el-icon-upload', // 上传功能图标
        101: 'el-icon-upload',
        102: 'el-icon-upload',
        145: 'el-icon-user'
      }
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async createMenu () {
      // this.$http
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      this.$message.success(JSON.stringify(res.data))
      console.log(JSON.stringify(this.menuList))
      return res.data
    }
  }
}
</script>

<style scoped>
  .home-container {
    height: 100%;
  }
  .el-header {
    background-color: #373d41;
    display: flex;
    padding-left: 0;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
  }

  .el-aside .el-menu {
    border: none;
  }

  .el-header div {
    display: flex;
    align-items: center;
  }

  .el-header div span {
    margin-left: 15px;
  }
  .el-aside {
    background-color: #333744;
  }
  .el-main {
    background-color: #fff;
  }
</style>>
