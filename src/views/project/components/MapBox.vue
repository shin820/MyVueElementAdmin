<template>
<box :loading="loading" title="项目分布图" class="box-success">
  <template slot="body">
  <el-row :gutter="8">
    <el-col :span="showPhase?20:24">
      <!-- :scroll-wheel-zoom="true" -->
      <baidu-map :style="{height:height,width:width}" :center="center" :zoom="12" :mapStyle="mapStyle">
          <bm-city-list v-if="!isMonitor" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          <bm-geolocation v-if="!isMonitor" anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
          <bm-marker v-for="proj in projects" :key="proj.name" @click="infoWindowOpen(proj)" :position="{lng: proj.lng, lat: proj.lat}" animation="NONE">
            <bm-label :content="proj.name" @click="infoWindowOpen(proj)" :labelStyle="labelStyle" :offset="{width: 20, height: 0}"/>
            <bm-info-window :show="proj.showInfo" :title="getTitle(proj)" @close="infoWindowClose(proj)" @open="infoWindowOpen(proj)" :width="360" :autoPan="true">
              <el-row>
                <el-col :span="12">
                  <el-row class="header"><el-col :span="24">项目概况</el-col></el-row>
                  <el-row><el-col><span>总投资：</span>{{proj.investmentAmount|chineseAmount}}</el-col></el-row>
                  <el-row><el-col><span>负责人：</span>{{proj.legalPerson}}</el-col></el-row>
                  <el-row><el-col><span>开工时间：</span>{{proj.startTime|date}}</el-col></el-row>
                  <el-row><el-col><span>竣工时间：</span>{{proj.completionTime|date}}</el-col></el-row>
                </el-col>
                <el-col :span="12">
                  <el-row class="header"><el-col>投资进度</el-col></el-row>
                  <el-row><el-col><span>合同金额：</span>{{proj.contractAmount|chineseAmount}}</el-col></el-row>
                  <el-row><el-col><span>计划金额：</span>{{proj.planAmount|chineseAmount}}</el-col></el-row>
                  <el-row><el-col><span>完成金额：</span>{{proj.completeAmount|chineseAmount}}</el-col></el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-row class="header"><el-col>质量问题</el-col></el-row>
                  <el-row><el-col><span>问题总数：</span>{{proj.qualityIssueNum}}</el-col></el-row>
                  <el-row><el-col><span>未处理：</span>{{proj.qualityIssueUnFixNum}}</el-col></el-row>
                  <el-row><el-col><span>已处理：</span>{{proj.qualityIssueFixedNum}}</el-col></el-row>
                </el-col>
                <el-col :span="12">
                  <el-row class="header"><el-col>安全问题</el-col></el-row>
                  <el-row><el-col ><span>问题总数：</span>{{proj.safetyIssueNum}}</el-col></el-row>
                  <el-row> <el-col><span>未处理：</span>{{proj.safetyIssueUnFixNum}}</el-col></el-row>
                  <el-row><el-col><span>已处理：</span>{{proj.safetyIssueFixedNum}}</el-col></el-row>
                </el-col>
              </el-row>
            </bm-info-window>
          </bm-marker>
        </baidu-map>
    </el-col>
    <el-col v-if="showPhase" :span="4">
      <div :style="{'height':height}" class="bg-green">
        <div v-if="stats.stats" :style="{'height':msgBlockHeight}" class="msg-block clickable" @click="goToProjList(null,'项目列表')">
          <v-icon scale="1.2" name="table"></v-icon>
          <div class="text">项目总数{{stats.total}}个</div>
        </div>
        <div v-for="stat in stats.stats" :key="stat.phaseId" :style="{'height':msgBlockHeight}" class="msg-block clickable" @click="goToProjList(stat.phaseId,stat.phaseName+'项目')">
          <div><v-icon scale="1.2" :name="getIcon(stat.phaseValue)"></v-icon></div>
          <div class="text">{{stat.phaseName}}{{stat.count}}个</div>
        </div>
      </div>
    </el-col>
  </el-row>
  </template>
</Box>
</template>

<script>
import Vue from 'vue'
import { getProjectMapOverview, getProjectMapInfoList } from '@/api/project'
import { goToList } from '../utils'
import Box from '@/components/Box/Box'
import MonitorMapStyle from './monitor-map-style'

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
      default: '400px'
    },
    showPhase: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String
    },
    organizationId: {},
    organizationType: {}
  },
  data() {
    var defaultMapStyle = [
      {
        featureType: 'all',
        elementType: 'all',
        stylers: {
          lightness: 0,
          saturation: -100
        }
      }
    ]

    var mapStyle = this.theme === 'monitor' ? MonitorMapStyle : defaultMapStyle
    var labelStyle = {
      color: '#00a65a',
      borderColor: '#00a65a',
      fontSize: '14px',
      cursor: 'pointer',
      maxWidth: 'none'
    }
    if (this.theme === 'monitor') {
      labelStyle = {
        color: '#fff',
        borderColor: '#1AB6EA',
        backgroundColor: '#031020',
        fontSize: '10px',
        cursor: 'pointer',
        maxWidth: 'none'
      }
    }

    return {
      loading: false,
      stats: {},
      projects: [],
      center: {
        lng: 116.404,
        lat: 39.915
      },
      mapStyle: {
        styleJson: mapStyle
      },
      labelStyle: labelStyle
    }
  },
  components: {
    Box
  },
  computed: {
    msgBlockHeight() {
      var height = this.height.replace('px', '') * 1
      return this.stats.stats
        ? height / (this.stats.stats.length + 1) + 'px'
        : '0px'
    },
    isMonitor() {
      return this.theme === 'monitor'
    },
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
  methods: {
    load(params) {
      this.loading = true
      getProjectMapOverview(params).then(response => {
        this.stats = response.data
      })

      getProjectMapInfoList(params).then(response => {
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
        this.loading = false
      })
    },
    goToProjList(phaseId, phaseName) {
      var query = { phaseId: phaseId }
      if (this.organizationId && this.organizationType) {
        query.organizationId = this.organizationId
        query.organizationType = this.organizationType
      }

      goToList(this.$store, this.$router, phaseName, query)
    },
    getIcon(phaseValue) {
      var iconMap = {
        1: 'eye',
        2: 'walking',
        3: 'road',
        4: 'clock',
        5: 'check-square',
        6: 'exclamation'
      }

      return iconMap[phaseValue]
    },
    normalize(projects) {
      projects.forEach(proj => {
        proj.showInfo = false
      })

      return projects
    },
    getTitle(proj) {
      return '<div>' + proj.name + '</div>'
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

.msg-block {
  text-align: center;
  padding: 10px;
  color: #fff;
  width: 100%;
  font-size: 14px;
}
.msg-block .text {
  margin-top: 5px;
}

/*去掉百度地图LOGO*/
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}
</style>

