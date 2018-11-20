<template>
  <div class="app-container data-list-container">
    <div class="filter-container">
      <organization-unit-tree-select :selected="selected" :excludeProject="true" class="filter-item" style="width:300px" @select="handleSelect"></organization-unit-tree-select>
      <el-input clearable @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="项目名称" v-model="listQuery.name">
      </el-input>
      <el-select clearable style="width: 160px" class="filter-item" @change="handleFilter" v-model="listQuery.phaseId" placeholder="项目阶段">
        <el-option v-for="item in phases" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-select clearable style="width: 160px" class="filter-item" @change="handleFilter" v-model="listQuery.statusId" placeholder="项目状态">
        <el-option v-for="item in statuses" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-select clearable style="width: 160px" class="filter-item" @change="handleFilter" v-model="listQuery.projectTypeId" placeholder="项目类型">
        <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
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
    <el-table v-loading="loading" stripe border fit highlight-current-row :data="projects" style="width: 100%;">
      <el-table-column type="expand">
           <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="项目名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="项目阶段">
                <span>{{ props.row.phaseName }}</span>
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
                <span>{{ props.row.description }}</span>
              </el-form-item>
            </el-form>
          </template>
      </el-table-column>
      <el-table-column prop="name" label="项目名称"></el-table-column>
      <el-table-column prop="phaseName" label="阶段">
        <template slot-scope="scope">
          <span v-if="scope.row.phaseValue&&scope.row.phaseValue==6" class="label label-danger">{{scope.row.phaseName}}</span>
          <span v-if="scope.row.phaseValue&&scope.row.phaseValue==5" class="label label-success">{{scope.row.phaseName}}</span>
          <span v-if="scope.row.phaseValue&&(scope.row.phaseValue!=6&&scope.row.phaseValue!=5)" class="label label-info">{{scope.row.phaseName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="projectTypeName" label="项目类型"></el-table-column>
      <el-table-column prop="legalPerson" label="负责人"></el-table-column>
      <el-table-column prop="investmentAmount" label="投资额">
        <template slot-scope="scope">
          <span>{{scope.row.investmentAmount|chineseAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="开工时间">
        <template slot-scope="scope">
           <span>{{scope.row.startTime|date}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="completionTime" label="竣工时间">
        <template slot-scope="scope">
           <span>{{scope.row.completionTime|date}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'
import { getGroupProjectList, getDefaultProjectTypes } from '@/api/project'
import {
  getProjectPhases,
  getProjectStatuses
} from '@/api/dataDict'

export default {
  name: 'project-info-list',
  data() {
    return {
      selected: null,
      loading: false,
      listQuery: {
        name: '',
        phaseId: null,
        page: 1,
        limit: 100
      },
      daterange: [],
      total: 1000,
      projects: [],
      phases: [],
      statuses: [],
      types: []
    }
  },
  components: {
    OrganizationUnitTreeSelect
  },
  created() {
    this.getQueryFromUrl()

    this.handleFilter()

    getProjectPhases(this.organizationId).then(response => {
      this.phases = response.data
    })

    getProjectStatuses(this.organizationId).then(response => {
      this.statuses = response.data
    })

    getDefaultProjectTypes().then(response => {
      this.types = response.data
    })
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
    getQueryFromUrl() {
      this.listQuery.organizationId = this.$route.query.organizationId || null
      this.listQuery.organizationType =
        this.$route.query.organizationType || null
      if (this.listQuery.organizationId && this.listQuery.organizationType) {
        this.selected =
          this.listQuery.organizationType + '_' + this.listQuery.organizationId
      }
      this.listQuery.phaseId = this.$route.query.phaseId || null
      this.listQuery.statusId = this.$route.query.statusId || null
      this.listQuery.projectTypeId = this.$route.query.projectTypeId || null
      if (this.$route.query.from && this.$route.query.to) {
        this.daterange = [this.$route.query.from, this.$route.query.to]
      }
    },
    handleSelect(payload) {
      this.listQuery.organizationId = payload.id
      this.listQuery.organizationType = payload.type
      this.handleFilter()
    },
    handleFilter() {
      if (!this.listQuery.organizationId || !this.listQuery.organizationType) {
        return
      }

      this.loading = true
      getGroupProjectList(this.listQuery).then(response => {
        this.projects = response.data
        this.loading = false
        this.total = response.data.length
      })
    },
    handleSizeChange() {
      this.handleFilter()
    },
    handleCurrentChange() {
      this.handleFilter()
    }
  }
}
</script>

<style scoped>
.projectStatus {
  color: #fff;
}

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

