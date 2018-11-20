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
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <progress-gauge :query="query"></progress-gauge>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <investment-gauge :query="query"></investment-gauge>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <quality-gauge :query="query"></quality-gauge>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProgressGauge from './components/ProgressGauge'
import InvestmentGauge from './components/InvestmentGauge'
import QualityGauge from './components/QualityGauge'
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'

export default {
  name: 'warning',
  data() {
    return {
      selected: {},
      daterange: [],
      query: {}
    }
  },
  components: {
    ProgressGauge,
    InvestmentGauge,
    QualityGauge,
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
    handleSelect(data) {
      this.selected = data
      this.query = Object.assign({}, this.query, { organizationId: data.id, organizationType: data.type })
    }
  }
}
</script>
