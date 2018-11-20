import request from '@/utils/request'

export function getOrganizationUnitTree(params) {
  return request({
    url: '/api/services/app/Project/getOrganizationUnitTree',
    method: 'get',
    params: params
  })
}
