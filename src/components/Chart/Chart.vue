<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import customedTheme from '@/components/Chart/customed-theme'
import resize from './mixins/resize'

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
    onclick: {
      type: Function
    },
    options: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    options: function(options) {
      if (options) {
        this.chart.setOption(options)
        this.chart.resize()
      }
    }
  },
  mounted() {
    echarts.registerTheme('customed', customedTheme)
    this.chart = echarts.init(this.$el, 'customed')

    if (this.options) {
      this.chart.setOption(this.options)
    }

    if (this.onclick) {
      this.chart.on('click', params => {
        this.onclick(params)
      })
    }
  },
  methods: {
    load(chartOptions) {
      this.chart.setOption(chartOptions)
    },
    showLoading() {
      this.chart.showLoading()
    },
    hideLoading() {
      this.chart.hideLoading()
    }
  }
}
</script>
