<template>
<div>
    <div ref="chart" :class="className" :style="{height:height,width:width}"></div>
    <div :style="{height:'140px',width:width}">
      <el-row class="clickable" @click.native="goToTotalIssueList" :gutter="16">
          <el-col :span="12"><span class="pull-right">问题总数 :</span></el-col>
          <el-col :span="12">
            <span>{{total}} 个</span>
          </el-col>
      </el-row>
       <el-row class="clickable" @click.native="goToPendingIssueList" :gutter="16">
          <el-col :span="12"><span class="pull-right">未处理 :</span></el-col>
          <el-col :span="12">
            <span>{{unFix}} 个</span>
          </el-col>
      </el-row>
      <el-row class="clickable" @click.native="goToDoneIssueList" :gutter="16">
          <el-col :span="12"><span class="pull-right">已处理 :</span></el-col>
          <el-col :span="12">
            <span>{{fixed}} 个</span>
          </el-col>
      </el-row>
      <el-row :gutter="16">
          <el-col :span="12"><span  class="pull-right">状态 :</span></el-col>
          <el-col :span="12">
           <span v-if="status!=1" class="status-error">{{statusName}}</span>
           <span v-if="status==1" class="status-success">{{statusName}}</span>
          </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getQualityStats } from '@/api/warning'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/components/Chart/mixins/resize'
import { goToList } from '@/views/decisionSupport/qualitySafety/utils'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    query: {}
  },
  data() {
    return {
      total: 0,
      unFix: 0,
      fixed: 0,
      status: 0,
      statusName: '',
      chart: null
    }
  },
  watch: {
    query: function() {
      this.loadChartData()
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart, 'macarons')
    this.loadChartData()
  },
  methods: {
    goToTotalIssueList() {
      goToList(this.$store, this.$router, '问题总数', this.query)
    },
    goToPendingIssueList() {
      var query = Object.assign({}, this.query, { isDone: false })
      goToList(this.$store, this.$router, '未处理问题总数', query)
    },
    goToDoneIssueList() {
      var query = Object.assign({}, this.query, { isDone: true })
      goToList(this.$store, this.$router, '已处理问题总数', query)
    },
    loadChartData() {
      if (!this.query.organizationId || !this.query.organizationType) {
        return
      }
      this.chart.showLoading()
      getQualityStats(this.query).then(
        response => {
          this.ratio = response.data.ratio
          this.total = response.data.total
          this.unFix = response.data.unFix
          this.fixed = response.data.fixed
          this.status = response.data.status
          this.statusName = response.data.statusName
          this.drawChart()
          this.chart.hideLoading()
        }
      )
    },
    drawChart() {
      this.chart.setOption({
        animation: false,
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          // feature: {
          //   restore: {},
          //   saveAsImage: {}
          // }
        },
        series: [
          {
            name: '质量预警',
            type: 'gauge',
            axisLine: {
              lineStyle: {
                color: [[0.20, '#39cccc'], [0.80, '#00c0ef'], [1, '#e36151']]
              }
            },
            title: {
              show: true,
              offsetCenter: [0, '-120%'], // x, y，单位px
              textStyle: {
                color: '#hhh',
                fontSize: 24
              }
            },
            detail: { formatter: '{value}%' },
            data: [{ value: this.ratio, name: '质量' }]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.label {
  float: right;
}

.status-error {
  color: #f56c6c;
  font-weight: bold;
}

.status-success {
  color: #67c23a;
  font-weight: bold;
}
</style>
