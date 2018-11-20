<template>
  <div class="app-container">
    <el-row :gutter="16">
      <el-col :xs="24" :sm="12" :lg="6">
        <div class="info-box bg-yellow clickable" v-on:click="$router.push({ name: `progress-overview`})">
            <span class="info-box-icon"><v-icon scale="3" name="clock"></v-icon></span>
            <div class="info-box-content">
              <span class="info-box-text">年度投资完成金额</span>
              <span class="info-box-number">{{progressData.completeAmount|chineseAmount}}</span>
              <div class="progress">
                <div class="progress-bar" :style="{width: progressData.completeRatio+'%'}"></div>
              </div>
              <span class="progress-description">
                年度投资进度已完成{{progressData.completeRatio}}%
              </span>
            </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <div class="info-box bg-green clickable" v-on:click="$router.push({ name: `payment-progress`})">
            <span class="info-box-icon"><v-icon scale="3" name="yen-sign"></v-icon></span>
            <div class="info-box-content">
              <span class="info-box-text">支付完成金额</span>
              <span class="info-box-number">{{contractData.paymentAmount|chineseAmount}}</span>
              <div class="progress">
                <div class="progress-bar" :style="{width: contractData.paymentRatio+'%'}"></div>
              </div>
              <span class="progress-description">
                支付已完成{{contractData.paymentRatio}}%
              </span>
            </div>
          </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <div class="info-box bg-red clickable" v-on:click="$router.push({ name: `quality-overview`})">
            <span class="info-box-icon"><v-icon scale="3" name="road"></v-icon></span>
            <div class="info-box-content">
              <span class="info-box-text">质量问题</span>
              <span class="info-box-number">{{qualityData.total}}个</span>
              <div class="progress">
                <div class="progress-bar" :style="{width: qualityData.completeRatio+'%'}"></div>
              </div>
              <span class="progress-description">
                整改完成{{qualityData.completeRatio}}%
              </span>
            </div>
          </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <div class="info-box bg-aqua clickable" v-on:click="$router.push({ name: `safety-overview`})">
            <span class="info-box-icon"><v-icon scale="3" name="shield-alt"></v-icon></span>
            <div class="info-box-content">
              <span class="info-box-text">安全问题</span>
              <span class="info-box-number">{{safetyData.total}}个</span>
              <div class="progress">
                <div class="progress-bar" :style="{width: safetyData.completeRatio+'%'}"></div>
              </div>
              <span class="progress-description">
                整改完成{{safetyData.completeRatio}}%
              </span>
            </div>
          </div>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col :xs="24" :sm="24" :lg="14">
        <map-box height="442px" ref="map"></map-box>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="5">
        <box title="项目与合同信息">
          <template slot="body">
            <nested-total-pie-chart :onclick="onClickPojectPie" :labelLineLengths="[10,5]" :center="['50%', '58%']" :innerRadius="['0','25%']" :outterRadius="['35%','55%']" height="280px" :showToolBox="false" labelSize="small" :query="query" :dataFunc="getTypeQuantityPieChart"></nested-total-pie-chart>
            <!-- <div class="progress-group" style="margin-top:8px">
              <span class="progress-text" style="font-weight:normal">合同总额</span>
              <span class="progress-number">{{contractData.contractAmount|chineseAmount}}</span>
              <div class="progress sm" style="margin-bottom:8px">
                <div class="progress-bar progress-bar-primary" style="width:100%;line-height:100%;font-size:0.7em">100%</div>
              </div>
            </div>
            <div class="progress-group">
              <span class="progress-text" style="font-weight:normal">已计量金额</span>
              <span class="progress-number">{{contractData.measureAmount|chineseAmount}}</span>
              <div class="progress sm" style="margin-bottom:8px">
                <div class="progress-bar progress-bar-blue" style="line-height:100%;font-size:0.7em" :style="{'width': contractData.measureRatio+'%'}">{{contractData.measureRatio}}%</div>
              </div>
            </div>
            <div class="progress-group">
              <span class="progress-text" style="font-weight:normal">已支付金额</span>
              <span class="progress-number">{{contractData.paymentAmount|chineseAmount}}</span>
              <div class="progress sm" style="margin-bottom:8px">
                <div class="progress-bar progress-bar-aqua" style="line-height:100%;font-size:0.7em" :style="{'width': contractData.paymentRatio+'%'}">{{contractData.paymentRatio}}%</div>
              </div>
            </div>
            <div class="progress-group">
              <span class="progress-text" style="font-weight:normal">未支付金额</span>
              <span class="progress-number">{{contractData.unPayAmount|chineseAmount}}</span>
              <div class="progress sm" style="margin-bottom:10px">
                <div class="progress-bar progress-bar-red" style="line-height:100%;font-size:0.7em" :style="{'width': contractData.unPayRatio+'%'}">{{contractData.unPayRatio}}%</div>
              </div>
            </div> -->
            <ul class="nav nav-pills nav-stacked">
              <li><a href="#" v-on:click.prevent="$router.push({name:'contract-overview'})">合同总额<span class="pull-right text-primary">{{contractData.contractAmount|chineseAmount}}</span></a></li>
              <li><a href="#" v-on:click.prevent="$router.push({name:'measure-progress'})">已计量金额<span class="pull-right text-aqua">{{contractData.measureAmount|chineseAmount}}</span></a></li>
              <li><a href="#" v-on:click.prevent="$router.push({name:'payment-progress'})">已支付金额<span class="pull-right text-green">{{contractData.paymentAmount|chineseAmount}}</span></a></li>
              <li><a href="#" v-on:click.prevent="$router.push({name:'payment-progress'})">未支付金额<span class="pull-right text-red">{{contractData.unPayAmount|chineseAmount}}</span></a></li>
            </ul>
          </template>
        </box>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="5">
        <box title="年度投资进度">
          <template slot="body">
            <nested-total-pie-chart :colors="['#00a65a','#f39c12','#f56954','#001F3F']" :onclick="onClickProgressPie" :labelLineLengths="[10,5]" :center="['50%', '58%']" :innerRadius="['0','25%']" :outterRadius="['35%','55%']" height="280px" :showToolBox="false" labelSize="small" :query="query" :dataFunc="getVisualProgressPieChart"></nested-total-pie-chart>
            <!-- <div class="progress-group" style="margin-top:8px">
              <span class="progress-text" style="font-weight:normal">已完成征拆投资</span>
              <span class="progress-number">{{progressData.requisitionAmount|chineseAmount}}</span>
              <div class="progress sm" style="margin-bottom:8px">
                <div class="progress-bar progress-bar-yellow" style="line-height:100%;font-size:0.7em" :style="{'width': progressData.requisitionRatio+'%'}">{{progressData.requisitionRatio}}%</div>
              </div>
            </div>
            <div class="progress-group">
              <span class="progress-text" style="font-weight:normal">已完成建安投资</span>
              <span class="progress-number">{{progressData.taskInvestmentAmount|chineseAmount}}</span>
              <div class="progress sm" style="margin-bottom:8px">
                <div class="progress-bar progress-bar-aqua" style="line-height:100%;font-size:0.7em" :style="{'width': progressData.taskInvestmentRatio+'%'}">{{progressData.taskInvestmentRatio}}%</div>
              </div>
            </div>
            <div class="progress-group">
              <span class="progress-text" style="font-weight:normal">已完成总投资</span>
              <span class="progress-number">{{progressData.completeAmount|chineseAmount}}</span>
              <div class="progress sm" style="margin-bottom:8px">
                <div class="progress-bar progress-bar-green" style="line-height:100%;font-size:0.7em" :style="{'width': progressData.completeRatio+'%'}">{{progressData.completeRatio}}%</div>
              </div>
            </div>
            <div class="progress-group">
              <span class="progress-text" style="font-weight:normal">年度总投资</span>
              <span class="progress-number">{{progressData.yearAmount|chineseAmount}}</span>
              <div class="progress sm" style="margin-bottom:10px">
                <div class="progress-bar progress-bar-primary" style="width:100%;line-height:100%;font-size:0.7em">100%</div>
              </div>
            </div> -->
            <ul class="nav nav-pills nav-stacked">
              <li><a href="#" v-on:click.prevent="$router.push({name:'progress-overview'})">已完成征拆投资<span class="pull-right text-yellow">{{progressData.requisitionAmount|chineseAmount}}</span></a></li>
              <li><a href="#" v-on:click.prevent="$router.push({name:'progress-overview'})">已完成建安投资<span class="pull-right text-aqua">{{progressData.taskInvestmentAmount|chineseAmount}}</span></a></li>
              <li><a href="#" v-on:click.prevent="$router.push({name:'progress-overview'})">已完成总投资<span class="pull-right text-green">{{progressData.completeAmount|chineseAmount}}</span></a></li>
              <li><a href="#" v-on:click.prevent="$router.push({name:'progress-overview'})">年度总投资<span class="pull-right text-primary">{{progressData.yearAmount|chineseAmount}}</span></a></li>
            </ul>
          </template>
        </box>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :lg="24">
        <issue-overview :query="query"></issue-overview>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getProgressOverview, getVisualProgressPieChart } from '@/api/progress'
import { getAmountStats } from '@/api/contract'
import { getProblemClassStats } from '@/api/inspection'
import { getTypeQuantityPieChart } from '@/api/project'
import * as investmentProgressAPI from '@/api/decisionSupport/investmentProgress'
import * as qualitySafetyAPI from '@/api/decisionSupport/qualitySafety'
import Box from '@/components/Box/Box'
import MapBox from '@/views/project/components/MapBox'
import NestedTotalPieChart from '@/components/Chart/NestedTotalPieChart'
import IssueOverview from '@/views/inspection/components/OverviewWidget.vue'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'dashboard',
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
    Box,
    MapBox,
    NestedTotalPieChart,
    IssueOverview
  },
  created() {
    this.query.year = moment().year()
  },
  mounted() {
    this.$refs.map.load(this.query)

    getProgressOverview(this.query).then(res => {
      this.progressData = res.data
    })

    getAmountStats(this.query).then(res => {
      this.contractData = res.data
    })

    getProblemClassStats(this.query).then(res => {
      var safetyData = res.data.filter(t => t.problemClass === '安全')
      this.safetyData = safetyData.length ? safetyData[0] : { total: 0, complete: 0, completeAmount: 0 }
      var qualityData = res.data.filter(t => t.problemClass === '质量')
      this.qualityData = qualityData.length ? qualityData[0] : { total: 0, complete: 0, completeAmount: 0 }
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
    getVisualProgressPieChart(params) {
      return getVisualProgressPieChart(params)
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
  .el-col .nav > li > a {
    padding: 10px 5px;
  }
</style>


