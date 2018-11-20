<template>
    <box :title="query.organizationType==1?'各子公司问题整改率':(query.organizationType==2?'各项目问题整改率':'各标段问题整改率')">
      <template slot="body">
        <el-table
          :row-style="{cursor:'pointer'}"
          @row-dblclick="$emit('row-dblclick',$event)"
          v-loading="loading"
          :data="statsList" border
          style="width: 100%">
          <el-table-column v-if="query.organizationType==1" prop="name" label="子公司" width="200"></el-table-column>
          <el-table-column v-if="query.organizationType==2" prop="name" label="项目" width="200"></el-table-column>
          <el-table-column v-if="query.organizationType==3" prop="name" label="标段" width="200"></el-table-column>
          <el-table-column prop="total" label="问题总数"></el-table-column>
          <el-table-column prop="minor" label="轻微"></el-table-column>
          <el-table-column prop="normal" label="一般"></el-table-column>
          <el-table-column prop="major" label="较大"></el-table-column>
          <el-table-column prop="severity" label="严重"></el-table-column>
          <el-table-column prop="completed" label="已整改"></el-table-column>
          <el-table-column prop="unCompleted" label="在整改"></el-table-column>
          <el-table-column prop="expired" label="逾期未整改"></el-table-column>
          <el-table-column prop="completeRatio" label="整改完成率" width="200">
            <template slot-scope="scope">
              <el-progress :color="getProgressColor(scope.row.completeRatio)" :text-inside="true" :stroke-width="18" :percentage="scope.row.completeRatio"></el-progress>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </box>
</template>

<script>
import * as inspectionApi from '@/api/inspection'
import Box from '@/components/Box/Box'

export default {
  props: {
    query: Object,
    required: true
  },
  data() {
    return {
      loading: false,
      statsList: []
    }
  },
  components: {
    Box
  },
  watch: {
    query: function(newVal) {
      this.load()
    }
  },
  mounted() {
    if (this.query.organizationType && this.query.organizationId) {
      this.load()
    }
  },
  methods: {
    load() {
      if (this.query.organizationType === 1) {
        this.loading = true
        this.getCompanyStatList(this.query).then(res => {
          this.statsList = res.data
          this.loading = false
        })
      } else if (this.query.organizationType === 2) {
        this.loading = true
        this.getProjectStatList(this.query).then(res => {
          this.statsList = res.data
          this.loading = false
        })
      } else if (this.query.organizationType === 3) {
        this.loading = true
        this.getSectionStatList(this.query).then(res => {
          this.statsList = res.data
          this.loading = false
        })
      }
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
    ...inspectionApi
  }
}
</script>

