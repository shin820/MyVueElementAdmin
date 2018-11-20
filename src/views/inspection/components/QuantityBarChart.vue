<template>
  <div class="chart-wrapper">
    <bar-chart
      :theme="theme"
      v-if="query.organizationType==1"
      :height="height"
      :fontSize="10"
      :onclick="onclick"
      :colors="colors"
      :xAxisRotate="-15" :dataFunc="getCompanyQuantityStats"
      title="各子公司问题整改情况"
      :isStack="isStack"
      :showLabel="showLabel"
      :showToolBox="false"
      :query="query">
    </bar-chart>
    <bar-chart
      :theme="theme"
      v-if="query.organizationType==2"
      :height="height"
      :fontSize="10"
      :onclick="onclick"
      :colors="colors"
      :xAxisRotate="-15" :dataFunc="getProjectQuantityStats"
      title="各项目问题整改情况"
      :isStack="isStack"
      :showLabel="showLabel"
      :showToolBox="false"
      :query="query">
    </bar-chart>
    <bar-chart
      :theme="theme"
      v-if="query.organizationType==3"
      :height="height"
      :fontSize="10"
      :onclick="onclick"
      :colors="colors"
      :xAxisRotate="-15" :dataFunc="getSectionQuantityStats"
      title="各标段问题整改情况"
      :isStack="isStack"
      :showLabel="showLabel"
      :showToolBox="false"
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
        return ['#0073b7', '#00a65a', '#dd4b39']
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

