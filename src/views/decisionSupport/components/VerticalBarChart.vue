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
    query: {},
    dataFunc: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      chartOptions: null
    }
  },
  mounted() {
    echarts.registerTheme('customed', customedTheme)
    this.chart = echarts.init(this.$el, 'customed')
    this.loadChartData()
  },
  watch: {
    query: function() {
      this.loadChartData()
    }
  },
  methods: {
    loadChartData() {
      if (!this.query.organizationId || !this.query.organizationType) {
        return
      }
      this.chart.showLoading()
      this.dataFunc(this.query).then(
        response => {
          this.chartOptions = this.generateOptions(response.data)
          this.chart.setOption(this.chartOptions)
          this.chart.hideLoading()
        }
      )
    },
    generateOptions(rawData) {
      return {
        animation: false,
        title: {
          text: this.title
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          top: 30,
          data: rawData.series.map(i => i.name)
        },
        grid: {
          top: '8%',
          left: '2%',
          right: '8%',
          bottom: '4%',
          containLabel: true
        },
        xAxis: {
          // name: '完成百分比',
          // nameTextStyle: {
          //   fontSize: 12
          // },
          type: 'value'
          // boundaryGap: [0, 0.01],
          // axisLabel: { formatter: '{value}%' },
          // max: 100
        },
        yAxis: {
          axisLabel: {
            interval: 0
          },
          type: 'category',
          data: rawData.organizations
        },
        series: rawData.series.map(item => {
          item.type = 'bar'
          return item
        })
      }
    }
  }
}
</script>
