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
    fontSize: {
      type: Number,
      default: 14
    },
    colors: {
      type: Array,
      default: t => []
    },
    showToolBox: {
      type: Boolean,
      default: true
    },
    showLegend: {
      type: Boolean,
      default: true
    },
    legendPosition: {
      type: String,
      default: 'top'
    },
    top: {
      type: String,
      default: '80px'
    },
    legendTop: {
      type: String,
      default: '30'
    },
    left: {
      type: String,
      default: '4%'
    },
    right: {
      type: String,
      default: '4%'
    },
    bottom: {
      type: String,
      default: '4%'
    },
    isStack: {
      type: Boolean,
      default: false
    },
    showLabel: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      chartOptions: null,
      chartData: null
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
        var index = this.chartData.organizations.indexOf(params.name)
        var id = this.chartData.ids[index]
        params.nameId = id
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
        this.chartData = response.data
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
    getLengend(rawData) {
      var lengend = {
        show: this.showLegend,
        top: this.legendTop,
        textStyle: {
          fontSize: 14
        },
        data: rawData.series.map(i => i.name)
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
    generateOptions(rawData) {
      var self = this
      var labelOption = {
        show: this.showLabel,
        fontSize: 14
      }
      return {
        color: this.colors,
        animation: true,
        title: {
          text: this.title
        },
        toolbox: {
          show: this.showToolBox,
          feature: {
            // restore: {},
            saveAsImage: {}
          },
          right: '20px'
        },
        // dataZoom: [{ type: 'slider' }],
        grid: {
          top: this.top,
          left: this.left,
          right: this.right,
          bottom: this.bottom,
          containLabel: true
        },
        legend: this.getLengend(rawData),
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [
          {
            axisLabel: {
              interval: 0,
              fontSize: this.fontSize,
              rotate: self.xAxisRotate
            },
            type: 'category',
            axisTick: { show: true },
            data: rawData.organizations
          }
        ],
        yAxis: [
          {
            name: `数量`,
            type: 'value',
            minInterval: 1
          }
        ],
        series: rawData.series.map(i => {
          i.type = 'bar'
          if (this.isStack) {
            i.stack = this.title
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
