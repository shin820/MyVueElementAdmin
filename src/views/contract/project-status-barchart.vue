<template>
  <div class="app-container">
    <div class="filter-container">
      <organization-unit-tree-select :excludeSection="true" class="filter-item" style="width:300px" @select="handleSelect"></organization-unit-tree-select>
      <el-select clearable style="width: 160px" class="filter-item" @change="loadData" v-model="query.contractTypeId" placeholder="合同类型">
        <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="daterange"
        class="filter-item"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="loadData">查询</el-button>
    </div>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <chart title="建设期合同情况" ref="chart" :onclick="handleBarChartClick" height="calc(100vh - 230px)"></chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Chart from '@/components/Chart/QuantityAmountBarChart'
import { getContractTypes } from '@/api/dataDict'
import { getProjectStatusAmounts } from '@/api/contract'
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'
import { goToCompanyChart } from './utils'
import moment from 'moment'

export default {
  name: 'contract-project-status-barchart',
  data() {
    return {
      selected: {},
      type: 0,
      daterange: [],
      query: { from: null, to: null },
      types: [], // 合同类型,
      chartData: {}
    }
  },
  components: {
    OrganizationUnitTreeSelect,
    Chart
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
  created() {
    this.daterange = [new Date(moment().year(), 0, 1), moment().toDate()]

    getContractTypes().then(response => {
      // 统计只统计了监理和施工合同，所以下拉也只能选监理和施工合同
      this.types = response.data.filter(t => t.value === '1' || t.value === '2')
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
        contractTypeId: this.query.contractTypeId
      }

      if (this.query.yearDate) {
        query.from = moment(this.query.yearDate).format('YYYY-01-01')
        query.to = moment(this.query.yearDate).add(1, 'year').format('YYYY-01-01')
      }

      var title = `子公司项目情况-${params.name}`
      var index = this.chartData.organizations.findIndex(t => t === params.name)
      var projectStatusId = this.chartData.ids[index]
      if (projectStatusId) {
        query.projectStatusId = projectStatusId
      }
      goToCompanyChart(this.$store, this.$router, title, query)
    },
    loadData() {
      this.$refs.chart.showLoading()
      getProjectStatusAmounts(this.query).then(res => {
        this.chartData = res.data
        this.$refs.chart.loadChartData(res.data)
        this.$refs.chart.hideLoading()
      })
    }
  }
}
</script>
