import request from '@/utils/request'

export function getProjectProgress(params) {
  return request({
    url: '/api/services/app/ProjectProgress/getProjectProgress',
    method: 'get',
    params: params
  })
}

export function getProjectStats(params) {
  return request({
    url: '/api/services/app/ProjectProgress/getProjectStats',
    method: 'get',
    params: params
  })
}
