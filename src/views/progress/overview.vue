<template>
  <div class="app-container">
    <div class="filter-container">
      <organization-unit-tree-select :excludeProject="true" class="filter-item" style="width:300px" @select="handleSelect"></organization-unit-tree-select>
      <el-date-picker class="filter-item" v-model="query.monthDate" type="month" placeholder="选择月"></el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="loadData">查询</el-button>
    </div>
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <nested-total-pie-chart :center="['50%','58%']" :innerRadius="['0','25%']" :outterRadius="['35%','55%']" :colors="['#00a65a','#f39c12','#f56954','#001F3F']" :showToolBox="false" labelSize="small" title="总体形象进度情况" :query="query" :dataFunc="getVisualProgressPieChart"></nested-total-pie-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <nested-total-amount-pie-chart :center="['50%','58%']" :innerRadius="['0','25%']" :outterRadius="['35%','55%']" :showToolBox="false" labelSize="small"  title="各子公司年度已完成投资占比" :query="query" :dataFunc="getCompanyCompleteStats"></nested-total-amount-pie-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <nested-total-amount-pie-chart :center="['50%','58%']" :innerRadius="['0','25%']" :outterRadius="['35%','55%']" :showToolBox="false" labelSize="small"  title="各子公司年度计划投资占比" :query="query" :dataFunc="getCompanyPlanStats"></nested-total-amount-pie-chart>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <bar-chart :colors="['#3c8dbc','#00a65a','#f39c12','#f56954','#001F3F']" title="各子公司年度形象进度" :query="query" :dataFunc="getVisualProgressStats" height="400px"></bar-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <visual-progress-list :tableHeight="354" :query="query"></visual-progress-list>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <quantity-amount-ratio-bar-chart title="各子公司年度投资进度" :query="query" :dataFunc="getProgressStats" height="400px"></quantity-amount-ratio-bar-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as progressAPI from '@/api/progress'
import NestedTotalAmountPieChart from '@/components/Chart/NestedTotalAmountPieChart'
import NestedTotalPieChart from '@/components/Chart/NestedTotalPieChart'
import QuantityAmountRatioBarChart from './components/QuantityAmountRatioBarChart'
import VisualProgressList from './components/VisualProgressList'
import BarChart from '@/components/Chart/BarChart'
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'
import Box from '@/components/Box/Box'
import moment from 'moment'

export default {
  name: 'progress-overview',
  data() {
    return {
      selected: null,
      type: null,
      progressList: [],
      query: { monthDate: null }
    }
  },
  components: {
    NestedTotalAmountPieChart,
    NestedTotalPieChart,
    OrganizationUnitTreeSelect,
    QuantityAmountRatioBarChart,
    VisualProgressList,
    BarChart,
    Box
  },
  created() {
    this.query.monthDate = new Date()
  },
  watch: {
    'query.monthDate': function(newVal) {
      if (newVal) {
        this.query.year = moment(newVal).year()
        this.query.month = moment(newVal).month() + 1
      } else {
        this.query.year = null
        this.query.month = null
      }
    }
  },
  methods: {
    handleSelect(payload) {
      this.selected = payload
      this.query = Object.assign({}, this.query, { organizationId: payload.id, organizationType: payload.type })
      this.type = payload.type
    },
    loadData() {
      this.query = Object.assign({}, this.query)
    },
    ...progressAPI
  }
}
</script>
