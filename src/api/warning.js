import request from '@/utils/request'

export function getProgressStats(params) {
  return request({
    url: '/api/services/app/WarningStats/getProgressStats',
    method: 'get',
    params: params
  })
}

export function getInvestmentStats(params) {
  return request({
    url: '/api/services/app/WarningStats/getInvestmentStats',
    method: 'get',
    params: params
  })
}

export function getQualityStats(params) {
  return request({
    url: '/api/services/app/WarningStats/getQualityStats',
    method: 'get',
    params: params
  })
}
