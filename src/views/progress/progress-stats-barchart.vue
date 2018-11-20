<template>
  <div class="app-container">
    <div class="filter-container">
      <organization-unit-tree-select :excludeProject="true" class="filter-item" style="width:300px" @select="handleSelect"></organization-unit-tree-select>
      <el-date-picker class="filter-item" v-model="query.monthDate" @change="loadData" type="month" placeholder="选择月"></el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="loadData">查询</el-button>
    </div>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <chart title="项目投资进度情况" ref="chart" :onclick="handleBarChartClick" height="calc(100vh - 230px)"></chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Chart from './components/QuantityAmountRatioBarChart'
import { getProgressStats } from '@/api/progress'
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'
// import { goCompanyTypeChart } from './utils'
import moment from 'moment'

export default {
  name: 'progress-stats-barchart',
  data() {
    return {
      query: { monthDate: null },
      chartData: {}
    }
  },
  components: {
    OrganizationUnitTreeSelect,
    Chart
  },
  created() {
    this.query.monthDate = new Date()
  },
  methods: {
    handleSelect(payload) {
      this.query.organizationId = payload.id
      this.query.organizationType = payload.type
      this.loadData()
    },
    handleBarChartClick(params) {
      // var query = {
      //   organizationId: this.selected.id,
      //   organizationType: this.selected.type,
      //   phaseId: this.query.phaseId
      // }

      // if (this.query.yearDate) {
      //   query.from = moment(this.query.yearDate).format('YYYY-01-01')
      //   query.to = moment(this.query.yearDate).add(1, 'year').format('YYYY-01-01')
      // }

      // var title = `子公司项目情况-${params.name}`
      // var index = this.chartData.organizations.findIndex(t => t === params.name)
      // var typeId = this.chartData.ids[index]
      // if (typeId) {
      //   query.projectTypeId = typeId
      // }
      // goCompanyTypeChart(this.$store, this.$router, title, query)
    },
    loadData() {
      if (this.query.monthDate) {
        this.query.year = moment(this.query.monthDate).year()
        this.query.month = moment(this.query.monthDate).month() + 1
      } else {
        this.query.year = null
        this.query.month = null
      }

      this.$refs.chart.showLoading()
      getProgressStats(this.query).then(res => {
        this.chartData = res.data
        this.$refs.chart.loadChartData(res.data)
        this.$refs.chart.hideLoading()
      })
    }
  }
}
</script>
