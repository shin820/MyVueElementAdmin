<template>
    <el-menu
      mode="horizontal"
      :default-active="$route.path"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <nav-menu-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"></nav-menu-item>

      <div class="right-menu">
        <error-log class="errLog-container right-menu-item"></error-log>

        <!-- <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
          <screenfull class="screenfull right-menu-item"></screenfull>
        </el-tooltip>

        <lang-select class="international right-menu-item"></lang-select>

        <el-tooltip effect="dark" :content="$t('navbar.theme')" placement="bottom">
          <theme-picker class="theme-switch right-menu-item"></theme-picker>
        </el-tooltip> -->

        <el-dropdown class="avatar-container right-menu-item" trigger="click">
          <div class="avatar-wrapper">
            <!-- <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
            <i class="el-icon-caret-bottom"></i> -->
            <i class="el-icon-more"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/">
              <el-dropdown-item>
                首页
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span @click="logout" style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import NavMenuItem from './NavMenuItem'
import ErrorLog from '@/components/ErrorLog'

export default {
  components: { NavMenuItem, ErrorLog },
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
  },
  methods: {
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        // margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
        .el-icon-more{
          color:rgb(191, 203, 217);
          position: absolute;
          right: -10px;
          top: 20px;
          font-size: 18px;
        }
      }
    }
  }
</style>


