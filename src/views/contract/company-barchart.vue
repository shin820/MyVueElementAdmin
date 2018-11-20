<template>
  <div class="app-container">
    <div class="filter-container">
      <organization-unit-tree-select :excludeProject="true" class="filter-item" style="width:300px" @select="handleSelect"></organization-unit-tree-select>
      <el-date-picker
        v-model="daterange"
        class="filter-item"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-select clearable style="width: 140px" class="filter-item" @change="loadData" v-model="query.contractTypeId" placeholder="合同类型">
        <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-select clearable style="width: 140px" class="filter-item" @change="loadData" v-model="query.contractStatus" placeholder="合同状态">
        <el-option v-for="item in statuses" :key="item.id" :label="item.name" :value="item.name">
        </el-option>
      </el-select>
      <el-select clearable style="width: 140px" class="filter-item" @change="loadData" v-model="query.projectStatusId" placeholder="项目状态">
        <el-option v-for="item in projectStatuses" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="loadData">查询</el-button>
    </div>
    <el-row>
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <chart :showPercent="true" title="子公司合同分析" ref="chart" :onclick="handleBarChartClick" height="calc(100vh - 230px)"></chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Chart from '@/components/Chart/QuantityAmountBarChart'
import { getProjectStatuses, getContractTypes, getContractStatuses } from '@/api/dataDict'
import { getCompanyAmounts } from '@/api/contract'
import GlobalConsts from '@/consts'
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'
import { goToList } from '@/views/contract/utils'
import moment from 'moment'

export default {
  name: 'contract-company-barchart',
  data() {
    return {
      daterange: [],
      query: { from: null, to: null, contractStatus: null, projectStatusId: null, contractTypeId: null },
      statuses: [], // 合同状态,
      types: [], // 合同类型
      projectStatuses: [], // 项目状态
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
        this.query = Object.assign({}, this.query, { from: val[0], to: val[1] })
      } else {
        this.query = Object.assign({}, this.query, { from: null, to: null })
      }
    }
  },
  created() {
    // this.query.yearDate = new Date()

    this.getQueryFromUrl()

    getProjectStatuses(this.query.organizationId).then(response => {
      this.projectStatuses = response.data
    })

    getContractStatuses(this.query.organizationId).then(response => {
      this.statuses = response.data
    })

    getContractTypes(this.query.organizationId).then(response => {
      this.types = response.data
    })
  },
  methods: {
    getQueryFromUrl() {
      this.query.organizationId = this.$route.query.organizationId || null
      this.query.organizationType = this.$route.query.organizationType || null
      this.query.contractTypeId = this.$route.query.contractTypeId || null
      this.query.projectStatusId = this.$route.query.projectStatusId || null
      this.query.contractStatus = this.$route.query.contractStatus || null
      if (this.$route.query.from && this.$route.query.to) {
        this.daterange = [this.$route.query.from, this.$route.query.to]
      }
    },
    handleSelect(payload) {
      this.query.organizationId = payload.id
      this.query.organizationType = payload.type
      this.loadData()
    },
    handleBarChartClick(params) {
      var title = '合同列表'
      var index = this.chartData.organizations.findIndex(t => t === params.name)
      this.query.organizationId = this.chartData.ids[index]
      this.query.organizationType = GlobalConsts.Organization.Company.Type
      goToList(this.$store, this.$router, title, this.query)
    },
    loadData() {
      if (this.query.yearDate) {
        this.query.year = moment(this.query.yearDate).year()
      } else {
        this.query.year = null
      }

      this.$refs.chart.showLoading()
      getCompanyAmounts(this.query).then(res => {
        this.chartData = res.data
        this.$refs.chart.loadChartData(res.data)
        this.$refs.chart.hideLoading()
      })
    }
  }
}
</script>
