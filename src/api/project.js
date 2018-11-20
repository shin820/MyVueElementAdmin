import request from '@/utils/request'

export function getProjectMapInfoList(params) {
  return request({
    url: '/api/services/app/Project/getProjectMapInfoList',
    method: 'get',
    params: params
  })
}

export function getProjectMapOverview(params) {
  return request({
    url: '/api/services/app/Project/getProjectMapOverview',
    method: 'get',
    params: params
  })
}

export function getGroupProjectList(params) {
  return request({
    url: '/api/services/app/Project/getGroupProjectList',
    method: 'get',
    params: params
  })
}

export function getWeeklyReport(params) {
  return request({
    url: '/api/services/app/ProjectWeeklyReport/getList',
    method: 'get',
    params: params
  })
}

export function getStatusCount(params) {
  return request({
    url: '/api/services/app/Project/getStatusCount',
    method: 'get',
    params: params
  })
}

export function getStatusAmount(params) {
  return request({
    url: '/api/services/app/Project/getStatusAmount',
    method: 'get',
    params: params
  })
}

// export function getTypeCount(params) {
//   return request({
//     url: '/api/services/app/Project/getTypeCount',
//     method: 'get',
//     params: params
//   })
// }

export function getTypeAmounts(params) {
  return request({
    url: '/api/services/app/ProjectStats/getTypeAmounts',
    method: 'get',
    params: params
  })
}

export function getPhaseAmounts(params) {
  return request({
    url: '/api/services/app/ProjectStats/getPhaseAmounts',
    method: 'get',
    params: params
  })
}

export function getStatusAmounts(params) {
  return request({
    url: '/api/services/app/ProjectStats/getStatusAmounts',
    method: 'get',
    params: params
  })
}

export function getCompanyAmounts(params) {
  return request({
    url: '/api/services/app/ProjectStats/getCompanyAmounts',
    method: 'get',
    params: params
  })
}

// export function getTypeAmount(params) {
//   return request({
//     url: '/api/services/app/Project/getTypeAmount',
//     method: 'get',
//     params: params
//   })
// }

export function getDefaultProjectTypes() {
  return request({
    url: '/api/services/app/Project/getDefaultProjectTypes',
    method: 'get'
  })
}

// export function getProjectStatuses(groupId) {
//   return request({
//     url: '/api/services/app/dataDict/getDicts',
//     method: 'get',
//     params: { groupId, }
//   })
// }

export function getInvestmentBalances(params) {
  return request({
    url: '/api/services/app/ProjectStats/getInvestmentBalances',
    method: 'get',
    params: params
  })
}

export function getProPhaseAmounts(params) {
  return request({
    url: '/api/services/app/ProjectStats/getProPhaseAmounts',
    method: 'get',
    params: params
  })
}

export function getInvestmentStats(params) {
  return request({
    url: '/api/services/app/ProjectStats/getInvestmentStats',
    method: 'get',
    params: params
  })
}

export function getTypeQuantityPieChart(params) {
  return request({
    url: '/api/services/app/ProjectStats/getTypeQuantityPieChart',
    method: 'get',
    params: params
  })
}

export function getPhaseQuantityPieChart(params) {
  return request({
    url: '/api/services/app/ProjectStats/getPhaseQuantityPieChart',
    method: 'get',
    params: params
  })
}

export function getStatusQuantityPieChart(params) {
  return request({
    url: '/api/services/app/ProjectStats/getStatusQuantityPieChart',
    method: 'get',
    params: params
  })
}
