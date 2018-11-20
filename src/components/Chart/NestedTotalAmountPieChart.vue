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
    dataFunc: {
      type: Function
    },
    query: {},
    onclick: {
      type: Function
    },
    xAxisRotate: {
      type: Number,
      default: 0
    },
    colors: {
      type: Array,
      default: t => []
    },
    labelSize: {
      type: String,
      default: 'normal'
    },
    showToolBox: {
      type: Boolean,
      default: true
    },
    center: {
      type: Array,
      default: t => ['50%', '55%']
    },
    legendPosition: {
      type: String,
      default: 'top'
    },
    innerRadius: {
      type: Array,
      default: t => [0, '30%']
    },
    outterRadius: {
      type: Array,
      default: t => ['40%', '60%']
    },
    labelLineLengths: {
      type: Array,
      default: t => []
    }
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

    this.loadChartDataByDataFunc()

    if (this.onclick) {
      this.chart.on('click', params => {
        this.onclick(params)
      })
    }
  },
  methods: {
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
    showLoading() {
      this.chart.showLoading()
    },
    hideLoading() {
      this.chart.hideLoading()
    },
    loadChartData(chartData) {
      this.chartOptions = this.generateOptions(chartData)
      this.chart.setOption(this.chartOptions)
    },
    getLabelOption() {
      var labelOption = {}
      if (this.labelSize === 'normal') {
        labelOption = {
          formatter: function(params) {
            var formatAmount = params.value > 1000000 ? yiYuan : wanYuan
            var formatAmountName = params.value > 1000000 ? '亿元' : '万元'
            return `  {b|${params.name}: ${formatAmount(params.value)}${formatAmountName}} {per|${params.percent}%} `
          },
          backgroundColor: '#fff',
          borderColor: '#aaa',
          borderWidth: 1,
          borderRadius: 4,
          rich: {
            b: {
              fontSize: 14,
              lineHeight: 33
            },
            per: {
              fontSize: 14,
              lineHeight: 33,
              color: '#fff',
              backgroundColor: '#334455',
              padding: [2, 4],
              borderRadius: 2
            }
          }
        }
      } else if (this.labelSize === 'small') {
        labelOption = {
          formatter: function(params) {
            var formatAmount = params.value > 1000000 ? yiYuan : wanYuan
            var formatAmountName = params.value > 1000000 ? '亿元' : '万元'
            return `{b|${params.name}}\n {b|${formatAmount(params.value)}${formatAmountName} ${params.percent}%}`
          },
          fontSize: 12,
          rich: {
            b: {
              align: 'center'
            }
          }
        }
      }

      return labelOption
    },
    getLengend(rawData) {
      var legendSelected = {}
      rawData.forEach(t => { legendSelected[t.name] = t.value > 0 })
      var lengend = {
        top: this.title ? 30 : 10,
        selected: legendSelected,
        data: rawData.map(i => i.name)
      }
      if (this.legendPosition === 'left') {
        lengend.x = 'left'
        lengend.orient = 'vertical'
      }
      if (this.legendPosition === 'right') {
        lengend.x = 'right'
        lengend.orient = 'vertical'
      }
      return lengend
    },
    getLabelLine() {
      if (this.labelLineLengths.length) {
        return {
          length: this.labelLineLengths[0],
          length2: this.labelLineLengths[1]
        }
      } else {
        return {}
      }
    },
    generateOptions(rawData) {
      var total = rawData.map(t => t.value).reduce((prev, cur) => { return prev + cur }, 0)
      var legendSelected = {}
      rawData.forEach(t => { legendSelected[t.name] = t.value > 0 })

      return {
        color: this.colors,
        animation: true,
        title: {
          text: this.title
        },
        toolbox: {
          show: this.showToolBox,
          feature: {
            saveAsImage: {}
          },
          right: '20px'
        },
        legend: this.getLengend(rawData),
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            var formatAmount = params.value > 1000000 ? yiYuan : wanYuan
            var formatAmountName = params.value > 1000000 ? '亿元' : '万元'

            return `${params.name}: ${formatAmount(params.value)}${formatAmountName} ${params.percent}%`
          }
        },
        series: [
          {
            name: this.title,
            type: 'pie',
            radius: this.innerRadius,
            center: this.center,
            color: '#fff',
            label: {
              normal: {
                formatter: function(params) {
                  var formatAmount = params.value > 1000000 ? yiYuan : wanYuan
                  var formatAmountName = params.value > 1000000 ? '亿元' : '万元'

                  return `总额\n${formatAmount(total)}${formatAmountName}`
                },
                color: '#000',
                fontSize: 18,
                show: true,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: total, name: '总数', selected: false }
            ]
          },
          {
            name: this.title,
            type: 'pie',
            radius: this.outterRadius,
            center: this.center,
            label: this.getLabelOption(),
            labelLine: this.getLabelLine(),
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data: rawData
          }
        ]
      }
    }
  }
}
</script>
