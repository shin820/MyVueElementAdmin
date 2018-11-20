import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/monitor',
    name: 'monitor',
    component: () => import('@/views/monitor/index'),
    hidden: true
  },
  {
    path: '/other-inspection/issue',
    component: Layout,
    redirect: 'noredirect',
    name: 'other-inspection',
    hidden: true,
    meta: { title: '其他问题管理', keepAlive: true },
    children: [
      {
        path: 'overview',
        hidden: true,
        component: () => import('@/views/inspection/other-overview'),
        name: 'other-inspection-overview',
        meta: { title: '其他问题概况', keepAlive: true }
      },
      {
        path: 'list',
        hidden: true,
        component: () => import('@/views/inspection/list'),
        name: 'inspection-issue-list',
        meta: { title: '问题清单', keepAlive: true }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    meta: { keepAlive: true },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: { title: '首页', icon: 'home', keepAlive: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/project',
    component: Layout,
    redirect: 'noredirect',
    name: 'project',
    meta: { title: '项目管理', icon: 'road', keepAlive: true },
    children: [
      {
        path: 'overview',
        component: () => import('@/views/project/overview'),
        name: 'project-overview',
        meta: { title: '项目概况', icon: 'table', keepAlive: true }
      },
      {
        path: 'map',
        component: () => import('@/views/project/map'),
        name: 'project-info-map',
        meta: { title: '项目地图', icon: 'map-marked-alt', keepAlive: true }
      },
      {
        path: 'list',
        component: () => import('@/views/project/list'),
        name: 'project-info-list',
        meta: { title: '项目信息表', icon: 'table', keepAlive: true }
      },
      {
        path: 'weeklyReport',
        component: () => import('@/views/project/weeklyreport'),
        name: 'weeklyreport',
        meta: { title: '项目周报', icon: 'table', keepAlive: true }
      },
      {
        path: 'type-barchart',
        component: () => import('@/views/project/type-barchart'),
        name: 'project-type-barchart',
        meta: { title: '项目类型分析', icon: 'chart-bar', keepAlive: true }
      },
      {
        path: 'phase-barchart',
        component: () => import('@/views/project/phase-barchart'),
        name: 'project-phase-barchart',
        meta: { title: '项目推进情况', icon: 'chart-bar', keepAlive: true }
      },
      {
        path: 'status-barchart',
        component: () => import('@/views/project/status-barchart'),
        name: 'project-status-barchart',
        meta: { title: '建设期项目情况', icon: 'chart-bar', keepAlive: true }
      },
      {
        path: 'projectStats',
        component: () =>
          import('@/views/decisionSupport/projectProgress/projectStats'),
        name: 'projectStats',
        meta: { title: '项目进度表', icon: 'table', keepAlive: true }
      },
      {
        path: 'investment-balance-barchart',
        component: () => import('@/views/project/investment-balance-barchart'),
        name: 'project-investment-balance-barchart',
        meta: { title: '项目投资节余', icon: 'chart-bar', keepAlive: true }
      },
      {
        path: 'prophase-barchart',
        component: () => import('@/views/project/prophase-barchart'),
        name: 'project-prophase-barchart',
        meta: { title: '项目前期工作', icon: 'chart-bar', keepAlive: true }
      },
      {
        path: 'investment-barchart',
        component: () => import('@/views/project/investment-barchart'),
        name: 'project-investment-barchart',
        meta: { title: '项目投资阶段', icon: 'chart-bar', keepAlive: true }
      },
      {
        path: 'company-barchart',
        component: () => import('@/views/project/company-barchart'),
        hidden: true,
        name: 'project-company-barchart',
        meta: { title: '子公司项目情况', keepAlive: true }
      }
      // { path: 'status', component: () => import('@/views/project/status'), name: 'projStatus', meta: { title: '项目状态统计', icon: 'chart-pie', keepAlive: true }},
      // { path: 'type', component: () => import('@/views/project/type'), name: 'projType', meta: { title: '项目类型统计', icon: 'chart-pie', keepAlive: true }}
    ]
  },
  {
    path: '/contract',
    component: Layout,
    redirect: 'noredirect',
    name: 'contract',
    meta: { title: '合同管理', icon: 'file-contract', keepAlive: true },
    children: [
      {
        path: 'overview',
        component: () => import('@/views/contract/overview'),
        name: 'contract-overview',
        meta: { title: '合同概况', icon: 'table', keepAlive: true }
      },
      {
        path: 'list',
        component: () => import('@/views/contract/list'),
        name: 'contract-list',
        meta: { title: '合同信息表', icon: 'table', keepAlive: true }
      },
      {
        path: 'type-barchart',
        component: () => import('@/views/contract/type-barchart'),
        name: 'contract-type-barchart',
        meta: { title: '合同类型分析', icon: 'chart-bar', keepAlive: true }
      },
      {
        path: 'status-barchart',
        component: () => import('@/views/contract/status-barchart'),
        name: 'contract-status-barchart',
        meta: { title: '合同状态分析', icon: 'chart-bar', keepAlive: true }
      },
      // { path: 'project-status-barchart', component: () => import('@/views/contract/project-status-barchart'), name: 'contract-project-status-barchart', meta: { title: '建设期合同情况', icon: 'chart-bar', keepAlive: true }},
      {
        path: 'alter-contrast-barchart',
        component: () => import('@/views/contract/alter-contrast-barchart'),
        name: 'contract-alter-contrast-barchart',
        meta: { title: '合同与变更对比', icon: 'chart-bar', keepAlive: true }
      },
      {
        path: 'company-barchart',
        component: () => import('@/views/contract/company-barchart'),
        hidden: true,
        name: 'contract-company-barchart',
        meta: { title: '子公司合同情况', keepAlive: true }
      }
    ]
  },
  {
    path: '/alteration',
    component: Layout,
    redirect: 'noredirect',
    name: 'alteration',
    meta: { title: '变更情况', icon: 'file-invoice-dollar', keepAlive: true },
    children: [
      {
        path: 'list',
        component: () => import('@/views/alteration/list'),
        name: 'alter-list',
        meta: { title: '变更信息表', icon: 'table', keepAlive: true }
      },
      {
        path: 'level-barchart',
        component: () => import('@/views/alteration/level-barchart'),
        name: 'alter-level-barchart',
        meta: { title: '变更等级分析', icon: 'chart-bar', keepAlive: true }
      },
      {
        path: 'type-barchart',
        component: () => import('@/views/alteration/type-barchart'),
        name: 'alter-type-barchart',
        meta: { title: '变更类型分析', icon: 'chart-bar', keepAlive: true }
      },
      {
        path: 'reason-barchart',
        component: () => import('@/views/alteration/reason-barchart'),
        name: 'alter-reason-barchart',
        meta: { title: '变更原因分析', icon: 'chart-bar', keepAlive: true }
      },
      {
        path: 'company-barchart',
        component: () => import('@/views/alteration/company-barchart'),
        hidden: true,
        name: 'alter-company-barchart',
        meta: { title: '子公司变更情况', keepAlive: true }
      }
    ]
  },
  {
    path: '/progress',
    component: Layout,
    redirect: 'noredirect',
    name: 'progress',
    meta: { title: '项目进度', icon: 'clock', keepAlive: true },
    children: [
      {
        path: 'overview',
        component: () => import('@/views/progress/overview'),
        name: 'progress-overview',
        meta: { title: '项目进度概况', icon: 'clock', keepAlive: true }
      }
      // { path: 'progress-stats-barchart', component: () => import('@/views/progress/progress-stats-barchart'), name: 'progress-stats-barchart', meta: { title: '年度投资进度', icon: 'chart-bar', keepAlive: true }},
      // { path: 'company-complete-piechart', component: () => import('@/views/progress/company-progress-complete-piechart'), name: 'company-progress-complete-piechart', meta: { title: '已完成投资情况', icon: 'chart-pie', keepAlive: true }},
      // { path: 'company-plan-piechart', component: () => import('@/views/progress/company-progress-plan-piechart'), name: 'company-progress-plan-piechart', meta: { title: '计划投资情况', icon: 'chart-pie', keepAlive: true }},
      // { path: 'visual-progress-stats-barchart', component: () => import('@/views/progress/visual-progress-stats-barchart'), name: 'visual-progress-stats-barchart', meta: { title: '项目形象进度情况', icon: 'chart-bar', keepAlive: true }},
      // { path: 'visual-company-progress-piechart', component: () => import('@/views/progress/visual-company-progress-piechart'), name: 'visual-company-progress-piechart', meta: { title: '项目形象进度情况', icon: 'chart-pie', keepAlive: true }}
    ]
  },
  {
    path: '/quality',
    component: Layout,
    redirect: 'noredirect',
    name: 'quality',
    meta: { title: '质量控制', icon: 'cubes', keepAlive: true },
    children: [
      {
        path: 'overview',
        component: () => import('@/views/inspection/quality-overview'),
        name: 'quality-overview',
        meta: { title: '质量问题概况', icon: 'cube', keepAlive: true }
      }
    ]
  },
  {
    path: '/safety',
    component: Layout,
    redirect: 'noredirect',
    name: 'safety',
    meta: { title: '安全管理', icon: 'shield-alt', keepAlive: true },
    children: [
      {
        path: 'overview',
        component: () => import('@/views/inspection/safety-overview'),
        name: 'safety-overview',
        meta: { title: '安全问题概况', icon: 'shield-alt', keepAlive: true }
      }
    ]
  },
  {
    path: '/environment-protect',
    component: Layout,
    redirect: 'noredirect',
    name: 'environment-protect',
    meta: { title: '环保管理', icon: 'recycle', keepAlive: true },
    children: [
      {
        path: 'overview',
        component: () => import('@/views/inspection/environment-overview'),
        name: 'environment-protect-overview',
        meta: { title: '环保问题概况', icon: 'recycle', keepAlive: true }
      }
    ]
  },
  {
    path: '/decisionSupport',
    component: Layout,
    redirect: 'noredirect',
    name: 'decisionSupport',
    meta: { title: '辅助决策', icon: 'balance-scale', keepAlive: true },
    children: [
      {
        path: 'payment-contrast-barchart',
        component: () =>
          import('@/views/decisionSupport/payment-contrast-barchart'),
        name: 'payment-contrast-barchart',
        meta: { title: '计量支付情况', icon: 'table', keepAlive: true }
      },
      {
        path: 'project-progress-chart',
        component: () =>
          import('@/views/decisionSupport/projectProgress/projectChart'),
        name: 'project-progress-chart',
        meta: { title: '工程进度情况', icon: 'chart-bar', keepAlive: true }
      },
      {
        path: 'measure-progress',
        component: () => import('@/views/decisionSupport/measure-progress'),
        name: 'measure-progress',
        meta: { title: '投资进度', icon: 'lightbulb', keepAlive: true }
      },
      {
        path: 'payment-progress',
        component: () => import('@/views/decisionSupport/payment-progress'),
        name: 'payment-progress',
        meta: { title: '支付进度', icon: 'money-check', keepAlive: true }
      },
      {
        path: 'overview',
        component: () =>
          import('@/views/decisionSupport/qualitySafety/overview'),
        name: 'quality-safety-overview',
        meta: { title: '质量安全情况', icon: 'chart-pie', keepAlive: true }
      },
      {
        path: 'list',
        component: () => import('@/views/decisionSupport/qualitySafety/list'),
        name: 'quality-safety-list',
        meta: { title: '质安问题列表', icon: 'table', keepAlive: true }
      }
    ]
  },
  {
    path: '/warning',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/warning/index'),
        name: 'warning',
        meta: { title: '预警', icon: 'lightbulb', keepAlive: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
