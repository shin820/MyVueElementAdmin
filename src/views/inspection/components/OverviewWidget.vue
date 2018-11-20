<template>
  <box title="问题概况" class="box-primary">
     <template slot="body">
       <el-row>
         <el-col :xs="24" :sm="16" :lg="16">
            <bar-chart :theme="theme" :fontSize="12" :xAxisRotate="-10" :onclick="onBarClick" :colors="['#3c8dbc','#dd4b39','#00a65a','#f39c12']" height="260px" legendTop="0px" top="30px" left="2%" :showToolBox="false" :dataFunc="qualitySafetyDataFunc" :query="query"></bar-chart>
         </el-col>
         <el-col :xs="24" :sm="8" :lg="8">
           <p class="text-center">问题整改完成率</p>
           <div class="progress-group clickable" v-on:click="$router.push({ name: `quality-overview`})">
              <span class="progress-text" style="font-weight:normal">质量问题</span>
              <span class="progress-number"><b>{{quality.complete}}</b>/{{quality.total}}</span>
              <div class="progress sm">
                <div class="progress-bar progress-bar-light-blue" :style="{'width': quality.completeRatio+'%'}"></div>
              </div>
            </div>
            <div class="progress-group clickable" v-on:click="$router.push({ name: `safety-overview`})">
              <span class="progress-text" style="font-weight:normal">安全问题</span>
              <span class="progress-number"><b>{{safety.complete}}</b>/{{safety.total}}</span>
              <div class="progress sm">
                <div class="progress-bar progress-bar-red" :style="{'width': safety.completeRatio+'%'}"></div>
              </div>
            </div>
            <div class="progress-group clickable" v-on:click="$router.push({ name: `environment-protect-overview`})">
              <span class="progress-text" style="font-weight:normal">环保问题</span>
              <span class="progress-number"><b>{{env.complete}}</b>/{{env.total}}</span>
              <div class="progress sm">
                <div class="progress-bar progress-bar-green" :style="{'width': env.completeRatio+'%'}"></div>
              </div>
            </div>
            <div class="progress-group clickable" v-on:click="$router.push({ name: `other-inspection-overview`})">
              <span class="progress-text" style="font-weight:normal">其他</span>
              <span class="progress-number" style="font-weight:normal"><b>{{other.complete}}</b>/{{other.total}}</span>
              <div class="progress sm">
                <div class="progress-bar progress-bar-yellow" :style="{'width': other.completeRatio+'%'}"></div>
              </div>
            </div>
         </el-col>
       </el-row>
       <el-row>
         <el-col v-for="grade in grades" :key="grade.name" :span="grade.span*1">
           <div class="description-block border-right clickable" v-on:click="onGradeClick(grade.name)">
              <span class="description-percentage" :class="grade.class">{{grade.ratio}}%</span>
              <h5 class="description-header">{{grade.value}}个</h5>
              <span class="description-text">{{grade.name}}</span>
           </div>
         </el-col>
       </el-row>
     </template>
  </box>
</template>

<script>
import * as inspectionAPI from '@/api/inspection'
import Box from '@/components/Box/Box'
import BarChart from '@/components/Chart/BarChart'
import { goToList } from '../utils'

export default {
  props: {
    query: {
      type: Object,
      required: true
    },
    theme: {
      type: String
    }
  },
  data() {
    return {
      grades: [],
      problemClasses: [],
      quality: { complete: 0, total: 0, completeRatio: 0 },
      safety: { complete: 0, total: 0, completeRatio: 0 },
      env: { complete: 0, total: 0, completeRatio: 0 },
      other: { complete: 0, total: 0, completeRatio: 0 }
    }
  },
  created() {
    inspectionAPI.getGradeStats(this.query).then(res => {
      var total = res.data.map(t => t.value).reduce((prev, cur) => {
        return prev + cur
      }, 0)
      var classes = [
        'text-green',
        'text-aqua',
        'text-yellow',
        'text-red',
        'text-gray',
        'text-navy',
        'text-teal'
      ]
      var span = res.data.length ? (24 / res.data.length).toFixed(0) : 24
      var i = 0
      this.grades = res.data.map(t => {
        var ratio = total > 0 ? ((t.value * 100) / total).toFixed(0) : 0
        return {
          name: t.name,
          value: t.value,
          ratio,
          class: classes[i++],
          span
        }
      })
    })
    inspectionAPI.getProblemClassStats(this.query).then(res => {
      var quality = res.data.filter(t => t.problemClass === '质量')
      var safety = res.data.filter(t => t.problemClass === '安全')
      var env = res.data.filter(t => t.problemClass === '环保')
      var other = res.data.filter(t => t.problemClass === '其他')
      if (quality.length) {
        this.quality = quality[0]
      }
      if (safety.length) {
        this.safety = safety[0]
      }
      if (env.length) {
        this.env = env[0]
      }
      if (other.length) {
        this.other = other[0]
      }
    })
  },
  components: {
    Box,
    BarChart
  },
  methods: {
    onBarClick(params) {
      var query = {
        organizationId: params.nameId,
        organizationType: this.query.organizationType + 1,
        problemClass: params.seriesName
      }
      var title = `${params.name}${params.seriesName}问题`
      goToList(this.$store, this.$router, title, query)
    },
    onGradeClick(grade) {
      var query = {
        organizationId: this.query.organizationId,
        organizationType: this.query.organizationType
      }
      query.problemGrade = grade
      var title = `${grade}问题`
      goToList(this.$store, this.$router, title, query)
    },
    qualitySafetyDataFunc(params) {
      if (this.query.organizationType === 1) {
        return inspectionAPI.getCompanyStats(params)
      } else if (this.query.organizationType === 2) {
        return inspectionAPI.getProjectStats(params)
      } else {
        return inspectionAPI.getSectionStats(params)
      }
    }
  }
}
</script>

