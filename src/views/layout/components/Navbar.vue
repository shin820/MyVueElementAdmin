<template>
  <div>
    <div class="menu-header"><span class="portal-name">智慧通监管端</span></div>
    <el-menu class="menubar" mode="horizontal">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

      <breadcrumb class="breadcrumb-container"></breadcrumb>
      <div class="right-menu">
        <error-log class="errLog-container right-menu-item"></error-log>

        <!-- <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
          <screenfull class="screenfull right-menu-item"></screenfull>
        </el-tooltip> -->

        <!-- <lang-select class="international right-menu-item"></lang-select>

        <el-tooltip effect="dark" :content="$t('navbar.theme')" placement="bottom">
          <theme-picker class="theme-switch right-menu-item"></theme-picker>
        </el-tooltip> -->
        <!-- <div class="right-menu-item" @click="goToMonitor">
          <v-icon name="expand"></v-icon>
        </div> -->
        <el-dropdown class="right-menu-item" trigger="hover">
          <div>
            <v-icon name="question-circle"></v-icon>
          </div>
          <el-dropdown-menu slot="dropdown">
            <a @click="guild">
              <el-dropdown-item>
                <svg-icon icon-class="question-circle"/><span @click="guild">操作指引</span>
              </el-dropdown-item>
            </a>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="right-menu-item" trigger="hover">
          <div class="settings">
            <!-- <img class="user-avatar" src="@/assets/people.png"> -->
            <v-icon name="user"></v-icon>
            <!-- <svg-icon icon-class="setting"></svg-icon> -->
            <!-- <i style="color:#ffffff" class="el-icon-caret-bottom"></i> -->
            <!-- <i class="el-icon-more"></i> -->
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/">
              <el-dropdown-item>
                <svg-icon icon-class="dashboard"/>首页
              </el-dropdown-item>
            </router-link>
            <a @click="logout">
              <el-dropdown-item divided>
                <svg-icon icon-class="logout"/><span>退出登录</span>
              </el-dropdown-item>
            </a>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
// import LangSelect from '@/components/LangSelect'
// import ThemePicker from '@/components/ThemePicker'
import * as Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './guildSteps'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull
    // LangSelect,
    // ThemePicker
  },
  data() {
    return {
      driver: null
    }
  },
  mounted() {
    this.driver = new Driver({
      opacity: 0.75,
      padding: 10,
      doneBtnText: '完成',
      closeBtnText: '关闭',
      nextBtnText: '下一步',
      prevBtnText: '上一步'
    })

    var isFirst = this.$ls.get('isFirst')
    if (!isFirst) {
      this.$ls.set('isFirst', true)
      this.guild()
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    guild() {
      this.driver.defineSteps(steps)
      this.driver.start()
    },
    goToMonitor() {
      this.$router.push({ name: 'monitor' })
    }
  }
}
</script>
