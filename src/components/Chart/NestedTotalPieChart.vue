<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Chart/mixins/resize'
import theme from '@/components/Chart/mixins/theme'

export default {
  mixins: [theme, resize],
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
      type: String
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
    showLengend: {
      type: Boolean,
      default: true
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
    },
    innerTitle: {
      type: String
    }
  },
  data() {
    return {
      chart: null,
      chartOptions: null
    }
  },
  watch: {
    query: function() {
      this.loadChartDataByDataFunc()
    }
  },
  mounted() {
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
      this.dataFunc(this.query).then(response => {
        this.$emit('loaded', response.data)

        this.loadChartData(response.data)

        this.chart.setOption(this.chartOptions)
        this.chart.hideLoading()
      })
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
            return `  {b|${params.name}: ${params.value}} {per|${
              params.percent
            }%} `
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
            return `{b|${params.name}:${params.value}}\n{b|${params.percent}%}`
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
      rawData.forEach(t => {
        legendSelected[t.name] = t.value > 0
      })
      var lengend = {
        show: this.showLengend,
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
      var self = this
      var total = rawData.map(t => t.value).reduce((prev, cur) => {
        return prev + cur
      }, 0)

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
          right: '10px'
        },
        legend: this.getLengend(rawData),
        tooltip: {
          trigger: 'item',
          formatter: this.title ? '{a} <br/>{b}: {c} ({d}%)' : '{b}: {c} ({d}%)'
        },
        series: [
          {
            name: this.title,
            type: 'pie',
            radius: this.innerRadius,
            center: this.center,
            color: !this.isMonitor ? '#fff' : 'rgba(0,0,0,0)',
            label: {
              normal: {
                formatter: function(params) {
                  return self.innerTitle ? self.innerTitle : `总数(${total})`
                },
                color: !this.isMonitor ? '#000' : '#fff',
                fontSize: this.isMonitor ? 12 : 16,
                show: true,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{ value: total, name: '总数', selected: false }]
          },
          {
            name: this.title,
            type: 'pie',
            radius: this.outterRadius,
            center: this.center,
            label: {
              normal: this.getLabelOption()
            },
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
