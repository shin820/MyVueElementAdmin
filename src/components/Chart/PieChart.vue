<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
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
    generateOptions(rawData) {
      return {
        animation: true,
        title: {
          text: this.title
        },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     restore: {},
        //     saveAsImage: {}
        //   },
        //   right: '20px'
        // },
        legend: {
          top: 30,
          data: rawData.map(i => i.name)
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: this.title,
            type: 'pie',
            radius: '60%',
            center: ['50%', '55%'],
            label: {
              normal: {
                formatter: function(params) {
                  return `  {b|${params.name}: ${params.value}} {per|${params.percent}%} `
                },
                backgroundColor: '#fff',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                  b: {
                    fontSize: 12,
                    lineHeight: 33
                  },
                  per: {
                    fontSize: 12,
                    lineHeight: 33,
                    color: '#fff',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
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
