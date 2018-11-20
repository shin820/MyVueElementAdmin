<template>
  <div class="chart-wrapper">
    <bar-chart
      v-if="query.organizationType==1"
      :height="height"
      :fontSize="10"
      :onclick="onclick"
      :xAxisRotate="-15" :dataFunc="getCompanyGradeStats"
      title="各子公司问题等级情况"
      :showToolBox="false"
      :theme="theme"
      :colors="colors"
      :isStack="isStack"
      :showLabel="showLabel"
      :query="query">
    </bar-chart>
    <bar-chart
      v-if="query.organizationType==2"
      :height="height"
      :fontSize="10"
      :onclick="onclick"
      :xAxisRotate="-15" :dataFunc="getProjectGradeStats"
      title="各项目问题等级情况"
      :showToolBox="false"
      :theme="theme"
      :colors="colors"
      :isStack="isStack"
      :showLabel="showLabel"
      :query="query">
    </bar-chart>
    <bar-chart
      v-if="query.organizationType==3"
      :height="height"
      :fontSize="10"
      :onclick="onclick"
      :xAxisRotate="-15" :dataFunc="getSectionGradeStats"
      title="各标段问题等级情况"
      :showToolBox="false"
      :theme="theme"
      :colors="colors"
      :isStack="isStack"
      :showLabel="showLabel"
      :query="query">
    </bar-chart>
  </div>
</template>

<script>
import BarChart from '@/components/Chart/BarChart'
import * as inspectionApi from '@/api/inspection'

export default {
  props: {
    height: {
      type: String,
      default: '300px'
    },
    query: {
      type: Object,
      required: true
    },
    onclick: {
      type: Function
    },
    theme: {
      type: String
    },
    isStack: {
      type: Boolean,
      default: false
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    colors: {
      type: Array,
      default() {
        return ['#0073b7', '#00a65a', '#f39c12', '#dd4b39']
      }
    }
  },
  components: {
    BarChart
  },
  methods: {
    ...inspectionApi
  }
}
</script>

