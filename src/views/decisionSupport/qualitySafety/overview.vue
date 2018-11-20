<template>
  <div class="app-container">
    <div class="filter-container">
      <organization-unit-tree-select class="filter-item" style="width:300px" @select="handleSelect"></organization-unit-tree-select>
      <el-date-picker
        v-model="daterange"
        class="filter-item"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <!-- <el-cascader style="width:300px" v-model="selected" :options="options" filterable change-on-select placeholder="请选择集团/子公司/项目/合同段"></el-cascader> -->
    </div>
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart title="总体质安问题情况" :onclick="handlePieClick" :dataFunc="getStats" :query="query" height="300px"></pie-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart title="总体质量问题情况" :onclick="handleQualityPieClick" :dataFunc="getQualityStats" :query="query" height="300px"></pie-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart title="总体安全问题情况" :onclick="handleSafetyPieClick" :dataFunc="getSafetyStats" :query="query" height="300px"></pie-chart>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="type!=4" :gutter="32">
      <el-col :span="24">
        <div class="chart-wrapper">
          <issue-bar-chart :query="query" height="600px"></issue-bar-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as qualitySafetyAPI from '@/api/decisionSupport/qualitySafety'

import PieChart from '@/components/Chart/PieChart'
import MonthlyLineChart from '@/components/Chart/AmountLineChart'
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'
import IssueBarChart from './components/IssueBarChart'
import { goToList } from './utils'
import Consts from './consts'

export default {
  name: 'quality-safety-overview',
  data() {
    return {
      selected: {},
      type: 0,
      daterange: [],
      query: {}
    }
  },
  components: {
    PieChart,
    MonthlyLineChart,
    OrganizationUnitTreeSelect,
    IssueBarChart
  },
  watch: {
    daterange(val) {
      if (val && val.length === 2) {
        this.query = Object.assign({}, this.query, { from: val[0], to: val[1] })
      } else {
        this.query = Object.assign({}, this.query, { from: null, to: null })
      }
    }
  },
  methods: {
    handleSelect(payload) {
      this.selected = payload
      this.query = Object.assign({}, this.query, { organizationId: payload.id, organizationType: payload.type })
      this.type = payload.type
    },
    handlePieClick(params) {
      var title = '问题列表'
      var query = { organizationId: this.selected.id, organizationType: this.selected.type }
      query.problemClass = params.name
      title = params.name + '问题'
      goToList(this.$store, this.$router, title, query)
    },
    handleQualityPieClick(params) {
      this.handleQualiySafetyPieClick(params, Consts.ProblemClass.Quality)
    },
    handleSafetyPieClick(params) {
      this.handleQualiySafetyPieClick(params, Consts.ProblemClass.Safety)
    },
    handleQualiySafetyPieClick(params, problemClass) {
      var title = `${problemClass}问题`
      var query = {
        organizationId: this.selected.id,
        organizationType: this.selected.type,
        problemClass: `${problemClass}`
      }
      if (params.name === Consts.Status.Done) {
        query.isDone = true
        title = `${Consts.Status.Done}${problemClass}问题`
      }
      if (params.name === Consts.Status.Pending) {
        query.isDone = false
        title = `${Consts.Status.Pending}${problemClass}问题`
      }
      goToList(this.$store, this.$router, title, query)
    },
    ...qualitySafetyAPI
  }
}
</script>
