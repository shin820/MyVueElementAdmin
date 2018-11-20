<template>
  <div class="app-container">
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <progress-gauge :query="query"></progress-gauge>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <investment-gauge :query="query"></investment-gauge>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <quality-gauge :query="query"></quality-gauge>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :span="24">
        <div class="chart-wrapper">
          <project-map height="600px"></project-map>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :span="24">
        <div class="chart-wrapper">
          <issue-bar-chart :query="query" height="600px"></issue-bar-chart>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col :span="24">
        <div class="chart-wrapper">
          <horizontal-bar-chart :title="progressTitle" :dataFunc="progressDataFunc" :query="query" height="600px"></horizontal-bar-chart>
        </div>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart></raddar-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart></pie-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <bar-chart></bar-chart>
        </div>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
import * as investmentProgressAPI from '@/api/decisionSupport/investmentProgress'
import * as qualitySafetyAPI from '@/api/decisionSupport/qualitySafety'
import ProgressGauge from '@/views/warning/components/ProgressGauge'
import InvestmentGauge from '@/views/warning/components/InvestmentGauge'
import QualityGauge from '@/views/warning/components/QualityGauge'
import HorizontalBarChart from '@/components/Chart/AmountBarChart'
import ProjectMap from '@/views/project/components/ProjectMap'
import IssueBarChart from '@/views/decisionSupport/qualitySafety/components/IssueBarChart'
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard2',
  computed: {
    query() {
      return {
        organizationType: this.organizationType,
        organizationId: this.organizationId
      }
    },
    progressTitle() {
      if (this.organizationType === 1) {
        return '各子公司投资进度情况'
      }
      if (this.organizationType === 2) {
        return '各项目投资进度情况'
      }
      if (this.organizationType >= 3) {
        return '各标段投资进度情况'
      }
      return ''
    },
    qualitySafetyTitle() {
      if (this.organizationType === 1) {
        return '各子公司质安问题情况'
      }
      if (this.organizationType === 2) {
        return '各项目质安问题情况'
      }
      if (this.organizationType >= 3) {
        return '各标段质安问题情况'
      }
      return ''
    },
    ...mapGetters(['organizationId', 'organizationType'])
  },
  components: {
    // RaddarChart,
    // PieChart,
    // BarChart,
    ProgressGauge,
    InvestmentGauge,
    QualityGauge,
    HorizontalBarChart,
    ProjectMap,
    IssueBarChart
  },
  methods: {
    progressDataFunc(params) {
      if (this.organizationType === 1) {
        return investmentProgressAPI.getCompanyInvestmentStats(params)
      } else if (this.organizationType === 2) {
        return investmentProgressAPI.getProjectInvestmentStats(params)
      } else {
        return investmentProgressAPI.getSectionInvestmentStats(params)
      }
    },
    qualitySafetyDataFunc(params) {
      if (this.organizationType === 1) {
        return qualitySafetyAPI.getCompanyStats(params)
      } else if (this.organizationType === 2) {
        return qualitySafetyAPI.getProjectStats(params)
      } else {
        return qualitySafetyAPI.getSectionStats(params)
      }
    }
  }
}
</script>

