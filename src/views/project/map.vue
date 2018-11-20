<template>
  <div class="app-container">
    <el-row :gutter="32">
      <el-col :span="24">
        <div class="chart-wrapper">
          <project-map height="calc(100vh - 210px)"></project-map>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProjectMap from './components/ProjectMap'

export default {
  name: 'project-info-map',
  components: {
    ProjectMap
  }
}
</script>

