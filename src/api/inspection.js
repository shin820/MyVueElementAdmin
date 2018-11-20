import request from '@/utils/request'

export function getQuantityStats(params) {
  return request({
    url: '/api/services/app/inspectionStats/getQuantityStats',
    method: 'get',
    params: params
  })
}

export function getCompanyQuantityStats(params) {
  return request({
    url: '/api/services/app/inspectionStats/getCompanyQuantityStats',
    method: 'get',
    params: params
  })
}

export function getProjectQuantityStats(params) {
  return request({
    url: '/api/services/app/inspectionStats/getProjectQuantityStats',
    method: 'get',
    params: params
  })
}

export function getSectionQuantityStats(params) {
  return request({
    url: '/api/services/app/inspectionStats/getSectionQuantityStats',
    method: 'get',
    params: params
  })
}

export function getGradeStats(params) {
  return request({
    url: '/api/services/app/inspectionStats/getGradeStats',
    method: 'get',
    params: params
  })
}

export function getCompanyGradeStats(params) {
  return request({
    url: '/api/services/app/inspectionStats/getCompanyGradeStats',
    method: 'get',
    params: params
  })
}

export function getProjectGradeStats(params) {
  return request({
    url: '/api/services/app/inspectionStats/getProjectGradeStats',
    method: 'get',
    params: params
  })
}

export function getSectionGradeStats(params) {
  return request({
    url: '/api/services/app/inspectionStats/getSectionGradeStats',
    method: 'get',
    params: params
  })
}

export function getCompanyStatList(params) {
  return request({
    url: '/api/services/app/inspectionStats/getCompanyStatList',
    method: 'get',
    params: params
  })
}

export function getProjectStatList(params) {
  return request({
    url: '/api/services/app/inspectionStats/getProjectStatList',
    method: 'get',
    params: params
  })
}

export function getSectionStatList(params) {
  return request({
    url: '/api/services/app/inspectionStats/getSectionStatList',
    method: 'get',
    params: params
  })
}

export function getPagedIssueList(params) {
  return request({
    url: '/api/services/app/inspectionStats/getPagedIssueList',
    method: 'get',
    params: params
  })
}

export function getProblemClassStats(params) {
  return request({
    url: '/api/services/app/inspectionStats/getProblemClassStats',
    method: 'get',
    params: params
  })
}

export function getCompanyStats(params) {
  return request({
    url: '/api/services/app/inspectionStats/getCompanyStats',
    method: 'get',
    params: params
  })
}

export function getProjectStats(params) {
  return request({
    url: '/api/services/app/inspectionStats/getProjectStats',
    method: 'get',
    params: params
  })
}

export function getSectionStats(params) {
  return request({
    url: '/api/services/app/inspectionStats/getSectionStats',
    method: 'get',
    params: params
  })
}
