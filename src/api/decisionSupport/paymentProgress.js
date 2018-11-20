import request from '@/utils/request'

export function getOverviewPaymentStats(params) {
  return request({
    url: '/api/services/app/PaymentProgress/getOverviewPaymentStats',
    method: 'get',
    params: params
  })
}

export function getMonthlyPaymentStats(params) {
  return request({
    url: '/api/services/app/PaymentProgress/getMonthlyPaymentStats',
    method: 'get',
    params: params
  })
}

export function getCompanyPaymentStats(params) {
  return request({
    url: '/api/services/app/PaymentProgress/getCompanyPaymentStats',
    method: 'get',
    params: params
  })
}

export function getProjectPaymentStats(params) {
  return request({
    url: '/api/services/app/PaymentProgress/getProjectPaymentStats',
    method: 'get',
    params: params
  })
}

export function getSectionPaymentStats(params) {
  return request({
    url: '/api/services/app/PaymentProgress/getSectionPaymentStats',
    method: 'get',
    params: params
  })
}
