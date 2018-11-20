<template>
  <div class="app-container monitor" style="height:100%">
    <el-row>
      <el-col :span="24">
        <div class="main-title">数据指标监控平台</div>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :span="6">
        <div class="chart-wrapper">
          <bar-chart height="calc((100vh - 128px) / 3)" :xAxisRotate="-15" :fontSize="10" :showToolBox="false" :showLabel="false" theme="monitor" :colors="['#3c8dbc','#00a65a','#f39c12','#f56954','#001F3F']" title="各子公司年度形象进度" :query="query" :dataFunc="getVisualProgressStats"></bar-chart>
        </div>
        <div class="chart-wrapper">
          <company-ratio-bar-chart height="calc((100vh - 128px) / 3)" :xAxisRotate="-15" :fontSize="10" :showToolBox="false" :showLabel="false" theme="monitor" title="各子公司年度投资进度" :query="query" :dataFunc="getCompanyProgressBarChart"></company-ratio-bar-chart>
        </div>
        <div class="chart-wrapper">
          <nested-total-pie-chart height="calc((100vh - 128px) / 3)" title="项目类型" :showLengend="false" theme="monitor" :labelLineLengths="[10,5]" :center="['50%', '50%']" :innerRadius="['0','25%']" :outterRadius="['35%','55%']" :showToolBox="false" labelSize="small" :query="query" :dataFunc="getTypeQuantityPieChart"></nested-total-pie-chart>
        </div>
        <!-- <box :hasHeader="false">
          <el-row>
            <el-col :span="24">
              <nested-total-pie-chart height="28vh" innerTitle="项目类型" :showLengend="false" theme="monitor" :onclick="onClickPojectPie" :labelLineLengths="[10,5]" :center="['50%', '50%']" :innerRadius="['0','25%']" :outterRadius="['35%','55%']" :showToolBox="false" labelSize="small" :query="query" :dataFunc="getTypeQuantityPieChart"></nested-total-pie-chart>
            </el-col>
            <el-col :span="8">
              <nested-total-pie-chart height="28vh" innerTitle="项目阶段" :showLengend="false" theme="monitor" :onclick="onClickPojectPie" :labelLineLengths="[10,5]" :center="['50%', '50%']" :innerRadius="['0','25%']" :outterRadius="['35%','55%']" :showToolBox="false" labelSize="small" :query="query" :dataFunc="getPhaseQuantityPieChart"></nested-total-pie-chart>
            </el-col>
            <el-col :span="12">
              <nested-total-pie-chart height="28vh" innerTitle="项目状态" :showLengend="false" theme="monitor" :onclick="onClickPojectPie" :labelLineLengths="[10,5]" :center="['50%', '50%']" :innerRadius="['0','25%']" :outterRadius="['35%','55%']" :showToolBox="false" labelSize="small" :query="query" :dataFunc="getStatusQuantityPieChart"></nested-total-pie-chart>
            </el-col>
          </el-row>
        </box> -->
      </el-col>
      <el-col :span="12">
        <el-row :gutter="8">
          <el-col :span="8">
            <progress-info-box title="年度计划总投资" icon="clock" :ratio="100">
                <template slot="text">{{progressData.yearAmount|chineseAmount}}</template>
                <template slot="desc">年度计划投资{{progressData.yearAmount|chineseAmount}}</template>
            </progress-info-box>
          </el-col>
          <el-col :span="8">
            <progress-info-box title="合同总额" icon="file-contract" :ratio="100">
                <template slot="text">{{contractData.contractAmount|chineseAmount}}</template>
                <template slot="desc">合同总额{{contractData.contractAmount|chineseAmount}}</template>
            </progress-info-box>
          </el-col>
          <el-col :span="8">
            <progress-info-box v-on:click="$router.push({ name: `quality-overview`})" title="质量问题" icon="road" :ratio="qualityData.completeRatio">
                <template slot="text">{{qualityData.total}}个</template>
                <template slot="desc">整改完成{{qualityData.completeRatio}}%</template>
            </progress-info-box>
          </el-col>
        </el-row>
        <el-row :gutter="8">
          <el-col :span="8">
            <progress-info-box title="年度投资完成" icon="check" :ratio="progressData.completeRatio">
                <template slot="text">{{progressData.completeAmount|chineseAmount}}</template>
                <template slot="desc">年度投资完成{{progressData.completeRatio}}%</template>
            </progress-info-box>
          </el-col>
          <el-col :span="8">
            <progress-info-box v-on:click="$router.push({ name: `payment-progress`})" title="支付完成金额" icon="yen-sign" :ratio="contractData.paymentRatio">
                <template slot="text">{{contractData.paymentAmount|chineseAmount}}</template>
                <template slot="desc">支付完成{{contractData.paymentRatio}}%</template>
            </progress-info-box>
          </el-col>
          <el-col :span="8">
            <progress-info-box v-on:click="$router.push({ name: `safety-overview`})" title="安全问题" icon="shield-alt" :ratio="safetyData.completeRatio">
                <template slot="text">{{safetyData.total}}个</template>
                <template slot="desc">整改完成{{safetyData.completeRatio}}%</template>
            </progress-info-box>
          </el-col>
        </el-row>
        <map-box theme="monitor" :showPhase="false" height="calc(100vh - 316px)" ref="map"></map-box>
      </el-col>
      <el-col :span="6">
        <!-- <box :hasHeader="false">
          <issue-progress-list :query="query"></issue-progress-list>
        </box> -->
        <!-- :colors="['#2195D8','#2EB779','#E3675A']" -->
        <issue-bar-chart height="calc((100vh - 128px) / 3)" :isStack="true" :showLabel="false" theme="monitor" :query="query"></issue-bar-chart>
        <issue-grade-bar-chart height="calc((100vh - 128px) / 3)" :isStack="true" :showLabel="false" theme="monitor" :query="query"></issue-grade-bar-chart>
        <div class="chart-wrapper">
          <nested-total-pie-chart height="calc((100vh - 128px) / 3)" title="项目状态" :showLengend="false" theme="monitor" :labelLineLengths="[10,5]" :center="['50%', '50%']" :innerRadius="['0','25%']" :outterRadius="['35%','55%']" :showToolBox="false" labelSize="small" :query="query" :dataFunc="getStatusQuantityPieChart"></nested-total-pie-chart>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getProgressOverview,
  getVisualProgressPieChart,
  getVisualProgressStats,
  getCompanyProgressBarChart
} from '@/api/progress'
import { getAmountStats } from '@/api/contract'
import { getProblemClassStats } from '@/api/inspection'
import {
  getTypeQuantityPieChart,
  getPhaseQuantityPieChart,
  getStatusQuantityPieChart
} from '@/api/project'
import * as investmentProgressAPI from '@/api/decisionSupport/investmentProgress'
import * as qualitySafetyAPI from '@/api/decisionSupport/qualitySafety'
import Box from '@/components/Box/Box'
import ProgressInfoBox from '@/components/Box/ProgressInfoBox'
import InfoBox from '@/components/Box/InfoBox'
import MapBox from '@/views/project/components/MapBox'
// import ProjectProgressTableBox from '@/views/project/components/ProjectProgressTableBox'
import NestedTotalPieChart from '@/components/Chart/NestedTotalPieChart'
import IssueOverview from '@/views/inspection/components/OverviewWidget.vue'
import IssueProgressList from '@/views/inspection/components/ProgressList.vue'
import IssueBarChart from '@/views/inspection/components/QuantityBarChart.vue'
import IssueGradeBarChart from '@/views/inspection/components/GradeBarChart.vue'
import CompanyRatioBarChart from '@/views/progress/components/CompanyRatioBarChart'
import BarChart from '@/components/Chart/BarChart'

import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'monitor',
  data() {
    return {
      progressData: {},
      contractData: {},
      safetyData: {},
      qualityData: {}
    }
  },
  computed: {
    query() {
      return {
        year: null,
        organizationType: this.organizationType,
        organizationId: this.organizationId
      }
    },
    ...mapGetters(['organizationId', 'organizationType'])
  },
  components: {
    BarChart,
    Box,
    InfoBox,
    ProgressInfoBox,
    MapBox,
    // ProjectProgressTableBox,
    IssueBarChart,
    IssueGradeBarChart,
    NestedTotalPieChart,
    IssueProgressList,
    IssueOverview,
    CompanyRatioBarChart
  },
  created() {
    this.query.year = moment().year()
  },
  mounted() {
    this.$refs.map.load(this.query)
    document.body.setAttribute('style', 'height:100%')

    getProgressOverview(this.query).then(res => {
      this.progressData = res.data
    })

    getAmountStats(this.query).then(res => {
      this.contractData = res.data
    })

    getProblemClassStats(this.query).then(res => {
      var safetyData = res.data.filter(t => t.problemClass === '安全')
      this.safetyData = safetyData.length
        ? safetyData[0]
        : { total: 0, complete: 0, completeAmount: 0 }
      var qualityData = res.data.filter(t => t.problemClass === '质量')
      this.qualityData = qualityData.length
        ? qualityData[0]
        : { total: 0, complete: 0, completeAmount: 0 }
    })
  },
  methods: {
    onClickPojectPie() {
      this.$router.push({ name: 'project-overview' })
    },
    onClickProgressPie() {
      this.$router.push({ name: 'progress-overview' })
    },
    getTypeQuantityPieChart(params) {
      return getTypeQuantityPieChart(params)
    },
    getPhaseQuantityPieChart(params) {
      return getPhaseQuantityPieChart(params)
    },
    getStatusQuantityPieChart(params) {
      return getStatusQuantityPieChart(params)
    },
    getVisualProgressPieChart(params) {
      return getVisualProgressPieChart(params)
    },
    getVisualProgressStats(params) {
      return getVisualProgressStats(params)
    },
    getCompanyProgressBarChart(params) {
      return getCompanyProgressBarChart(params)
    },
    progressDataFunc(params) {
      if (this.organizationType === 1) {
        return investmentProgressAPI.getCompanyInvestmentStats(params)
      } else if (this.organizationType === 2) {
        return investmentProgressAPI.getProjectInvestmentStats(params)
      } else {
        return investmentProgressAPI.getSectionInvestmentStats(params)
      }
    },
    qualitySafetyDataFunc(params) {
      if (this.organizationType === 1) {
        return qualitySafetyAPI.getCompanyStats(params)
      } else if (this.organizationType === 2) {
        return qualitySafetyAPI.getProjectStats(params)
      } else {
        return qualitySafetyAPI.getSectionStats(params)
      }
    }
  }
}
</script>

<style scoped>
.monitor .main-title {
  color: rgb(255, 255, 255);
  text-align: center;
  padding: 5px;
  padding-bottom: 10px;
  font-size: 1.4em;
  font-weight: bold;
}

.monitor.app-container {
  padding: 8px;
  background: url('~@/assets/timg.jpg');
  filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}

.monitor .info-box {
  margin-bottom: 8px;
  background-color: rgba(06, 64, 102, 0.5) !important;
  filter: alpha(opacity=50);
  border: 1px solid rgba(0, 192, 239, 0.5);
  color: #fff;
}

.monitor .chart-wrapper {
  background: transparent;
  border-top: none;
  background: rgba(06, 64, 102, 0.5);
  filter: alpha(opacity=50);
  border: 1px solid rgba(0, 192, 239, 0.5);
  margin-bottom: 8px;
}

.monitor .box {
  margin-bottom: 8px;
  background: rgba(06, 64, 102, 0.5);
  filter: alpha(opacity=50);
  color: rgb(0, 192, 239);
  border: 1px solid rgba(0, 192, 239, 0.5);
}

.monitor .box .box-header {
  border-bottom: none;
  /* background: rgba(0, 0, 0, 0.2); */
}

.monitor .box .box-header .box-title {
  color: #fff;
}

.el-table {
  color: #fff;
  background-color: transparent;
}
.el-table__row {
  background-color: transparent;
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: rgba(0, 0, 0, 0.2);
}
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: rgba(0, 0, 0, 0.2);
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: none;
}
.el-table th {
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  background-color: rgba(0, 192, 239, 0.2);
}
.el-table tr {
  background-color: transparent;
}
.el-table .current-row > td {
  background-color: transparent !important;
}
.el-table .hover-row.current-row > td {
  background-color: transparent !important;
}
.el-progress-bar__outer {
  border: 1px solid rgba(0, 192, 239, 0.5);
  background-color: rgba(0, 0, 0, 0.2);
}
.el-progress-bar__inner {
  border-radius: none;
  background-color: rgba(0, 192, 239, 0.5);
}

.monitor .info-box .progress .progress-bar {
  background-color: rgb(26, 182, 234);
}

.monitor .progress {
  /* background-color: rgba(64, 80, 137, 0.5); */
  background-color: rgba(0, 0, 0, 0.2);
}

.monitor .progress-description {
  font-size: 12px;
}

.progress .progress-bar {
  background-color: rgba(26, 182, 234, 0.5);
}

.progress-group {
  font-size: 14px;
}
.progress-group .progress-number {
  /* color: #f39c12; */
}

.el-col .nav > li > a {
  padding: 10px 5px;
}

/*去掉百度地图LOGO*/
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}
</style>


