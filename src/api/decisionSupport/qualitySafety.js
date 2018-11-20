import request from '@/utils/request'

export function getStats(params) {
  return request({
    url: '/api/services/app/QualitySafety/getStats',
    method: 'get',
    params: params
  })
}

export function getQualityStats(params) {
  return request({
    url: '/api/services/app/QualitySafety/getQualityStats',
    method: 'get',
    params: params
  })
}

export function getSafetyStats(params) {
  return request({
    url: '/api/services/app/QualitySafety/getSafetyStats',
    method: 'get',
    params: params
  })
}

export function getCompanyStats(params) {
  return request({
    url: '/api/services/app/QualitySafety/getCompanyStats',
    method: 'get',
    params: params
  })
}

export function getProjectStats(params) {
  return request({
    url: '/api/services/app/QualitySafety/getProjectStats',
    method: 'get',
    params: params
  })
}

export function getSectionStats(params) {
  return request({
    url: '/api/services/app/QualitySafety/getSectionStats',
    method: 'get',
    params: params
  })
}

export function getPagedIssueList(params) {
  return request({
    url: '/api/services/app/QualitySafety/getPagedIssueList',
    method: 'get',
    params: params
  })
}
