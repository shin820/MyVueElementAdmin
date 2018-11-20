import request from '@/utils/request'

export function getCompanyProgressBarChart(params) {
  return request({
    url: '/api/services/app/progressStats/getCompanyProgressBarChart',
    method: 'get',
    params: params
  })
}

export function getProgressStats(params) {
  return request({
    url: '/api/services/app/progressStats/getProgressStats',
    method: 'get',
    params: params
  })
}

export function getCompanyCompleteStats(params) {
  return request({
    url: '/api/services/app/progressStats/getCompanyCompleteStats',
    method: 'get',
    params: params
  })
}

export function getCompanyPlanStats(params) {
  return request({
    url: '/api/services/app/progressStats/getCompanyPlanStats',
    method: 'get',
    params: params
  })
}

export function getVisualProgressStats(params) {
  return request({
    url: '/api/services/app/progressStats/getVisualProgressStats',
    method: 'get',
    params: params
  })
}

export function getCompanyVisualProgressStats(params) {
  return request({
    url: '/api/services/app/progressStats/getCompanyVisualProgressStats',
    method: 'get',
    params: params
  })
}

export function getProgressOverview(params) {
  return request({
    url: '/api/services/app/progressStats/getProgressOverview',
    method: 'get',
    params: params
  })
}

export function getVisualProgressPieChart(params) {
  return request({
    url: '/api/services/app/progressStats/getVisualProgressPieChart',
    method: 'get',
    params: params
  })
}

export function getVisualProgressList(params) {
  return request({
    url: '/api/services/app/progressStats/getVisualProgressList',
    method: 'get',
    params: params
  })
}
