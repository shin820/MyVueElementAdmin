<template>
  <div class="app-container">
    <div class="filter-container">
      <organization-unit-tree-select :excludeSection="true" class="filter-item" style="width:300px" @select="handleSelect"></organization-unit-tree-select>
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
          <chart title="项目投资节余" ref="chart" :onclick="handleBarChartClick" height="calc(100vh - 230px)"></chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Chart from '@/components/Chart/AmountBarChart'
import { getInvestmentBalances } from '@/api/project'
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'
import * as contractUtils from '@/views/contract/utils'
import * as projectUtils from '@/views/project/utils'
import moment from 'moment'

export default {
  name: 'project-investment-balance-barchart',
  data() {
    return {
      daterange: [],
      query: { from: null, to: null },
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
  },
  methods: {
    handleSelect(payload) {
      this.query.organizationId = payload.id
      this.query.organizationType = payload.type
      this.loadData()
    },
    handleBarChartClick(params) {
      var query = {
        organizationId: this.query.organizationId,
        organizationType: this.query.organizationType
      }
      if (this.query.from && this.query.to) {
        query.from = moment(this.query.from).format('YYYY-MM-DD HH:mm:ss')
        query.to = moment(this.query.to).format('YYYY-MM-DD HH:mm:ss')
      }
      if (params.name === '概算金额') {
        const title = '项目列表'
        projectUtils.goToList(this.$store, this.$router, title, query)
      }
      if (params.name === '合同金额') {
        const title = '合同列表'
        contractUtils.goToList(this.$store, this.$router, title, query)
      }
    },
    loadData() {
      this.$refs.chart.showLoading()
      getInvestmentBalances(this.query).then(res => {
        this.chartData = res.data
        this.$refs.chart.loadChartData(res.data)
        this.$refs.chart.hideLoading()
      })
    }
  }
}
</script>
