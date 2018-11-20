<template>
  <div class="app-container">
    <div class="filter-container">
      <organization-unit-tree-select :excludeProject="true" class="filter-item" style="width:300px" @select="handleSelect"></organization-unit-tree-select>
      <el-date-picker class="filter-item" v-model="query.monthDate" @change="loadData" type="month" placeholder="选择月"></el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="loadData">查询</el-button>
    </div>
    <div ref='content'>
      <el-row :gutter="16">
        <el-col :xs="24" :sm="24" :lg="8" v-for="options in chartOptions" v-bind:key="options.title.text">
          <div class="chart-wrapper">
            <chart :options="options" :onclick="handleChartClick" height="300px"></chart>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Chart/Chart'
import { getCompanyVisualProgressStats } from '@/api/progress'
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'
// import { goCompanyTypeChart } from './utils'
import moment from 'moment'

export default {
  name: 'visual-company-progress-piechart',
  data() {
    return {
      query: { monthDate: null },
      chartData: {},
      chartOptions: []
    }
  },
  components: {
    OrganizationUnitTreeSelect,
    Chart
  },
  created() {
    this.query.monthDate = new Date()
  },
  methods: {
    handleSelect(payload) {
      this.query.organizationId = payload.id
      this.query.organizationType = payload.type
      this.loadData()
    },
    handleChartClick(params) {
      // var query = {
      //   organizationId: this.selected.id,
      //   organizationType: this.selected.type,
      //   phaseId: this.query.phaseId
      // }

      // if (this.query.yearDate) {
      //   query.from = moment(this.query.yearDate).format('YYYY-01-01')
      //   query.to = moment(this.query.yearDate).add(1, 'year').format('YYYY-01-01')
      // }

      // var title = `子公司项目情况-${params.name}`
      // var index = this.chartData.organizations.findIndex(t => t === params.name)
      // var typeId = this.chartData.ids[index]
      // if (typeId) {
      //   query.projectTypeId = typeId
      // }
      // goCompanyTypeChart(this.$store, this.$router, title, query)
    },
    loadData() {
      if (this.query.monthDate) {
        this.query.year = moment(this.query.monthDate).year()
        this.query.month = moment(this.query.monthDate).month() + 1
      } else {
        this.query.year = null
        this.query.month = null
      }

      const loading = this.$loading({ target: this.$refs.content, lock: true })
      getCompanyVisualProgressStats(this.query).then(res => {
        this.chartData = res.data
        this.chartOptions = this.toChartOptions(res.data)
        loading.close()
      })
    },
    toChartOptions(rawData) {
      return rawData.map(t => {
        return {
          animation: false,
          title: {
            text: t.name
          },
          legend: {
            top: 30,
            data: t.value.map(i => i.name)
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          series: [
            {
              name: t.name,
              type: 'pie',
              radius: '60%',
              center: ['50%', '55%'],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              data: t.value
            }
          ]
        }
      })
    }
  }
}
</script>
