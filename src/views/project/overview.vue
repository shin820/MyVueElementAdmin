<template>
  <div class="app-container">
    <div class="filter-container">
      <organization-unit-tree-select :excludeProject="true" class="filter-item" style="width:300px" @select="handleSelect"></organization-unit-tree-select>
      <!-- <el-date-picker class="filter-item" v-model="query.yearDate" type="year" placeholder="选择年度"></el-date-picker> -->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="loadData">查询</el-button>
    </div>
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <nested-total-pie-chart labelSize="small" :center="['50%','60%']" :innerRadius="['0','25%']" :outterRadius="['35%','55%']" title="项目类型统计" :onclick="onClickPojectTypePie" :query="query" :dataFunc="getTypeQuantityPieChart"></nested-total-pie-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <nested-total-pie-chart labelSize="small" :center="['50%','60%']" :innerRadius="['0','25%']" :outterRadius="['35%','55%']" title="项目阶段统计" :onclick="onClickPojectPhasePie" :query="query" :dataFunc="getPhaseQuantityPieChart"></nested-total-pie-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <nested-total-pie-chart labelSize="small" :center="['50%','60%']" :innerRadius="['0','25%']" :outterRadius="['35%','55%']" title="项目状态统计" :onclick="onClickPojectStatusPie" :query="query" :dataFunc="getStatusQuantityPieChart"></nested-total-pie-chart>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :lg="24">
        <map-box :organizationId="query.organizationId" :organizationType="query.organizationType" ref="map" height="480px"></map-box>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :lg="24">
        <project-progress-table-box :query="query"></project-progress-table-box>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <quantity-amount-bar-chart title="子公司项目分布" :query="query" :dataFunc="getCompanyAmounts" height="400px"></quantity-amount-bar-chart>
        </div>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import * as projectAPI from '@/api/project'
import NestedTotalPieChart from '@/components/Chart/NestedTotalPieChart'
import NestedTotalAmountPieChart from '@/components/Chart/NestedTotalAmountPieChart'
import QuantityAmountBarChart from '@/components/Chart/QuantityAmountBarChart'
import BarChart from '@/components/Chart/BarChart'
import MapBox from './components/MapBox'
import ProjectProgressTableBox from './components/ProjectProgressTableBox'
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'
import moment from 'moment'
import { goToList } from './utils'

export default {
  name: 'project-overview',
  data() {
    return {
      selected: null,
      type: null,
      query: { yearDate: null }
    }
  },
  components: {
    QuantityAmountBarChart,
    NestedTotalPieChart,
    NestedTotalAmountPieChart,
    MapBox,
    OrganizationUnitTreeSelect,
    BarChart,
    ProjectProgressTableBox
  },
  created() {
    this.query.yearDate = new Date()
  },
  watch: {
    'query.yearDate': function(newVal) {
      if (newVal) {
        this.query.year = moment(newVal).year()
      } else {
        this.query.year = null
      }
    }
  },
  methods: {
    handleSelect(payload) {
      this.selected = payload
      this.query = Object.assign({}, this.query, {
        organizationId: payload.id,
        organizationType: payload.type
      })
      this.type = payload.type
      this.$refs.map.load(this.query)
    },
    loadData() {
      this.query = Object.assign({}, this.query)
      this.$refs.map.load(this.query)
    },
    onClickPojectTypePie(params) {
      var query = {
        organizationId: this.query.organizationId,
        organizationType: this.query.organizationType
      }
      if (params.data.nameId) {
        query.projectTypeId = params.data.nameId
      }
      goToList(this.$store, this.$router, '项目信息表', query)
    },
    onClickPojectPhasePie(params) {
      var query = {
        organizationId: this.query.organizationId,
        organizationType: this.query.organizationType
      }
      if (params.data.nameId) {
        query.phaseId = params.data.nameId
      }
      goToList(this.$store, this.$router, '项目信息表', query)
    },
    onClickPojectStatusPie(params) {
      var query = {
        organizationId: this.query.organizationId,
        organizationType: this.query.organizationType
      }
      if (params.data.nameId) {
        query.statusId = params.data.nameId
      }
      goToList(this.$store, this.$router, '项目信息表', query)
    },
    ...projectAPI
  }
}
</script>
