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
    <el-row :gutter="16">
      <el-col :xs="24" :sm="12" :lg="12">
        <div class="chart-wrapper">
          <nested-total-amount-pie-chart legendPosition="left" :center="['58%', '55%']" labelSize="small" :showToolBox="false" title="合同类型" :onclick="onClickContractTypePie" :query="query" :dataFunc="getTypeAmountPieChart"></nested-total-amount-pie-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="12">
        <div class="chart-wrapper">
          <nested-total-amount-pie-chart labelSize="small" :showToolBox="false" title="合同状态" :onclick="onClickContractStatusPie" :query="query" :dataFunc="getStatusAmountPieChart"></nested-total-amount-pie-chart>
        </div>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="16">
      <el-col :xs="24" :sm="12" :lg="12">

      </el-col>
      <el-col :xs="24" :sm="12" :lg="12">

      </el-col>
    </el-row> -->
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <quantity-amount-bar-chart title="合同与变更" height="360px" :query="query" :dataFunc="getAlterContrast"></quantity-amount-bar-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as contractAPI from '@/api/contract'
import NestedTotalPieChart from '@/components/Chart/NestedTotalPieChart'
import NestedTotalAmountPieChart from '@/components/Chart/NestedTotalAmountPieChart'
import QuantityAmountBarChart from '@/components/Chart/QuantityAmountBarChart'
import BarChart from '@/components/Chart/BarChart'
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'
import { goToList } from '@/views/contract/utils'
import moment from 'moment'

export default {
  name: 'contract-overview',
  data() {
    return {
      selected: null,
      type: null,
      daterange: [],
      query: { from: null, to: null }
    }
  },
  components: {
    QuantityAmountBarChart,
    NestedTotalPieChart,
    NestedTotalAmountPieChart,
    OrganizationUnitTreeSelect,
    BarChart
  },
  created() {
    this.daterange = [new Date(moment().year(), 0, 1), moment().toDate()]
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
  methods: {
    handleSelect(payload) {
      this.selected = payload
      this.query = Object.assign({}, this.query, {
        organizationId: payload.id,
        organizationType: payload.type
      })
      this.type = payload.type
    },
    loadData() {
      this.query = Object.assign({}, this.query)
    },
    onClickContractTypePie(params) {
      var query = {
        organizationId: this.query.organizationId,
        organizationType: this.query.organizationType
      }
      if (this.query.from && this.query.to) {
        query.from = moment(this.query.from).format('YYYY-MM-DD')
        query.to = moment(this.query.to).format('YYYY-MM-DD')
      }
      if (params.data.nameId) {
        query.contractTypeId = params.data.nameId
      }
      goToList(this.$store, this.$router, '合同列表', query)
    },
    onClickContractStatusPie(params) {
      var query = {
        organizationId: this.query.organizationId,
        organizationType: this.query.organizationType
      }
      if (this.query.from && this.query.to) {
        query.from = moment(this.query.from).format('YYYY-MM-DD')
        query.to = moment(this.query.to).format('YYYY-MM-DD')
      }
      query.contractStatus = params.name
      goToList(this.$store, this.$router, '合同列表', query)
    },
    ...contractAPI
  }
}
</script>
