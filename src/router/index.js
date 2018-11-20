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
        path: 'list',
        component: () => import('@/views/project/list'),
        name: 'project-info-list',
        meta: { title: '项目信息表', icon: 'table', keepAlive: true }
      },
      {
        path: 'projectStats',
        component: () =>
          import('@/views/decisionSupport/projectProgress/projectStats'),
        name: 'projectStats',
        meta: { title: '项目进度表', icon: 'table', keepAlive: true }
      }
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
