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
      <el-select clearable style="width: 120px" class="filter-item" @change="loadData" v-model="query.projectTypeId" placeholder="项目类型">
        <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="loadData">查询</el-button>
    </div>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <chart title="项目前期工作" ref="chart" :onclick="handleBarChartClick" height="calc(100vh - 230px)"></chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Chart from '@/components/Chart/QuantityAmountBarChart'
import { getProPhaseAmounts, getDefaultProjectTypes } from '@/api/project'
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'
// import { goToList } from './utils'
import moment from 'moment'

export default {
  name: 'project-prophase-barchart',
  data() {
    return {
      selected: {},
      type: 0,
      daterange: [],
      query: { from: null, to: null },
      types: [] // 项目类型
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

    getDefaultProjectTypes().then(response => {
      this.types = response.data
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
      // var title = '项目列表'
      // var query = {
      //   organizationId: this.selected.id,
      //   organizationType: this.selected.type
      // }

      // const hasStatus = this.statuses.some(t => t.name === params.name)
      // if (hasStatus) {
      //   var statuses = this.statuses.filter(t => t.name === params.name)
      //   query.statusId = statuses[0].id
      // }
      // query.projectTypeId = this.query.projectTypeId
      // if (this.query.from && this.query.to) {
      //   query.from = moment(this.query.from).format('YYYY-MM-DD HH:mm:ss')
      //   query.to = moment(this.query.to).format('YYYY-MM-DD HH:mm:ss')
      // }
      // title = hasStatus ? params.name + '项目' : params.name
      // goToList(this.$store, this.$router, title, query)
    },
    loadData() {
      if (this.query.yearDate) {
        this.query.year = moment(this.query.yearDate).year()
      } else {
        this.query.year = null
      }

      this.$refs.chart.showLoading()
      getProPhaseAmounts(this.query).then(res => {
        this.$refs.chart.loadChartData(res.data)
        this.$refs.chart.hideLoading()
      })
    }
  }
}
</script>
