<template>
  <div class="app-container data-list-container">
    <div class="filter-container">
      <organization-unit-tree-select :selected="selected" class="filter-item" style="width:300px" @select="handleSelect"></organization-unit-tree-select>
      <el-select clearable style="width: 120px" class="filter-item" @change="handleFilter" v-model="listQuery.problemClass" placeholder="问题分类">
        <el-option key="质量" label="质量" value="质量"></el-option>
        <el-option key="安全" label="安全" value="安全"></el-option>
        <el-option key="其他" label="其他" value="其他"></el-option>
      </el-select>
      <el-select clearable style="width: 120px" class="filter-item" @change="handleFilter" v-model="listQuery.isDone" placeholder="处理状态">
        <el-option key="未处理" label="未处理" value="false"></el-option>
        <el-option key="已处理" label="已处理" value="true"></el-option>
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
    <el-table v-loading="loading" stripe border fit highlight-current-row :data="issues" style="width: 100%;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="项目">
              <span>{{ props.row.projectName }}</span>
            </el-form-item>
            <el-form-item label="施工单位">
              <span>{{ props.row.contractorUnitName }}</span>
            </el-form-item>
            <el-form-item label="问题描述">
              <span>{{ props.row.problemDescription }}</span>
            </el-form-item>
            <el-form-item label="问题分类">
              <span>{{ props.row.problemClass }}</span>
            </el-form-item>
            <el-form-item label="问题状态">
              <span>{{ props.row.status }}</span>
            </el-form-item>
            <el-form-item label="问题级别">
              <span>{{ props.row.problemGrade }}</span>
            </el-form-item>
            <el-form-item label="巡检时间">
              <span>{{ props.row.inspectionDate|date }}</span>
            </el-form-item>
            <el-form-item label="巡检位置">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="整改期限">
              <span>{{ props.row.deadline|date }}</span>
            </el-form-item>
            <el-form-item label="整改人">
              <span>{{ props.row.abarbeitungUserName }}</span>
            </el-form-item>
            <el-form-item label="整改要求">
              <span>{{ props.row.requirement }}</span>
            </el-form-item>
            <el-form-item label="整改时间">
              <span>{{ props.row.abarbeitungDate|date }}</span>
            </el-form-item>
            <el-form-item label="整改过程">
              <span>{{ props.row.abarbeitungProcess }}</span>
            </el-form-item>
          </el-form>
          <div class="attach-list">
            <img v-img="{group:props.row.id,title:'问题'}" :src="photo" :key="photo" v-for="photo in props.row.photoList"/>
            <img v-img="{group:props.row.id,title:'整改'}" :src="photo" :key="photo" v-for="photo in props.row.processPhotoList"/>
            <aplayer :music="{ src:audio }" :mini="true" :float="false" :key="audio" v-for="audio in props.row.audioList"></aplayer>
            <aplayer :music="{ src:audio }" :mini="true" :float="false" :key="audio" v-for="audio in props.row.processAudioList"></aplayer>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="problemDescription" label="问题描述"></el-table-column>
      <el-table-column prop="problemClass" label="问题分类" width="80"></el-table-column>
      <el-table-column prop="status" label="问题状态" width="80"></el-table-column>
      <el-table-column prop="problemGrade" label="问题级别" width="120"></el-table-column>
      <el-table-column prop="deadline" label="整改期限">
        <template slot-scope="scope">
          <span>{{scope.row.deadline|date}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="projectName" label="项目"></el-table-column>
      <el-table-column prop="contractorUnitName" label="施工单位"></el-table-column>
      <el-table-column prop="inspectionDate" label="巡检时间">
        <template slot-scope="scope">
          <span>{{scope.row.inspectionDate|date}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="abarbeitungUserName" label="整改人"></el-table-column>
      <el-table-column prop="abarbeitungDate" label="整改时间">
        <template slot-scope="scope">
          <span>{{scope.row.abarbeitungDate|date}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getPagedIssueList } from '@/api/decisionSupport/qualitySafety'
import OrganizationUnitTreeSelect from '@/components/OrganizationUnitTreeSelect'
import Aplayer from 'vue-aplayer'

export default {
  name: 'quality-safety-list',
  data() {
    return {
      loading: false,
      selected: null,
      daterange: [],
      listQuery: {
        organizationId: 0,
        organizationType: 0,
        problemClass: '',
        from: null,
        to: null
      },
      issues: [],
      total: 0,
      page: 1,
      pageSize: 10
    }
  },
  components: {
    OrganizationUnitTreeSelect,
    Aplayer
  },
  created() {
    this.getQueryFromUrl()
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
    getQueryFromUrl() {
      if (this.$route.query.organizationId && this.$route.query.organizationType) {
        this.listQuery.organizationId = this.$route.query.organizationId
        this.listQuery.organizationType = this.$route.query.organizationType
        this.listQuery.problemClass = this.$route.query.problemClass
        this.listQuery.from = this.$route.query.from
        this.listQuery.to = this.$route.query.to
        if (this.listQuery.from && this.listQuery.to) {
          this.daterange = [this.listQuery.from, this.listQuery.to]
        }
        if (this.$route.query.isDone !== undefined) {
          this.listQuery.isDone = this.$route.query.isDone.toString()
        }
        this.selected = this.listQuery.organizationType + '_' + this.listQuery.organizationId
      }
    },
    handleFilter() {
      if (!this.listQuery.organizationId || !this.listQuery.organizationType) {
        return
      }
      this.loading = true
      this.listQuery.skipCount = (this.page - 1) * this.pageSize
      this.listQuery.maxResultCount = this.pageSize
      getPagedIssueList(this.listQuery).then(response => {
        this.issues = response.data.items
        this.total = response.data.totalCount
        this.loading = false
      })
    },
    handleSelect(payload) {
      this.listQuery.organizationId = payload.id
      this.listQuery.organizationType = payload.type
      this.handleFilter()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.handleFilter()
    },
    handleCurrentChange(val) {
      this.page = val
      this.handleFilter()
    }
  }
}
</script>

<style lang="scss">
  .attach-list {
    margin-top: 10px;
    img{
      width: 100px;
      height: 100px;
      float: left;
      margin-right: 5px;
      margin-bottom: 5px;
    }
    div.aplayer-narrow{
      background: #000;
      width: 100px;
      height: 100px;
      float: left;
      margin: 0px 5px 5px 0px;

      div.aplayer-body{
        width:100%;
        height: 100%;

        div.aplayer-pic{
          width:100%;
          height: 100%;
          background-image:none;

          .aplayer-play {
            width: 50px;
            height: 50px;
            bottom: 50%;
            right: 50%;
            margin: 0 -25px -25px 0;

            .aplayer-icon-play{
              top: -1px;
              left: 3px;
              height: 50px;
              width: 50px;
            }
          }

          .aplayer-pause{
            .aplayer-icon-pause{
              top: 1px;
              left: 0px;
            }
          }
        }
      }
    }
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

