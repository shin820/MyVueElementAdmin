<template>
  <div class="app-container data-list-container">
    <div class="filter-container">
      <organization-unit-tree-select :excludeSection="true" class="filter-item" style="width:300px" @select="handleSelect"></organization-unit-tree-select>
      <el-select clearable style="width: 120px" class="filter-item" @change="handleFilter" v-model="listQuery.type2Id" placeholder="合同类型">
        <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-select clearable style="width: 140px" class="filter-item" @change="handleFilter" v-model="listQuery.type1" placeholder="变更条件类型">
        <el-option v-for="item in conditionTypes" :key="item.id" :label="item.name" :value="item.name">
        </el-option>
      </el-select>
      <el-select clearable style="width: 120px" class="filter-item" @change="handleFilter" v-model="listQuery.projectTypeId" placeholder="项目类型">
        <el-option v-for="item in projectTypes" :key="item.id" :label="item.name" :value="item.id">
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
    <el-table v-loading="loading" stripe border fit highlight-current-row :data="alterations" style="width: 100%;">
      <el-table-column type="expand">
           <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="项目名称"><span>{{ props.row.projectName }}</span></el-form-item>
              <el-form-item label="变更编号"><span>{{ props.row.code }}</span></el-form-item>
              <el-form-item label="变更等级"><span>{{ props.row.approvedLevelName }}</span></el-form-item>
              <el-form-item label="变更时间"><span>{{ props.row.alterTime | date }}</span></el-form-item>
              <el-form-item label="变更类型"><span>{{ props.row.type2Name }}</span></el-form-item>
              <el-form-item label="变更金额"><span>{{ props.row.alterAmount|chineseAmount }}</span></el-form-item>
              <el-form-item label="是否历史遗留问题"><span>{{ props.row.isCarryover}}</span></el-form-item>
              <el-form-item label="是否住建环保局"><span>{{ props.row.isBureau}}</span></el-form-item>
              <el-form-item label="是否管委会"><span>{{ props.row.isCommittee}}</span></el-form-item>
              <el-form-item label="集团部门负责人"><span>{{ props.row.principalPerson}}</span></el-form-item>
              <el-form-item label="变更事项"><span>{{ props.row.alterMatter}}</span></el-form-item>
              <el-form-item label="变更部位"><span>{{ props.row.alrerParts}}</span></el-form-item>
              <el-form-item label="最终审批机构"><span>{{ props.row.approvingAuthority}}</span></el-form-item>
              <el-form-item label="收文顺序号"><span>{{ props.row.incomingCode}}</span></el-form-item>
              <el-form-item label="收件时间"><span>{{ props.row.receivedDate}}</span></el-form-item>
              <el-form-item label="变更原因"><span>{{ props.row.reason}}</span></el-form-item>
              <el-form-item label="变更内容"><span>{{ props.row.content}}</span></el-form-item>
              <el-form-item label="变更条件类型"><span>{{ props.row.type1 }}</span></el-form-item>
              <el-form-item label="备注"><span>{{ props.row.note}}</span></el-form-item>
            </el-form>
          </template>
      </el-table-column>
      <el-table-column prop="projectName" label="项目名称"></el-table-column>
      <el-table-column prop="code" label="变更编号" width="100"></el-table-column>
      <el-table-column prop="approvedLevelName" label="变更等级" width="100"></el-table-column>
      <el-table-column prop="alterTime" label="变更时间" width="100">
        <template slot-scope="scope">
           <span>{{scope.row.alterTime|date}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="alterAmount" label="变更金额" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.alterAmount|chineseAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type2Name" label="变更类型" width="100"></el-table-column>
      <el-table-column prop="reason" label="变更原因"></el-table-column>
      <el-table-column prop="content" label="变更内容"></el-table-column>

    </el-table>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'
import { getDefaultProjectTypes } from '@/api/project'
import { getAlterationList } from '@/api/alteration'
import { getAlterTypes, getAlterConditionTypes } from '@/api/dataDict'
import { mapGetters } from 'vuex'

export default {
  name: 'alter-list',
  data() {
    return {
      loading: false,
      daterange: [],
      listQuery: {
        organizationId: 0,
        organizationType: 0,
        from: null,
        to: null
      },
      total: 0,
      page: 1,
      pageSize: 10,
      alterations: [],
      types: [],
      projectTypes: [],
      conditionTypes: []
    }
  },
  components: {
    OrganizationUnitTreeSelect
  },
  created() {
    this.getQueryFromUrl()
    this.handleFilter()

    getAlterTypes(this.organizationId).then(response => {
      this.types = response.data
    })

    getAlterConditionTypes(this.organizationId).then(response => {
      this.conditionTypes = response.data
    })

    getDefaultProjectTypes().then(response => {
      this.projectTypes = response.data
    })
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
    getQueryFromUrl() {
      this.listQuery.type1 = this.$route.query.type1 || null
      this.listQuery.type2Id = this.$route.query.type2Id || null
      this.listQuery.projectTypeId = this.$route.query.projectTypeId || null
      this.listQuery.level = this.$route.query.level || null
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
      this.listQuery.skipCount = (this.page - 1) * this.pageSize
      this.listQuery.maxResultCount = this.pageSize
      getAlterationList(this.listQuery).then(response => {
        this.alterations = response.data.items
        this.total = response.data.totalCount
        this.loading = false
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.handleFilter()
    },
    handleCurrentChange(val) {
      this.page = val
      this.handleFilter()
    }
  },
  computed: {
    ...mapGetters(['organizationId', 'organizationType'])
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
  width: 33.333%;
}
</style>

