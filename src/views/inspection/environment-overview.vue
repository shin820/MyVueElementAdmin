<template>
  <div class="app-container">
    <div class="filter-container">
      <organization-unit-tree-select ref="treesel" class="filter-item" style="width:300px" @select="handleSelect"></organization-unit-tree-select>
      <el-date-picker
        v-model="daterange"
        class="filter-item"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </div>
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :lg="12">
        <quantity-pie-chart :query="query" :onclick="handleQuantityPieClick"></quantity-pie-chart>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <grade-pie-chart :query="query" :onclick="handleGradePieClick"></grade-pie-chart>
      </el-col>
    </el-row>
    <el-row :gutter="16" v-if="type!=4">
      <el-col :xs="24" :sm="24" :lg="12">
        <quantity-bar-chart :query="query" :onclick="handleBarClick"></quantity-bar-chart>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <grade-bar-chart :query="query" :onclick="handleBarClick"></grade-bar-chart>
      </el-col>
    </el-row>
    <el-row v-if="type!=4">
      <el-col :xs="24" :sm="24" :lg="24">
        <issue-stats-list @row-dblclick="issueStatsDblClick" :query="query" ref="issueStatsList"></issue-stats-list>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as inspectionAPI from '@/api/inspection'
import { goToList } from './utils'
import QuantityPieChart from './components/QuantityPieChart'
import GradePieChart from './components/GradePieChart'
import QuantityBarChart from './components/QuantityBarChart'
import GradeBarChart from './components/GradeBarChart'
import IssueStatsList from './components/IssueStatsList'
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'

export default {
  name: 'environment-protect-overview',
  data() {
    return {
      loading: false,
      selected: {},
      type: 0,
      daterange: [],
      query: { problemClass: '环保' },
      statsList: []
    }
  },
  components: {
    QuantityPieChart,
    GradePieChart,
    QuantityBarChart,
    GradeBarChart,
    IssueStatsList,
    OrganizationUnitTreeSelect
  },
  watch: {
    daterange(val) {
      if (val && val.length === 2) {
        this.query.from = val[0]
        this.query.to = val[1]
      } else {
        this.query.from = null
        this.query.to = null
      }
    }
  },
  methods: {
    handleSelect(payload) {
      this.selected = payload
      this.query = Object.assign({}, this.query, { organizationId: payload.id, organizationType: payload.type })
      this.type = payload.type
    },
    handleQuantityPieClick(params) {
      var query = Object.assign({}, this.query, { statusName: params.name === '总数' ? null : params.name })
      var title = params.name + '问题'
      goToList(this.$store, this.$router, title, query)
    },
    handleGradePieClick(params) {
      var query = Object.assign({}, this.query, { problemGrade: params.name === '总数' ? null : params.name })
      var title = params.name + '问题'
      goToList(this.$store, this.$router, title, query)
    },
    handleBarClick(params) {
      if (this.type === 1) {
        this.$refs.treesel.select(2, params.nameId)
      } else if (this.type === 2) {
        this.$refs.treesel.select(3, params.nameId)
      } else if (this.type === 3) {
        this.$refs.treesel.select(4, params.nameId)
      }
    },
    issueStatsDblClick(row) {
      if (this.type === 1) {
        this.$refs.treesel.select(2, row.id)
      } else if (this.type === 2) {
        this.$refs.treesel.select(3, row.id)
      } else if (this.type === 3) {
        this.$refs.treesel.select(4, row.id)
      }
    },
    search() {
      this.query = Object.assign({}, this.query)
    },
    ...inspectionAPI
  }
}
</script>
