import { debounce } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  activated() {
    if (this.chart) {
      this.chart.resize()
    }
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  watch: {
    'sidebar.opened': function() {
      setTimeout(() => {
        this.chart.resize()
      }, 500)
    }
  },
  mounted() {
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  }
}
