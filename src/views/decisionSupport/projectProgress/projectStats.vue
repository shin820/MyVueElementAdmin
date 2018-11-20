<template>
  <div class="app-container data-list-container">
    <div class="filter-container">
      <organization-unit-tree-select class="filter-item" style="width:300px" @select="handleSelect"></organization-unit-tree-select>
      <el-date-picker
        v-model="listQuery.date"
        class="filter-item"
        type="date"
        placeholder="查询时间">
     </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <!-- <el-button class="filter-item" type="primary" icon="el-icon-download" style="margin-left:0px;">导出</el-button> -->
    </div>
    <el-table v-loading="loading" stripe border fit highlight-current-row :data="projects" style="width: 100%;">
       <el-table-column fixed type="expand">
           <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="项目名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="项目类型">
                <span>{{ props.row.projectTypeName }}</span>
              </el-form-item>
              <el-form-item label="负责人">
                <span>{{ props.row.legalPerson }}</span>
              </el-form-item>
              <el-form-item label="投资额">
                <span>{{ props.row.investmentAmount|chineseAmount }}</span>
              </el-form-item>
              <el-form-item label="开工时间">
                <span>{{ props.row.startTime|date }}</span>
              </el-form-item>
              <el-form-item label="竣工时间">
                <span>{{ props.row.completionTime|date }}</span>
              </el-form-item>
              <el-form-item label="项目概况">
                <span>{{ props.row.description}}</span>
              </el-form-item>
            </el-form>
          </template>
      </el-table-column>
      <el-table-column prop="name" label="项目名称" width="200"></el-table-column>
      <el-table-column label="报表" width="140">
        <template slot-scope="scope">
          <el-button :loading="scope.row.loading" type="success" size="mini" @click="handleAmountLedger(scope.row)" icon="el-icon-tickets">费用台账</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="contractAmount" label="合同金额">
        <template slot-scope="scope">
          <span>{{scope.row.contractAmount|chineseAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="alterAmount" label="变更金额">
        <template slot-scope="scope">
          <span>{{scope.row.alterAmount|chineseAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalAmount" label="变更后总金额">
        <template slot-scope="scope">
          <span>{{scope.row.totalAmount|chineseAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="completeAmount" label="完成金额">
        <template slot-scope="scope">
          <span>{{scope.row.completeAmount|chineseAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="paymentAmount" label="支付金额">
        <template slot-scope="scope">
          <span>{{scope.row.paymentAmount|chineseAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="unCompleteAmount" label="未完成金额">
        <template slot-scope="scope">
          <span>{{scope.row.unCompleteAmount|chineseAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="unPaymentAmount" label="未支付金额">
        <template slot-scope="scope">
          <span>{{scope.row.unPaymentAmount|chineseAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="completeRatio" label="完成比例">
        <template slot-scope="scope">
          <span>{{scope.row.completeRatio}}%</span>
        </template>
      </el-table-column>
      <el-table-column prop="paymentRatio" label="支付比例">
        <template slot-scope="scope">
          <span>{{scope.row.paymentRatio}}%</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getProjectStats } from '@/api/decisionSupport/projectProgress'
import { getContractTypes } from '@/api/dataDict'

import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'

export default {
  name: 'projectStats',
  data() {
    return {
      loading: false,
      selected: {},
      listQuery: {
        organizationId: null,
        organizationType: null,
        date: null
      },
      projects: []
    }
  },
  components: {
    OrganizationUnitTreeSelect
  },
  created() {
    this.handleFilter()
  },
  methods: {
    handleFilter() {
      if (!this.listQuery.organizationId) {
        return
      }
      this.loading = true
      getProjectStats(this.listQuery).then(response => {
        this.projects = response.data.map(t => {
          t.totalAmount = t.contractAmount + t.alterAmount
          t.unCompleteAmount = t.totalAmount - t.completeAmount
          t.unPaymentAmount = t.totalAmount - t.paymentAmount
          t.completeRatio = 0
          t.paymentRatio = 0
          if (t.totalAmount) {
            t.completeRatio = (
              (t.completeAmount / t.totalAmount) *
              100
            ).toFixed(2)
            t.paymentRatio = ((t.paymentAmount / t.totalAmount) * 100).toFixed(
              2
            )
          }

          return t
        })
        this.loading = false
      })
    },
    handleSelect(payload) {
      this.selected = payload
      this.listQuery.organizationId = payload.id
      this.listQuery.organizationType = payload.type
      this.handleFilter()
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleAmountLedger(row) {
      var reportServerUrl = ''
      var projectId = row.id
      this.$set(row, 'loading', true)
      getContractTypes(projectId).then(res => {
        this.$set(row, 'loading', false)
        var dictIdsString = res.data.map(t => t.id).join(',')
        var url = `${reportServerUrl}?reportlet=Project_Payment_Ledger.cpt&projectId=${projectId}&contractTypeIds=${dictIdsString}&op=view`
        window.open(url)
      })
    }
  }
}
</script>

<style scoped>
.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
