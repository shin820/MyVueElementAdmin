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
      <!-- <el-cascader style="width:300px" v-model="selected" :options="options" filterable change-on-select placeholder="请选择集团/子公司/项目/合同段"></el-cascader> -->
    </div>
    <el-row :gutter="32">
      <el-col :span="24">
        <div class="chart-wrapper">
          <vertical-bar-chart title="项目进度情况" :dataFunc="getProjectProgress" :query="query" height="980px"></vertical-bar-chart>
        </div>
      </el-col>
    </el-row>
    <!-- <el-row v-if="type==3||type==4" :gutter="32">
      <el-col :span="24">
        <div class="chart-wrapper">
          <vertical-bar-chart title="各标段进度情况" :dataFunc="getSectionProgress" :organizationId="selected.id" :organizationType="selected.type" height="600px"></vertical-bar-chart>
        </div>
      </el-col>
    </el-row> -->
    <!-- <el-row :gutter="16">
      <el-col :span="12">
        <div class="chart-wrapper">
          <overview-pie-chart height="300px"></overview-pie-chart>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-wrapper">
          <overview-line height="300px"></overview-line>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="type==1" :gutter="32">
      <el-col :span="24">
        <div class="chart-wrapper">
          <company-bar-chart height="600px"></company-bar-chart>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="type==2" :gutter="32">
      <el-col :span="24">
        <div class="chart-wrapper">
          <project-bar-chart height="600px"></project-bar-chart>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="type==3" :gutter="32">
      <el-col :span="24">
        <div class="chart-wrapper">
          <section-bar-chart height="600px"></section-bar-chart>
        </div>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import * as projectProgressAPI from '@/api/decisionSupport/projectProgress'

import VerticalBarChart from '../components/VerticalBarChart'
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'

export default {
  name: 'project-progress-chart',
  data() {
    return {
      selected: {},
      type: 0,
      daterange: [],
      query: {}
    }
  },
  components: {
    VerticalBarChart,
    OrganizationUnitTreeSelect
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
    ...projectProgressAPI
  }
}
</script>
