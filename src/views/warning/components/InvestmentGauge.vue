<template>
  <div>
    <div ref="chart" :class="className" :style="{height:height,width:width}"></div>
    <div :style="{height:'140px',width:width}">
      <el-row :gutter="16">
          <el-col :span="12"><span class="pull-right">概算 :</span></el-col>
          <el-col :span="12">
            {{budget|chineseAmount}}
          </el-col>
      </el-row>
       <el-row :gutter="16">
          <el-col :span="12"><span class="pull-right">实际 :</span></el-col>
          <el-col :span="12">
            {{actual|chineseAmount}}
          </el-col>
      </el-row>
      <el-row :gutter="16">
          <el-col :span="12"><span class="pull-right">状态 :</span></el-col>
          <el-col :span="12">
           <span v-if="status==1" class="status-success">{{remark}}</span>
           <span v-if="status!=1" class="status-error">{{remark}}</span>
          </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getInvestmentStats } from '@/api/warning'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
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
      ratio: 0,
      budget: 0,
      actual: 0,
      status: 0,
      remark: '',
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
      getInvestmentStats(this.query).then(
        response => {
          this.ratio = response.data.ratio
          this.budget = response.data.budget
          this.actual = response.data.actual
          this.status = response.data.status
          this.remark = response.data.remark
          this.drawChart()
          this.chart.hideLoading()
        }
      )
    },
    drawChart() {
      this.chart.setOption({
        color: ['#00a65a', '#00c0ef', '#dd4b39'],
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
            name: '投资预警',
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
            data: [{ value: this.ratio, name: '投资' }]
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
