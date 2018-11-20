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
      <el-select clearable style="width: 120px" class="filter-item" @change="loadData" v-model="query.projectTypeId" placeholder="项目类型">
        <el-option v-for="item in projectTypes" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-select clearable style="width: 120px" class="filter-item" @change="loadData" v-model="query.type2Id" placeholder="合同类型">
        <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-select clearable style="width: 140px" class="filter-item" @change="loadData" v-model="query.type1" placeholder="变更条件类型">
        <el-option v-for="item in conditionTypes" :key="item.id" :label="item.name" :value="item.name">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="loadData">查询</el-button>
    </div>
    <el-row>
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <chart :showPercent="true" title="子公司变更分析" ref="chart" :onclick="handleBarChartClick" height="calc(100vh - 230px)"></chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Chart from '@/components/Chart/QuantityAmountBarChart'
import { getDefaultProjectTypes } from '@/api/project'
import { getAlterTypes, getAlterConditionTypes } from '@/api/dataDict'
import { getCompanyAmounts } from '@/api/alteration'
import GlobalConsts from '@/consts'
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'
import { goToList } from '@/views/alteration/utils'
import moment from 'moment'

export default {
  name: 'alter-company-barchart',
  data() {
    return {
      daterange: [],
      query: { from: null, to: null, type1: null, type2Id: null, projectTypeId: null },
      conditionTypes: [], // 变更条件类型,
      types: [], // 变更类型
      projectTypes: [], // 项目类型
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

    getAlterTypes(this.organizationId).then(response => {
      this.types = response.data
    })

    getAlterConditionTypes(this.organizationId).then(response => {
      this.conditionTypes = response.data
    })

    getDefaultProjectTypes().then(response => {
      this.projectTypes = response.data
    })
  },
  methods: {
    getQueryFromUrl() {
      this.query.organizationId = this.$route.query.organizationId || null
      this.query.organizationType = this.$route.query.organizationType || null
      this.query.type2Id = this.$route.query.type2Id || null
      this.query.type1 = this.$route.query.type1 || null
      this.query.level = this.$route.query.level || null
      this.query.projectTypeId = this.$route.query.projectTypeId || null
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
      var title = '变更列表'
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
