<template>
  <box title="项目进度表" class="box-primary">
    <template slot="header-tools">
      <div class="input-group input-group-sm" style="width: 150px;">
        <input type="text" v-model="text" @change="search" name="table_search" class="form-control pull-right" placeholder="项目名称">
        <div class="input-group-btn">
          <button v-on:click="search" type="submit" class="btn btn-default"><v-icon style="vertical-align:middle" :scale="0.8" name="search"></v-icon></button>
        </div>
      </div>
    </template>
      <el-table v-loading="loading" stripe border fit highlight-current-row :data="filterProjects" style="width: 100%">
        <el-table-column prop="name" label="项目名称"></el-table-column>
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
        <el-table-column prop="completeAmount" label="已计量金额">
          <template slot-scope="scope">
            <span>{{scope.row.completeAmount|chineseAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="paymentAmount" label="已支付金额">
          <template slot-scope="scope">
            <span>{{scope.row.paymentAmount|chineseAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="unCompleteAmount" label="未计量金额">
          <template slot-scope="scope">
            <span>{{scope.row.unCompleteAmount|chineseAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="unPaymentAmount" label="未支付金额">
          <template slot-scope="scope">
            <span>{{scope.row.unPaymentAmount|chineseAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="completeRatio" label="已计量比例" width="120">
            <template slot-scope="scope">
              <el-progress :color="getProgressColor(scope.row.completeRatio)" :text-inside="true" :stroke-width="18" :percentage="scope.row.completeRatio"></el-progress>
            </template>
        </el-table-column>
        <el-table-column prop="paymentRatio" label="已支付比例" width="120">
            <template slot-scope="scope">
              <el-progress :color="getProgressColor(scope.row.paymentRatio)" :text-inside="true" :stroke-width="18" :percentage="scope.row.paymentRatio"></el-progress>
            </template>
        </el-table-column>
      </el-table>
  </box>
</template>

<script>
import { getProjectStats } from '@/api/decisionSupport/projectProgress'
import Box from '@/components/Box/Box'
import { getContractTypes } from '@/api/dataDict'

export default {
  props: {
    query: {}
  },
  data() {
    return {
      text: '',
      projects: [],
      filterProjects: [],
      loading: false
    }
  },
  watch: {
    query() {
      this.handleFilter()
    }
  },
  components: {
    Box
  },
  methods: {
    handleFilter() {
      if (!this.query.organizationId) {
        return
      }
      this.loading = true
      getProjectStats(this.query).then(response => {
        this.projects = response.data.map(t => {
          t.totalAmount = t.contractAmount + t.alterAmount
          t.unCompleteAmount = t.totalAmount - t.completeAmount
          t.unPaymentAmount = t.totalAmount - t.paymentAmount
          t.completeRatio = 0
          t.paymentRatio = 0
          if (t.totalAmount) {
            t.completeRatio = (t.completeAmount / t.totalAmount) * 100
            t.paymentRatio = (t.paymentAmount / t.totalAmount) * 100
          }
          t.completeRatio = t.completeRatio.toFixed(2) * 1
          t.paymentRatio = t.paymentRatio.toFixed(2) * 1
          return t
        })
        this.loading = false
        this.search()
      })
    },
    getProgressColor(completeRatio) {
      if (completeRatio < 25) {
        return '#dd4b39'
      } else if (completeRatio < 75) {
        return '#f39c12'
      } else if (completeRatio < 100) {
        return '#0073b7'
      } else {
        return '#00a65a'
      }
    },
    search() {
      this.loading = true
      this.filterProjects = this.projects.filter(t => {
        if (this.text) {
          return t.name.indexOf(this.text) > -1
        }
        return true
      })
      this.loading = false
    },
    handleAmountLedger(row) {
      var reportServerUrl = 'http://test'
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

