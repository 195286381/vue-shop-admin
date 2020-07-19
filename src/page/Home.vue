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
        <el-aside :width="menuSettings.isCollapse === true ? '64px': '200px'">
          <div class="toggle-btn" @click="toggleCollapse">
            <i :class="!menuSettings.isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
          </div>
          <!-- unique-opened 只允许打开制定的菜单 -->
          <!-- 为侧边栏开启路由模式 -->
          <el-menu
            :collapse="menuSettings.isCollapse"
            :collapse-transition="false"
            :router="true"
            unique-opened
            background-color="#333744"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu v-for="item in menuList" :index="item.id + ''"  :key="item.id">
              <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="'/' +subItem.path">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
            <!-- <el-menu-ite -->
          </el-menu>
        </el-aside>
        <!-- 内容主体 -->
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
        <!-- 右侧菜单项, 用于操作菜单内容 -->
        <el-aside class="right-aside" :class="propertyMenuClass" :width="propertyMenu.isCollapse === true ? '30px' : '300px'">
          <div class="right-aside-menu">
              <i :class="propertyMenuCollapseIcon"  @click="togglePropertyMenuCollapse"></i>
              <i class="el-icon-user selected"></i>
              <i class="el-icon-user"></i>
              <i class="el-icon-user"></i>
              <i class="el-icon-user"></i>
          </div>
          <div class="right-aside-content">
            aside-content
          </div>
        </el-aside>
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
      propertyMenu: {
        isCollapse: false
      },
      menuSettings: {
        isCollapse: false
      },
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
  computed: {
    propertyMenuClass () {
      return {
        'property-menu-collapse': this.propertyMenu.isCollapse,
        'property-menu-open': !this.propertyMenu.isCollapse
      }
    },
    propertyMenuCollapseIcon () {
      return {
        'el-icon-s-fold': this.propertyMenu.isCollapse,
        'el-icon-s-unfold': !this.propertyMenu.isCollapse

      }
    }
  },
  methods: {
    toggleCollapse () {
      this.menuSettings.isCollapse = !this.menuSettings.isCollapse
    },
    togglePropertyMenuCollapse () {
      this.propertyMenu.isCollapse = !this.propertyMenu.isCollapse
    },
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

  .toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .el-aside .el-menu {
    border: none;
  }

  .el-header div {
    display: flex;
    align-items: center;
  }

  .toggle-btn {
    margin: 10px 0 0;
    font-size: 24px;
  }

  .el-header div span {
    margin-left: 15px;
  }
  .el-aside {
    /* background-color: #333744; */
    background-color: #333744;
  }
  .el-main {
    background-color: #fff;
  }

  .right-aside {
    background-color: #fff;
    display: flex;
    overflow: hidden;
  }

  .right-aside .right-aside-menu {
    box-sizing: border-box;
    border-right: 1px solid #2b3b5b;
    border-left: 1px solid #2b3b5b;
    display: flex;
    flex-flow: column nowrap;
    width: 30px;
    /* background-color: #666; */
  }

  .right-aside .right-aside-menu i {
    width: 28px;
    height: 30px;
    line-height: 30px;
    font-size: 24px;
    text-align: center;
    padding: 5px 0;
  }

  .right-aside .right-aside-menu .selected {
    background-color: #DCDFE6;
  }
  .right-aside .right-aside-content {
    box-sizing: border-box;
    width: 270px;
    text-align: center;
  }

  .right-aside .right-aside-menu i:hover:nth-child(1) {
    background-color: #fff;
    cursor: pointer;
  }

  .right-aside .right-aside-menu i:hover {
    background-color: #C0C4CC;
    cursor: pointer;
  }

  .property-menu-open {
    width: 300px;
  }

  .property-menu-collapse {
    width: 30px;
  }
</style>>
