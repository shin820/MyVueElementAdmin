<template>
  <box title="年度项目形象进度列表">
    <template slot="header-tools">
      <div class="input-group input-group-sm" style="width: 150px;">
        <input type="text" v-model="text" @change="search" name="table_search" class="form-control pull-right" placeholder="项目名/状态">
        <div class="input-group-btn">
          <button v-on:click="search" type="submit" class="btn btn-default"><v-icon style="vertical-align:middle" :scale="0.8" name="search"></v-icon></button>
        </div>
      </div>
    </template>
    <el-table v-loading="loading" :data="list" :height="tableHeight">
      <el-table-column prop="projectName" label="项目名称"></el-table-column>
      <el-table-column prop="statusName" label="形象进度" width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.statusName=='正常'" class="label label-success">{{scope.row.statusName}}</span>
          <span v-else-if="scope.row.statusName=='滞后'" class="label label-warning">{{scope.row.statusName}}</span>
          <span v-else-if="scope.row.statusName=='严重滞后'" class="label label-danger">{{scope.row.statusName}}</span>
          <span v-else-if="scope.row.statusName=='停工'" class="label" style="background-color:#001f3f !important;">{{scope.row.statusName}}</span>
          <span v-else class="label label-default">{{scope.row.statusName}}</span>
        </template>
      </el-table-column>
    </el-table>
  </box>
</template>

<script>
import { getVisualProgressList } from '@/api/progress'
import Box from '@/components/Box/Box'

export default {
  props: {
    tableHeight: {
      type: Number,
      default: 300
    },
    query: {}
  },
  components: {
    Box
  },
  data() {
    return {
      loading: false,
      list: [],
      fullList: [],
      text: ''
    }
  },
  watch: {
    query: function() {
      this.load()
    }
  },
  methods: {
    search() {
      this.loading = true
      this.list = this.fullList.filter(t => {
        if (this.text) {
          return t.projectName.indexOf(this.text) > -1 || t.statusName.indexOf(this.text) > -1
        }
        return true
      })
      this.loading = false
    },
    load() {
      this.loading = true
      getVisualProgressList(this.query).then(res => {
        this.fullList = res.data
        this.loading = false
        this.search()
      })
    }
  }
}
</script>
