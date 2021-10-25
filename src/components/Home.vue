<template>
  <el-container class="home_container">
    <el-header>
      <el-avatar src="@/assets/logo.png"></el-avatar>
      <span> 管理系统 </span>
      <el-button @click="quitLogin"> 退出 </el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle_btn" @click="toggleCollapse"> ||| </div>
        <el-menu
          ref="menuRef"
          active-text-color="#ffd04b"
          background-color="#545c64"
          text-color="#fff"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
        >
          <!-- 一级菜单 -->
          <el-sub-menu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <template #title>
              <i :class="iconObj[item.id]"></i>
              <span> {{item.name}} </span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + submenu.name +''" v-for="submenu in item.children" :key="submenu.id">
              <i class="el-icon-menu"></i>
              {{submenu.name}}
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { ElMessage } from 'element-plus';
export default {
  data() {
    return {
      menuList: [],
      iconObj: ['el-icon-user', 'el-icon-user', 'el-icon-user', 'el-icon-location'],
      isCollapse: false
    };
  },
  created() {
    console.log("created")
    this.getMenu()
  },
  methods: {
    quitLogin() {
      window.sessionStorage.clear();
      this.$router.push("login");
    },
    async getMenu() {
      const {data: rsp} = await this.$http.get("menus")
      console.log(rsp)
      if (!rsp.meta.status == 200) return ElMessage.error(rsp.meta.msg)
      this.menuList = rsp.data
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse 
    }
  },
};
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
}

.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #ecf5ff;
  align-items: center;
}

.el-aside {
  background-color: darkgrey;

  .toggle_btn {
    background-color: darkgray;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }

  .el-menu {
    border-right: none;
  };

}
</style>
