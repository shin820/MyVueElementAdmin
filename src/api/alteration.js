import request from '@/utils/request'

export function getLevelAmounts(params) {
  return request({
    url: '/api/services/app/AlterationStats/getLevelAmounts',
    method: 'get',
    params: params
  })
}

export function getReasonAmounts(params) {
  return request({
    url: '/api/services/app/AlterationStats/getReasonAmounts',
    method: 'get',
    params: params
  })
}

export function getTypeAmounts(params) {
  return request({
    url: '/api/services/app/AlterationStats/getTypeAmounts',
    method: 'get',
    params: params
  })
}

export function getAlterationList(params) {
  return request({
    url: '/api/services/app/AlterationStats/getAlterationList',
    method: 'get',
    params: params
  })
}

export function getCompanyAmounts(params) {
  return request({
    url: '/api/services/app/AlterationStats/getCompanyAmounts',
    method: 'get',
    params: params
  })
}
