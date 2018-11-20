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
    },
    selectedLengends: {
      type: Object
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
    getSelectedLegnends(legends) {
      if (this.selectedLengends) {
        legends.forEach(t => {
          if (!this.selectedLengends[t]) {
            this.selectedLengends[t] = false
          }
        })
      }

      return this.selectedLengends
    },
    generateOptions(rawData) {
      var self = this

      var labelOption = {
        show: true,
        fontSize: 14
      }
      return {
        animation: true,
        title: {
          text: this.title
        },
        toolbox: {
          show: true,
          feature: {
            // restore: {},
            saveAsImage: {}
          },
          right: '10px'
        },
        // dataZoom: [{ type: 'slider' }],
        grid: {
          top: '14%',
          left: '8%',
          right: '12%',
          bottom: '6%',
          containLabel: true
        },
        legend: {
          top: 40,
          data: rawData.series.map(i => i.name),
          selected: this.getSelectedLegnends(rawData.series.map(i => i.name))
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: [
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
        xAxis: [
          {
            name: `数量`,
            type: 'value',
            minInterval: 1,
            nameTextStyle: {
              fontSize: 12
            }
          }
        ],
        series: rawData.series.map(i => {
          i.type = 'bar'
          i.label = labelOption
          i.barMaxWidth = 50
          return i
        })
      }
    }
  }
}
</script>
