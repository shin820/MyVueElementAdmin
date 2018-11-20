<template>
  <div>
    <div ref="chart" :class="className" :style="{height:height,width:width}"></div>
    <div :style="{height:'140px',width:width}">
      <el-row :gutter="16">
          <el-col :span="8"><span class="pull-right">计划 :</span></el-col>
          <el-col :span="10">
            <el-progress :text-inside="true" :stroke-width="18" :percentage="plan"></el-progress>
          </el-col>
      </el-row>
       <el-row :gutter="16">
          <el-col :span="8"><span class="pull-right">实际 :</span></el-col>
          <el-col :span="10">
            <el-progress :text-inside="true" :stroke-width="18" :percentage="actual" :status="status==1?'success':'exception'"></el-progress>
          </el-col>

      </el-row>
      <el-row :gutter="16">
          <el-col :span="8"><span class="pull-right">状态 :</span></el-col>
          <el-col :span="10">
           <span v-if="status==1" class="status-success">{{statusName}}</span>
           <span v-if="status!=1" class="status-error">{{statusName}}</span>
          </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getProgressStats } from '@/api/warning'
import echarts from 'echarts'
require('echarts/theme/macarons')// echarts theme
import resize from '@/components/Chart/mixins/resize'

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
      plan: 0,
      actual: 0,
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
    loadChartData() {
      if (!this.query.organizationId || !this.query.organizationType) {
        return
      }
      this.chart.showLoading()
      getProgressStats(this.query).then(
        response => {
          this.plan = response.data.plan
          this.actual = response.data.actual
          this.status = response.data.status
          this.statusName = response.data.statusName
          this.drawChart()
          this.chart.hideLoading()
        }
      )
    },
    drawChart() {
      this.chart.setOption({
        // title: '进度',
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
            name: '进度',
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
            data: [{ value: this.actual, name: '进度' }]
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

.status-success {
  color: #67c23a;
  font-weight: bold;
}

.status-error {
  color: #f56c6c;
  font-weight: bold;
}
</style>

