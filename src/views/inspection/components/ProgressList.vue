<template>
    <el-table v-loading="loading" stripe fit :data="list" style="width: 100%">
      <el-table-column prop="problemClass" label="问题类型" width="80px"></el-table-column>
      <el-table-column prop="complete" label="已整改" width="65px"></el-table-column>
      <el-table-column prop="unComplete" label="在整改" width="65px"></el-table-column>
      <el-table-column prop="expire" label="逾期未整改" width="65px"></el-table-column>
      <el-table-column prop="completeRatio" label="整改完成率" min-width="50px">
          <template slot-scope="scope">
            <el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.completeRatio"></el-progress>
          </template>
      </el-table-column>
    </el-table>
</template>

<script>
import * as inspectionAPI from '@/api/inspection'

export default {
  props: {
    query: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      list: []
    }
  },
  created() {
    this.loading = true
    inspectionAPI.getProblemClassStats(this.query).then(res => {
      this.list = res.data
      this.loading = false
    })
  }
}
</script>

