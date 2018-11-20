<template>
  <div class="app-container">
    <div class="filter-container">
      <organization-unit-tree-select :excludeSection="true" class="filter-item" style="width:300px" @select="handleSelect"></organization-unit-tree-select>
      <el-date-picker class="filter-item" v-model="query.yearDate" @change="loadData" type="year" placeholder="年度"></el-date-picker>
      <el-select clearable style="width: 120px" class="filter-item" @change="loadData" v-model="query.phaseId" placeholder="项目阶段">
        <el-option v-for="item in phases" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="loadData">查询</el-button>
    </div>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <chart :showPercent="true" title="项目类型分析" ref="chart" :onclick="handleBarChartClick" height="calc(100vh - 230px)"></chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Chart from '@/components/Chart/QuantityAmountBarChart'
import { getProjectPhases } from '@/api/dataDict'
import { getTypeAmounts } from '@/api/project'
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'
import { goCompanyChart } from './utils'
import moment from 'moment'

export default {
  name: 'project-type-barchart',
  data() {
    return {
      selected: {},
      type: 0,
      query: { yearDate: null },
      phases: [], // 项目阶段
      chartData: {}
    }
  },
  components: {
    OrganizationUnitTreeSelect,
    Chart
  },
  created() {
    this.query.yearDate = new Date()

    getProjectPhases(this.organizationId).then(response => {
      this.phases = response.data
    })
  },
  methods: {
    handleSelect(payload) {
      this.selected = payload
      this.type = payload.type
      this.query.organizationId = payload.id
      this.query.organizationType = payload.type
      this.loadData()
    },
    handleBarChartClick(params) {
      var query = {
        organizationId: this.selected.id,
        organizationType: this.selected.type,
        phaseId: this.query.phaseId
      }

      if (this.query.yearDate) {
        query.from = moment(this.query.yearDate).format('YYYY-01-01')
        query.to = moment(this.query.yearDate).add(1, 'year').format('YYYY-01-01')
      }

      var title = `子公司项目情况-${params.name}`
      var index = this.chartData.organizations.findIndex(t => t === params.name)
      var typeId = this.chartData.ids[index]
      if (typeId) {
        query.projectTypeId = typeId
      }
      goCompanyChart(this.$store, this.$router, title, query)
    },
    loadData() {
      if (this.query.yearDate) {
        this.query.year = moment(this.query.yearDate).year()
      } else {
        this.query.year = null
      }

      this.$refs.chart.showLoading()
      getTypeAmounts(this.query).then(res => {
        this.chartData = res.data
        this.$refs.chart.loadChartData(res.data)
        this.$refs.chart.hideLoading()
      })
    }
  }
}
</script>
