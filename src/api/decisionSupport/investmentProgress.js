import request from '@/utils/request'

export function getOverviewInvestmentStats(params) {
  return request({
    url: '/api/services/app/InvestmentProgress/getOverviewInvestmentStats',
    method: 'get',
    params: params
  })
}

export function getMonthlyInvestmentStats(params) {
  return request({
    url: '/api/services/app/InvestmentProgress/getMonthlyInvestmentStats',
    method: 'get',
    params: params
  })
}

export function getCompanyInvestmentStats(params) {
  return request({
    url: '/api/services/app/InvestmentProgress/getCompanyInvestmentStats',
    method: 'get',
    params: params
  })
}

export function getProjectInvestmentStats(params) {
  return request({
    url: '/api/services/app/InvestmentProgress/getProjectInvestmentStats',
    method: 'get',
    params: params
  })
}

export function getSectionInvestmentStats(params) {
  return request({
    url: '/api/services/app/InvestmentProgress/getSectionInvestmentStats',
    method: 'get',
    params: params
  })
}

