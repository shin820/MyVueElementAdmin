import echarts from 'echarts'
import customedTheme from '@/components/Chart/customed-theme'
import monitorTheme from '@/components/Chart/monitor-theme'

export default {
  props: {
    theme: {
      type: String
    }
  },
  mounted() {
    if (this.theme === 'monitor') {
      echarts.registerTheme('customed', monitorTheme)
    } else {
      echarts.registerTheme('customed', customedTheme)
    }
  },
  computed: {
    isMonitor() {
      return this.theme === 'monitor'
    }
  }
}
