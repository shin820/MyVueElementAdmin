<template>
<div>
  <el-row class="stats" :gutter="8">
    <el-col v-if="stats.stats&&stats.stats.length%2==0" :span="24">
      <div class="msg-block clickable" @click="goToProjList(null,'项目列表')" style="background-color:#3c8dbc">
        <div><svg-icon icon-class="app store"></svg-icon></div>
        <div>项目总数{{stats.total}}个(总投资{{stats.totalAmount|chineseAmount}})</div>
      </div>
    </el-col>
  </el-row>
  <el-row class="stats" :gutter="8">
    <el-col v-if="stats.stats&&stats.stats.length%2!=0" :span="span">
      <div class="msg-block clickable" @click="goToProjList(null,'项目列表')" style="background-color:#3c8dbc">
        <div><svg-icon icon-class="app store"></svg-icon></div>
        <div>项目总数{{stats.total}}个</div>
      </div>
    </el-col>
    <el-col v-for="stat in stats.stats" :key="stat.phaseId" :span="span">
      <div class="msg-block clickable" @click="goToProjList(stat.phaseId,stat.phaseName+'项目')" :style="getStyle(stat.phaseValue)">
        <div><svg-icon :icon-class="getIcon(stat.phaseValue)"></svg-icon></div>
        <div>{{stat.phaseName}}{{stat.count}}个</div>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <!-- :scroll-wheel-zoom="true" -->
      <baidu-map :style="{height:height,width:width}" :center="center" :zoom="12">
          <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
          <bm-marker v-for="proj in projects" :key="proj.name" @click="infoWindowOpen(proj)" :position="{lng: proj.lng, lat: proj.lat}" animation="NONE">
            <bm-label :content="proj.name" @click="infoWindowOpen(proj)" :labelStyle="labelStyle(proj)" :offset="{width: 20, height: 0}"/>
            <bm-info-window :show="proj.showInfo" :title="getTitle(proj)" @close="infoWindowClose(proj)" @open="infoWindowOpen(proj)" :width="360" :autoPan="true">
              <el-row class="header"><el-col :span="24"><b>项目概况</b></el-col></el-row>
              <el-row>
                <el-col :span="12"><span>总投资：</span>{{proj.investmentAmount|chineseAmount}}</el-col>
                <el-col :span="12"><span>负责人：</span>{{proj.legalPerson}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>开工时间：</span>{{proj.startTime|date}}</el-col>
                <el-col :span="12"><span>竣工时间：</span>{{proj.completionTime|date}}</el-col>
              </el-row>
              <el-row class="header"><el-col :span="24"><b>投资进度</b></el-col></el-row>
              <el-row>
                <el-col :span="12"><span>合同金额：</span>{{proj.contractAmount|chineseAmount}}</el-col>
                <el-col :span="12"><span>计划金额：</span>{{proj.planAmount|chineseAmount}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>完成金额：</span>{{proj.completeAmount|chineseAmount}}</el-col>
              </el-row>
              <el-row class="header"><el-col :span="24"><b>质量问题</b></el-col></el-row>
              <el-row>
                <el-col :span="12"><span>问题总数：</span>{{proj.qualityIssueNum}}</el-col>
                <el-col :span="12"><span>未处理：</span>{{proj.qualityIssueUnFixNum}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>已处理：</span>{{proj.qualityIssueFixedNum}}</el-col>
              </el-row>
              <el-row class="header"><el-col :span="24"><b>安全问题</b></el-col></el-row>
              <el-row>
                <el-col :span="12"><span>问题总数：</span>{{proj.safetyIssueNum}}</el-col>
                <el-col :span="12"><span>未处理：</span>{{proj.safetyIssueUnFixNum}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><span>已处理：</span>{{proj.safetyIssueFixedNum}}</el-col>
              </el-row>
            </bm-info-window>
          </bm-marker>
        </baidu-map>
    </el-col>
  </el-row>
</div>
</template>

<script>
import Vue from 'vue'
import { getProjectMapOverview, getProjectMapInfoList } from '@/api/project'
import { goToList } from '../utils'

import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'NU1XFbBSV7gck6fKLbhuic2iX0KzRIVd'
})

export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      stats: {},
      projects: [],
      center: {
        lng: 116.404,
        lat: 39.915
      }
    }
  },
  computed: {
    span() {
      if (!this.stats.stats) {
        return 4
      }
      if (this.stats.stats.length % 2 === 0) {
        return 24 / this.stats.stats.length
      } else {
        return 24 / (this.stats.stats.length + 1)
      }
    }
  },
  beforeCreate() {
    getProjectMapOverview().then(response => {
      this.stats = response.data
    })

    getProjectMapInfoList().then(response => {
      this.projects = this.normalize(response.data)
      let projs = response.data.filter(t => t.lng && t.lat)
      if (projs.length) {
        this.center.lat = projs[0].lat
        this.center.lng = projs[0].lng
      } else {
        projs = response.data.filter(t => t.city)
        if (projs.length) {
          this.center = projs[0].city
        }
      }
    })

    // this.initChart()
    // this.__resizeHanlder = debounce(() => {
    //   if (this.chart) {
    //     this.chart.resize()
    //   }
    // }, 100)
    // window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    // if (!this.chart) {
    //   return
    // }
    // window.removeEventListener('resize', this.__resizeHanlder)
    // this.chart.dispose()
    // this.chart = null
  },
  methods: {
    goToProjList(phaseId, phaseName) {
      var query = { phaseId: phaseId }
      goToList(this.$store, this.$router, phaseName, query)
    },
    getStyle(phaseValue) {
      var colorMap = {
        1: '#999999',
        2: '#39cccc',
        3: '#00c0ef',
        4: '#3d9970',
        5: '#00a65a',
        6: '#d81b60'
      }

      return {
        backgroundColor: colorMap[phaseValue]
      }
    },
    getIcon(phaseValue) {
      var iconMap = {
        1: 'eye',
        2: 'reload',
        3: 'build',
        4: 'reload time',
        5: 'check-circle',
        6: 'warning-circle'
      }

      return iconMap[phaseValue]
    },
    normalize(projects) {
      var colorMap = {
        1: '#999999',
        2: '#39cccc',
        3: '#00c0ef',
        4: '#3d9970',
        5: '#00a65a',
        6: '#d81b60'
      }

      projects.forEach(proj => {
        proj.showInfo = false
        proj.color = colorMap[proj.phaseValue]
      })

      return projects
    },
    labelStyle(proj) {
      return {
        color: proj.color,
        borderColor: proj.color,
        fontSize: '14px',
        cursor: 'pointer',
        maxWidth: 'none'
      }
    },
    getTitle(proj) {
      return '<div style="color:' + proj.color + '">' + proj.name + '</div>'
    },
    infoWindowClose(proj) {
      proj.showInfo = false
    },
    infoWindowOpen(proj) {
      proj.showInfo = true
    }
  }
}
</script>

<style scoped>
.BMap_bubble_title {
  margin-top: 10px;
  font-weight: bold;
}

.BMap_bubble_content .el-row {
  padding: 5px 0px;
  margin: 5px 0px;
  font-size: 14px;
}
.BMap_bubble_content .header {
  border-bottom: 1px solid #ebeef5;
  border-top: 1px solid #ebeef5;
}

.BMap_bubble_content .el-col {
  color: #303133;
}

.BMap_bubble_content .el-col .label {
  color: #303133;
}

.el-row.stats .el-col {
  text-align: center;
  margin-bottom: 5px;
}

.el-row.stats .msg-block {
  padding: 5px;
  color: #fff;
}

.el-row.stats .svg-icon {
  width: 1.4em;
  height: 1.4em;
}
</style>

