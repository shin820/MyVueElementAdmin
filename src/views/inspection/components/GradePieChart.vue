<template>
    <div class="chart-wrapper">
      <nested-total-pie-chart
        title="问题等级情况"
        :onclick="onclick"
        height="300px"
        :colors="['#0073b7','#00a65a','#f39c12','#dd4b39']"
        :dataFunc="getGradeStats"
        :query="query">
      </nested-total-pie-chart>
    </div>
</template>


<script>
import NestedTotalPieChart from '@/components/Chart/NestedTotalPieChart'
import * as inspectionApi from '@/api/inspection'

export default {
  props: {
    query: {
      type: Object,
      required: true
    },
    onclick: {
      type: Function
    }
  },
  components: {
    NestedTotalPieChart
  },
  methods: {
    ...inspectionApi
  }
}
</script>

