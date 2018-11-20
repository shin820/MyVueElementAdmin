<template>
  <div class="app-container data-list-container">
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
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查询</el-button>
      <!-- <el-button class="filter-item" type="primary" icon="el-icon-download" style="margin-left:0px;">导出</el-button> -->
    </div>
    <el-table v-loading="loading" stripe border fit highlight-current-row :data="reports" style="width: 100%;">
      <el-table-column fixed prop="projectName" label="项目名称" min-width="120"></el-table-column>
      <el-table-column fixed prop="reportDate" label="填报日期" min-width="100">
        <template slot-scope="scope">
           <span>{{scope.row.reportDate|date}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop="projectInfo" label="建设规模、投资总额和总工程量" width="300">
        <template slot-scope="scope">
          <el-input type="textarea" readonly rows="12" v-model="scope.row.projectInfo" width="300"></el-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop="plan" label="本周初工作计划" width="300">
        <template slot-scope="scope">
          <el-input type="textarea" readonly rows="12" v-model="scope.row.plan" width="300"></el-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop="actual" label="本周实际完成工作情况" width="300">
        <template slot-scope="scope">
          <el-input type="textarea" readonly rows="12" v-model="scope.row.actual" width="300"></el-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop="nextPlan" label="下周工作安排" width="300">
        <template slot-scope="scope">
          <el-input type="textarea" readonly rows="12" v-model="scope.row.nextPlan" width="300"></el-input>
        </template>
      </el-table-column>
      <el-table-column header-align="center" prop="note" label="备注" width="300">
        <template slot-scope="scope">
          <el-input type="textarea" readonly rows="12" v-model="scope.row.note" width="300"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
import { getWeeklyReport } from '@/api/project'
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'

export default {
  name: 'weeklyreport',
  data() {
    return {
      loading: false,
      selected: {},
      daterange: [],
      listQuery: {
        projectName: '',
        from: null,
        to: null
      },
      reports: []
    }
  },
  components: {
    OrganizationUnitTreeSelect
  },
  created() {
    this.handleFilter()
  },
  watch: {
    daterange(val) {
      if (val && val.length === 2) {
        this.listQuery.from = val[0]
        this.listQuery.to = val[1]
      } else {
        this.listQuery.from = null
        this.listQuery.to = null
      }
    }
  },
  methods: {
    handleFilter() {
      this.loading = true
      getWeeklyReport(this.listQuery).then(response => {
        this.reports = response.data
        this.loading = false
      })
    },
    handleSelect(payload) {
      this.selected = payload
      this.listQuery.organiationId = payload.id
      this.handleFilter()
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  }
}
</script>

