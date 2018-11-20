<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import { wanYuan, yiYuan } from '@/filters/index'
import echarts from 'echarts'
import customedTheme from '@/components/Chart/customed-theme'
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
    title: {
      type: String,
      required: true
    },
    onclick: {
      type: Function
    },
    showPercent: {
      type: Boolean,
      default: false
    },
    xAxisRotate: {
      type: Number,
      default: 0
    },
    dataFunc: {
      type: Function
    },
    query: {}
  },
  data() {
    return {
      chart: null,
      chartOptions: null,
      formatAmount: null,
      formatAmountName: ''
    }
  },
  watch: {
    query: function() {
      this.loadChartDataByDataFunc()
    }
  },
  mounted() {
    echarts.registerTheme('customed', customedTheme)
    this.chart = echarts.init(this.$el, 'customed')

    if (this.onclick) {
      this.chart.on('click', params => {
        this.onclick(params)
      })
    }

    if (this.query) {
      this.loadChartDataByDataFunc()
    }
  },
  methods: {
    showLoading() {
      this.chart.showLoading()
    },
    hideLoading() {
      this.chart.hideLoading()
    },
    loadChartDataByDataFunc() {
      if (!this.query) {
        return
      }
      if (!this.query.organizationId || !this.query.organizationType) {
        return
      }
      if (!this.dataFunc) {
        return
      }
      this.chart.showLoading()
      this.dataFunc(this.query).then(
        response => {
          this.$emit('loaded', response.data)

          this.loadChartData(response.data)

          this.chart.setOption(this.chartOptions)
          this.chart.hideLoading()
        }
      )
    },
    loadChartData(chartData) {
      // 如果最大金额超过1亿，则用亿元单位
      var maxValues = chartData.series.map(t => Math.max(...t.data))
      var maxAmount = Math.max(...maxValues)
      this.formatAmount = maxAmount > 1000000 ? yiYuan : wanYuan
      this.formatAmountName = maxAmount > 1000000 ? '亿元' : '万元'

      this.chartOptions = this.generateOptions(chartData)
      this.chart.setOption(this.chartOptions)
    },
    generateOptions(rawData) {
      var self = this
      var colors = ['#3c8dbc', '#00a65a', '#39CCCC', '#605ca8']

      var labelOption = {
        show: true,
        formatter: function(params) {
          if (!params.value) {
            return ''
          }
          var formatAmount = params.value > 1000000 ? yiYuan : wanYuan
          var formatAmountName = params.value > 1000000 ? '亿元' : '万元'
          var label = params.seriesName.endsWith('额') ? formatAmount(params.value) + formatAmountName : params.value
          label = params.seriesName.endsWith('比例') ? label + '%' : label
          if (self.showPercent && rawData.series[params.seriesIndex].ratioData.length) {
            var ratio = rawData.series[params.seriesIndex].ratioData[params.dataIndex]
            label += `\n\n ${ratio}%\n\n\n\n`
          }
          return label
        },
        fontSize: 14
      }
      let yAxisIndex = 0
      return {
        color: colors,
        animation: false,
        title: {
          text: this.title
        },
        toolbox: {
          show: true,
          feature: {
            // restore: {},
            saveAsImage: {}
          },
          right: '20px'
        },
        // dataZoom: [{ type: 'slider' }],
        grid: {
          top: '80px',
          left: '2%',
          right: '4%',
          bottom: '4%',
          containLabel: true
        },
        legend: {
          top: 30,
          data: rawData.series.map(i => i.name)
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params) {
            let value = ''
            params.forEach(t => {
              var formatAmount = t.value > 1000000 ? yiYuan : wanYuan
              var formatAmountName = t.value > 1000000 ? '亿元' : '万元'
              if (t.seriesName.endsWith('额')) {
                value += `${t.seriesName} : ${formatAmount(t.value)}${formatAmountName}<br/>`
              } else if (t.seriesName.endsWith('比例')) {
                value += `${t.seriesName} : ${t.value}%<br/>`
              } else {
                value += `${t.seriesName} : ${t.value}<br/>`
              }
            })
            return value
          }
        },
        xAxis: [
          {
            axisLabel: {
              interval: 0,
              rotate: self.xAxisRotate
            },
            type: 'category',
            axisTick: { show: true },
            data: rawData.organizations
          }
        ],
        yAxis: [
          {
            name: '数量',
            type: 'value',
            splitLine: { show: false },
            splitArea: { show: false },
            position: 'left',
            minInterval: 1,
            axisLine: {
              lineStyle: {
                color: colors[0]
              }
            }
          },
          {
            name: `金额(${self.formatAmountName})`,
            type: 'value',
            position: 'right',
            axisLine: {
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: function(value, index) {
                return self.formatAmount(value)
              }
            }
          },
          {
            name: `占比(%)`,
            type: 'value',
            position: 'right',
            splitLine: { show: false },
            splitArea: { show: false },
            offset: 60,
            minInterval: 1,
            max: 100,
            min: 0,
            axisLine: {
              lineStyle: {
                color: colors[3]
              }
            },
            axisLabel: {
              formatter: function(value, index) {
                return value + '%'
              }
            }
          }
        ],
        series: rawData.series.map(i => {
          i.type = 'bar'
          // 设置数据对应的Y轴
          if (typeof i.yAxisIndex !== 'number' || isNaN(i.yAxisIndex)) {
            i.yAxisIndex = yAxisIndex++
          }
          i.label = labelOption
          i.barMaxWidth = 50
          return i
        })
      }
    }
  }
}
</script>
