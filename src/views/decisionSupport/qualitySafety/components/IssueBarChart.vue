<template>
  <horizontal-bar-chart :xAxisRotate="-15" :title="qualitySafetyTitle" :onclick="handleClick" @loaded="onLoadData" :dataFunc="qualitySafetyDataFunc" :query="query" :height="height"></horizontal-bar-chart>
</template>

<script>
import HorizontalBarChart from '@/components/Chart/BarChart'
import * as qualitySafetyAPI from '@/api/decisionSupport/qualitySafety'
import GlobalConsts from '@/consts'
import { goToList } from '../utils'

export default {
  props: {
    height: {
      type: String,
      default: '300px'
    },
    query: {}
  },
  data() {
    return {
      chartData: {}
    }
  },
  components: {
    HorizontalBarChart
  },
  computed: {
    qualitySafetyTitle() {
      if (this.query.organizationType === GlobalConsts.Organization.Group.Type) {
        return '各子公司质安问题情况'
      }
      if (this.query.organizationType === GlobalConsts.Organization.Company.Type) {
        return '各项目质安问题情况'
      }
      if (this.query.organizationType >= GlobalConsts.Organization.Project.Type) {
        return '各标段质安问题情况'
      }
      return ''
    }
  },
  methods: {
    qualitySafetyDataFunc(params) {
      if (this.query.organizationType === GlobalConsts.Organization.Group.Type) {
        return qualitySafetyAPI.getCompanyStats(params)
      } else if (this.query.organizationType === GlobalConsts.Organization.Company.Type) {
        return qualitySafetyAPI.getProjectStats(params)
      } else {
        return qualitySafetyAPI.getSectionStats(params)
      }
    },
    handleClick(params) {
      if (this.query.organizationType === GlobalConsts.Organization.Group.Type) {
        const organizationName = GlobalConsts.Organization.Company.Name
        const organizationType = GlobalConsts.Organization.Company.Type
        this.handleBarChartClick(params, organizationName, organizationType)
      }
      if (this.query.organizationType === GlobalConsts.Organization.Company.Type) {
        const organizationName = GlobalConsts.Organization.Project.Name
        const organizationType = GlobalConsts.Organization.Project.Type
        this.handleBarChartClick(params, organizationName, organizationType)
      }
      if (this.query.organizationType === GlobalConsts.Organization.Project.Type) {
        const organizationName = GlobalConsts.Organization.Section.Name
        const organizationType = GlobalConsts.Organization.Section.Type
        this.handleBarChartClick(params, organizationName, organizationType)
      }
    },
    handleBarChartClick(params, titlePrefix, type) {
      const index = this.chartData.organizations.findIndex(t => t === params.name)
      const organizationId = this.chartData.ids[index]
      let title = `${titlePrefix}问题`
      const query = { organizationId: organizationId, organizationType: type }
      query.problemClass = params.seriesName
      title = `${titlePrefix}${params.seriesName}问题`

      goToList(this.$store, this.$router, title, query)
    },
    onLoadData(data) {
      this.chartData = data
    }
  }
}
</script>
