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
      <!-- <el-cascader clearable style="width:300px" v-model="selected" :options="options" filterable change-on-select placeholder="请选择集团/子公司/项目/合同段"></el-cascader> -->
    </div>
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <pie-chart
            title="总体投资进度情况"
            :query="query"
            :dataFunc="getOverviewInvestmentStats"
            height="300px">
          </pie-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <monthly-line-chart
             title="最近十二个月完成情况"
            :query="query"
            :dataFunc="getMonthlyInvestmentStats"
            height="300px">
          </monthly-line-chart>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="type==1" :gutter="32">
      <el-col :span="24">
        <div class="chart-wrapper">
          <horizontal-bar-chart
            title="各子公司投资进度情况"
            :query="query"
            :dataFunc="getCompanyInvestmentStats">
          </horizontal-bar-chart>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="type==2" :gutter="32">
      <el-col :span="24">
        <div class="chart-wrapper">
          <horizontal-bar-chart
            title="各项目投资进度情况"
            :query="query"
            :dataFunc="getProjectInvestmentStats">
          </horizontal-bar-chart>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="type==3" :gutter="32">
      <el-col :span="24">
        <div class="chart-wrapper">
          <horizontal-bar-chart
            title="各标段投资进度情况"
            :query="query"
            :dataFunc="getSectionInvestmentStats">
          </horizontal-bar-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as investmentProgressAPI from '@/api/decisionSupport/investmentProgress'

import HorizontalBarChart from '@/components/Chart/AmountBarChart'
import PieChart from '@/components/Chart/AmountPieChart'
import MonthlyLineChart from '@/components/Chart/AmountLineChart'
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'

export default {
  name: 'measure-progress',
  data() {
    return {
      selected: {},
      type: 0,
      daterange: [],
      query: {}
    }
  },
  components: {
    OrganizationUnitTreeSelect,
    HorizontalBarChart,
    PieChart,
    MonthlyLineChart
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
      this.type = payload.type
      this.query = Object.assign({}, this.query, { organizationId: payload.id, organizationType: payload.type })
    },
    ...investmentProgressAPI
  }
}
</script>

